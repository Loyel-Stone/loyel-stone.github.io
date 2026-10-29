import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { lstat, readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative } from 'node:path';

// Offline check only: no upload, GitHub API call or deployment.
const repo = fileURLToPath(new URL('../', import.meta.url));
const site = resolve(repo, 'dist');
const tracked = new Set(execFileSync('git', ['ls-files', '-z', '--', 'dist/'], { cwd: repo, encoding: 'utf8' }).split('\0').filter(Boolean));
const files = [];

async function inspect(path) {
  const info = await lstat(path);
  const name = relative(site, path).split('\\').join('/');
  assert(!info.isSymbolicLink(), `No symbolic links in the Pages artifact: ${name}`);
  assert(!name.split('/').some((part) => part.startsWith('.')), `No hidden artifact paths: ${name}`);
  if (info.isDirectory()) {
    for (const entry of await readdir(path)) await inspect(resolve(path, entry));
    return;
  }
  assert(info.isFile() && info.nlink === 1, `Only regular, non-hard-linked files: ${name}`);
  assert(tracked.has(`dist/${name}`), `Untracked artifact file: ${name}`);
  assert(/^[a-z0-9-]+\.html$/.test(name) || ['robots.txt', 'sitemap.xml'].includes(name) || /^assets\/[a-z0-9-]+\.(css|js|svg)$/.test(name) || /^assets\/fonts\/[a-z0-9-]+\.ttf$/.test(name) || /^assets\/fonts\/(DM-Sans|Newsreader)-OFL\.txt$/.test(name), `Unapproved artifact type or location: ${name}`);
  files.push(name);
}

await inspect(site);
assert(files.includes('index.html'), 'dist/index.html must be at the artifact root');
for (const file of ['robots.txt', 'sitemap.xml']) assert(files.includes(file), `Required SEO file at artifact root: ${file}`);
assert.equal(files.length, tracked.size, 'Every tracked dist file must be present');

// Resolve the same relative URLs as a user-site deployment at the domain root.
const origin = 'https://loyel-stone.github.io/';
let references = 0;
function checkTarget(target, base) {
  const url = new URL(target, base);
  assert.equal(url.origin, new URL(origin).origin, `Unexpected remote asset: ${target}`);
  const file = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
  assert(files.includes(file), `Missing root-site target: ${url.pathname}`);
  references++;
}
for (const file of files.filter((name) => name.endsWith('.html'))) {
  const html = await readFile(resolve(site, file), 'utf8');
  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (match[1] === 'href' && /^https:\/\//.test(match[2]) && new URL(match[2]).origin !== new URL(origin).origin) continue; // Approved by check.mjs.
    checkTarget(match[2], new URL(file, origin));
  }
}
const css = await readFile(resolve(site, 'assets/styles.css'), 'utf8');
for (const match of css.matchAll(/url\('([^']+)'\)/g)) checkTarget(match[1], new URL('assets/styles.css', origin));
const robots = await readFile(resolve(site, 'robots.txt'), 'utf8');
const sitemapTarget = robots.match(/^Sitemap: (\S+)$/m)?.[1];
assert.equal(sitemapTarget, `${origin}sitemap.xml`, 'robots.txt: correct root sitemap URL');
checkTarget(sitemapTarget, origin);
const sitemap = await readFile(resolve(site, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 5, 'The publication sitemap contains the five approved pages');
for (const url of urls) checkTarget(url, origin);
console.log(`PASS: dist/ contains ${files.length} tracked regular files only; ${references} root-domain URL references resolve; no hidden files, links or unapproved file types. No deployment performed.`);
