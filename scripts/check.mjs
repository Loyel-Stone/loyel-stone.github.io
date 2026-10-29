import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = (await readdir(root)).filter((file) => file.endsWith('.html'));
const requiredPages = ['index.html', 'about.html', 'sayright.html', 'skills.html', 'contact.html'];
const origin = 'https://loyel-stone.github.io/';
const canonicalFor = (page) => new URL(page === 'index.html' ? '' : page, origin).href;
const titles = new Set();
const descriptions = new Set();
function metadata(html, attribute, key, page) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].filter(([tag]) => tag.includes(`${attribute}="${key}"`));
  assert.equal(tags.length, 1, `${page}: exactly one ${key}`);
  const content = tags[0][0].match(/\bcontent="([^"]*)"/)?.[1];
  assert(content?.trim(), `${page}: nonempty ${key}`);
  return content;
}
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
  assert.doesNotMatch(html, /<meta\b[^>]*\b(?:noindex|nofollow|none)\b/i, `${page}: no restrictive crawler directive`);
  const canonicalTags = [...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/g)];
  assert.equal(canonicalTags.length, 1, `${page}: exactly one canonical link`);
  assert.equal(canonicalTags[0][0].match(/\bhref="([^"]+)"/)?.[1], canonicalFor(page), `${page}: canonical URL`);
  const pageTitles = [...html.matchAll(/<title>([^<]+)<\/title>/g)];
  assert.equal(pageTitles.length, 1, `${page}: exactly one title`);
  const title = pageTitles[0][1];
  const description = metadata(html, 'name', 'description', page);
  assert(!titles.has(title) && !descriptions.has(description), `${page}: distinct title and description`);
  titles.add(title);
  descriptions.add(description);
  assert.equal(metadata(html, 'property', 'og:title', page), title, `${page}: Open Graph title matches page`);
  assert.equal(metadata(html, 'property', 'og:description', page), description, `${page}: Open Graph description matches page`);
  assert.equal(metadata(html, 'property', 'og:site_name', page), 'Loyel Stone', `${page}: Open Graph brand`);
  assert.equal(metadata(html, 'property', 'og:type', page), 'website', `${page}: Open Graph type`);
  assert.equal(metadata(html, 'property', 'og:url', page), canonicalFor(page), `${page}: Open Graph URL matches canonical`);
  assert.doesNotMatch(html, /<meta\b[^>]*(?:property|name)="(?:og:image[^"]*|twitter:image[^"]*)"/i, `${page}: no unapproved sharing image`);
  assert.match(html, /class="skip-link"/, `${page}: keyboard skip link`);
  assert.match(html, /<title>[^<]*Loyel Stone[^<]*<\/title>/, `${page}: Loyel Stone page title`);
  assert.match(html, /name="description" content="[^"]*Loyel Stone/, `${page}: SEO brand name`);
  assert.match(html, /property="og:site_name" content="Loyel Stone"/, `${page}: site name`);
  assert.match(html, /class="footer-inner"><span>Loyel Stone /, `${page}: footer brand name`);
  assert(!html.includes('[Your name]'), `${page}: unconfirmed name placeholder`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
  // Canonical metadata uses the confirmed site URL; navigation still uses the approved-link policy.
  const linkedContent = html.replace(canonicalTags[0][0], '');
  for (const match of linkedContent.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
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
const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
assert.deepEqual(robots.split(/\r?\n/).map((line) => line.trim()).filter(Boolean), [
  'User-agent: *', 'Allow: /', `Sitemap: ${origin}sitemap.xml`,
], 'robots.txt: allow all crawlers and declare the confirmed sitemap only');
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
// This site uses a deliberately small XML vocabulary: urlset > url > loc, with absolute URLs.
assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">\s*(?:<url>\s*<loc>[^<&]+<\/loc>\s*<\/url>\s*)+<\/urlset>\s*$/, 'sitemap.xml: supported well-formed XML structure');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'sitemap.xml: no duplicate URLs');
assert.deepEqual([...sitemapUrls].sort(), requiredPages.map(canonicalFor).sort(), 'sitemap.xml: only the five approved canonical page URLs');
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
console.log(`PASS: ${pages.length} pages; ${projectCards.length} project card(s); ${references} local links/assets; ${publicLinks} approved public links; canonical/Open Graph metadata; crawlable robots.txt and five-URL sitemap; Loyel Stone brand and confirmed education; eight SayRight chapters; font files and licenses.`);
