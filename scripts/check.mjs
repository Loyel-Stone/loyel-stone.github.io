import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = (await readdir(root)).filter((file) => file.endsWith('.html'));
const requiredPages = ['index.html', 'about.html', 'sayright.html', 'skills.html', 'contact.html'];
for (const page of requiredPages) assert(pages.includes(page), `Missing core page: ${page}`);
let references = 0;
let publicLinks = 0;
const approvedPublicLinks = new Set([
  'https://github.com/Loyel-Stone',
  'https://github.com/Loyel-Stone/sayright-demo',
]);
for (const page of pages) {
  const path = resolve(root, page);
  const html = await readFile(path, 'utf8');
  assert.match(html, /<html lang="en">/, `${page}: language`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${page}: one primary heading`);
  assert.equal((html.match(/<main[\s>]/g) || []).length, 1, `${page}: main landmark`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${page}: draft indexing directive`);
  assert.match(html, /class="skip-link"/, `${page}: keyboard skip link`);
  assert.match(html, /<title>[^<]*Loyel Stone[^<]*<\/title>/, `${page}: Loyel Stone page title`);
  assert.match(html, /name="description" content="[^"]*Loyel Stone/, `${page}: SEO brand name`);
  assert.match(html, /property="og:site_name" content="Loyel Stone"/, `${page}: site name`);
  assert.match(html, /class="footer-inner"><span>Loyel Stone /, `${page}: footer brand name`);
  assert(!html.includes('[Your name]'), `${page}: unconfirmed name placeholder`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^https?:/.test(target)) {
      assert(match[0].startsWith('href=') && approvedPublicLinks.has(target), `${page}: unapproved external link or remote asset ${target}`);
      publicLinks++;
      continue;
    }
    assert(!/^(https?:|mailto:|tel:|javascript:|\/\/)/.test(target), `${page}: unexpected external or active placeholder URL ${target}`);
    const [file, fragment] = target.split('#');
    const targetPath = file ? resolve(dirname(path), file) : path;
    await access(targetPath);
    if (fragment) {
      const targetHtml = targetPath === path ? html : await readFile(targetPath, 'utf8');
      assert(targetHtml.includes(`id="${fragment}"`), `${page}: missing fragment ${target}`);
    }
    references++;
  }
}
const home = await readFile(resolve(root, 'index.html'), 'utf8');
const projectCards = [...home.matchAll(/<article\b[^>]*class="featured-project"[^>]*>([\s\S]*?)<\/article>/g)];
assert(projectCards.length > 0, 'Expected at least one real project card');
const projectIds = new Set();
for (const [card, content] of projectCards) {
  const id = card.match(/data-project="([a-z0-9-]+)"/)?.[1];
  assert(id && !projectIds.has(id), 'Each project needs a unique stable identifier');
  projectIds.add(id);
  assert.match(card, /aria-labelledby="[^"]+"/, `${id}: labelled project article`);
  assert.match(content, /<h3\b/, `${id}: project name`);
  assert.match(content, /class="status"/, `${id}: current status`);
  assert.match(content, /<p>/, `${id}: project summary`);
  assert.match(content, /class="project-topics"/, `${id}: technology or topic tags`);
  assert.equal((content.match(/<a\b/g) || []).length, 1, `${id}: one canonical link for the full card`);
  const casePage = content.match(/class="text-link project-case-link" href="([a-z0-9-]+\.html)"/)?.[1];
  assert(casePage && pages.includes(casePage) && !requiredPages.filter(page => page !== 'sayright.html').includes(casePage), `${id}: a dedicated local case study`);
}
const about = await readFile(resolve(root, 'about.html'), 'utf8');
assert.match(about, /Bachelor's Degree in Artificial Intelligence/, 'Confirmed qualification');
assert.match(about, /Graduated June 2026/, 'Confirmed graduation date');
assert(!/\[Institution name\]|\[Degree or qualification\]|\[Subject \/ major\]|\[Start – end \/ expected\]/.test(about), 'No stale education placeholders');
const css = await readFile(resolve(root, 'assets/styles.css'), 'utf8');
for (const match of css.matchAll(/url\('([^']+)'\)/g)) {
  await access(resolve(root, 'assets', match[1]));
}
for (const font of ['newsreader-roman.ttf', 'newsreader-italic.ttf', 'dm-sans.ttf']) {
  const bytes = await readFile(resolve(root, 'assets/fonts', font));
  assert.equal(bytes.readUInt32BE(0), 0x00010000, `${font}: valid TrueType header`);
}
for (const license of ['Newsreader-OFL.txt', 'DM-Sans-OFL.txt']) {
  assert.match(await readFile(resolve(root, 'assets/fonts', license), 'utf8'), /SIL OPEN FONT LICENSE/);
}
const study = await readFile(resolve(root, 'sayright.html'), 'utf8');
for (const id of ['problem', 'vision', 'role', 'features', 'technical', 'challenges', 'testing', 'status']) {
  assert(study.includes(`class="case-section" id="${id}"`), `Missing case-study chapter: ${id}`);
}
console.log(`PASS: ${pages.length} pages; ${projectCards.length} project card(s); ${references} local links/assets; ${publicLinks} approved public links; Loyel Stone brand and confirmed education; eight SayRight chapters; font files and licenses.`);
