# Portfolio verification records

## Arch/LS refinement and isolated Sites preparation — 29 October 2026

- Starting main revision: `edd0e8fa88cae59e34741de65290a575a44a57a9`, clean main. The only website-source changes are the favicon SVG and the `.brand-mark` CSS block; all five HTML files, SayRight content, education, SEO, JavaScript, fonts and Pages workflow remain byte-identical to the accepted revision.
- Original/candidate rendered comparison at navigation size and 16, 20, 24, 32 and 48-pixel icon sizes: the LS source was retained after review. Both navigation and favicon now reference one SVG. The navigation box remains 30 × 34; original warm-paper and terracotta values remain. Local comparison/mobile captures are ignored under `docs/previews/`, not website assets or committed evidence images.
- Main `npm run check`, `node scripts/check-pages.mjs`, `git diff --check`: PASS; 15 tracked publication files, 77 HTML local references and 92 root-domain references including the shared SVG background. Main indexing policy remains unchanged.
- The independent Sites copy has 14 static files, no .git or .github, no remote and no project_id. Its `npm run check` passed JavaScript syntax, five-page structure, four approved public-link occurrences, canonical/Open Graph consistency, font/license checks, exact file allowlist, 86 root-domain references and the secondary noindex/no-sitemap policy. Body/asset byte comparison passed against the main source; only mirror SEO differs.
- Official local `prepare-site-build.cjs`: returned `static` for the copy without a project ID. All 14 website files were preserved in ignored staging, with only generated hosting metadata added. No Site API, registration, remote save or deployment was invoked.
- Browser evidence: both loopback hosts, five pages each at actual 320, 390, 768 and 1440 CSS pixels (40 verified combinations), no horizontal overflow; fonts loaded; decorative mark semantics and 30 × 34 dimensions preserved. At 390px on both hosts, Menu/close, Escape focus restoration, Skip to content and Enter on the project link passed. No console errors were captured during the checked journey.
- Local HTTP: all 15 main and 14 copy publication files returned 200 with exact source bytes. Root manifest, Git configuration and README probes returned 404 on both preview servers. These checks establish local static behaviour, not Sites-host MIME/routing support or complete WCAG conformance. Browser-specific native favicon treatment, Safari, physical devices and screen readers were not separately tested.
- Long-term positioning was reviewed with no rewrite; existing education can accept additional confirmed records later, with none invented now. Sites profile placement, account quotas and acceptance of platform analytics remain Owner decisions. No GitHub Pages dispatch is part of this source-only task; temporary preview servers and viewport overrides are cleaned up after inspection.

## Current production status — 29 October 2026

- Official site: `https://loyel-stone.github.io/`; Public repository `Loyel-Stone/loyel-stone.github.io`; GitHub Pages enabled.
- First accepted production revision: `a018a7550ef4dc6479ee0c24e9da5ae602fc8754`. [Run 40810073671](https://github.com/Loyel-Stone/loyel-stone.github.io/actions/runs/40810073671) is completed/success, event `workflow_dispatch`, attempt 1, for that exact SHA. The GitHub API confirms the repository identity, Public visibility, enabled Pages and one workflow run at the time of this check.
- Owner confirmation: all five live pages were visited and accepted on 29 October 2026. Separate read-only HTTP checks in this task returned 200 for all five and found their full HTML bytes equal to the production revision above. The live About page still contains the earlier postgraduate-purpose sentence; the source-only wording update in this task has not been deployed.
- Indexing is permitted with canonical URLs, robots.txt and a five-page sitemap. Actual search-engine indexing, search traffic and social-platform rendering are unverified. No traffic or user-count claim is made.
- ChatGPT Sites is a separate platform. No Site has been created, registered, saved or published for this portfolio. Its static compatibility investigation is recorded in `SITES-COMPATIBILITY.md`; featured-profile placement and account quota remain unverified.

## Post-launch documentation and positioning update — 29 October 2026

- README, deployment guidance, current content/design policy and this status record now distinguish the live site from the historical preparation stages. Deployment guidance covers future manual updates and normal revert commits followed by a separate manual deployment; it does not describe push-based deployment.
- The only website change is one About paragraph: selected projects and product/engineering decisions replace the application-cycle positioning. Education, role and AI-tool disclosure, SayRight narrative and validation boundaries are preserved. The future arch + LS logo direction is documented only; no mark or asset was changed.
- `npm run check`, `node scripts/check-pages.mjs` and `git diff --check`: PASS. Five pages, 77 local links/assets, four approved public-link occurrences, 15 tracked publication files, 91 root-domain references; existing metadata, sitemap, font/license and accessibility-structure checks pass.
- Bounded diff verification: only the approved About paragraph differs within `dist/`; all five head blocks, the four other pages, CSS, JavaScript, fonts, favicon, robots.txt, sitemap.xml, check scripts and Pages workflow are unchanged from the starting source revision. No full browser, screen-reader or physical-device audit was rerun for this text-only edit.
- Sites investigation used current official OpenAI documentation, installed static helper source and connector schemas only. No provisioning, packaging, source-write credential, deployment or profile edit was attempted. The tool could not read the Codex app’s own interface; an exact featured-work menu sequence is not asserted.
- This task permits a normal source commit/push only. It does not request an Actions run, change the Pages environment or publish either host. A later deployment must be authorised and verified separately.

## Historical prelaunch and content records

The entries below preserve the facts and limits at each earlier stage. Their Private / not-deployed statements are historical and do not describe the current production status above.

## SEO launch preparation — 2026-10-29

- Starting revision: `604d1090b41692537ad348b2e17bd06aed3b7756` on clean `main`. This entry supersedes earlier indexing restrictions; the older records below describe the policy at their respective stages.
- `npm run check`: PASS; five pages, 77 local links/assets, four approved public-link occurrences, unique canonical/title/description metadata, matching text Open Graph metadata, crawlable robots.txt and an exact five-URL sitemap. Existing brand, education, chapter, font/license and accessibility-structure checks remain in place.
- `node --check scripts/check.mjs`, `node --check scripts/check-pages.mjs` and `node scripts/check-pages.mjs`: PASS; the artifact now contains 15 tracked regular files with 91 root-domain URL references. Only the exact root filenames `robots.txt` and `sitemap.xml` were added to the publication-type allowlist; hidden, untracked and linked files remain rejected.
- Independent Python standard-library HTML/XML parsing: PASS; correct sitemap namespace and five exact canonical URLs, matching decoded Open Graph text, no robots restriction or unapproved sharing image. All five original titles, meta descriptions and complete page bodies match the starting revision exactly.
- Controlled offline fixtures: one valid site accepted; seven invalid variants rejected for the expected reasons (Home canonical using index.html, crawler noindex, wrong Open Graph URL, unapproved image, blocking robots rule, extra sitemap page and malformed XML). Only ignored temporary copies inside this project were used and removed.
- `git diff --check` and staged whitespace checks: PASS. Pages workflow, CSS, JavaScript, fonts, licenses, favicon, package configuration and preview server remain unchanged. No new dependency, analytics or tracking code was introduced. No browser/visual QA was repeated for unchanged page bodies and assets.
- These are static preparation results. Repository visibility remains Private; no Pages enablement, workflow dispatch, deployment, search-account verification or sitemap submission is part of this task. Live HTTP headers, actual search indexing and social-platform rendering remain unverified until authorised publication.

## GitHub Pages preparation — 2026-10-29

- Starting revision: `dad1446fbc0eb1f2b588117d3f13eea7c8856ed0` on clean `main`.
- `npm run check`: PASS; five pages, 77 local links/assets, four approved public-link occurrences, eight SayRight chapters, fonts/licenses and existing `noindex, nofollow` directives.
- `node --check scripts/check-pages.mjs` and `node scripts/check-pages.mjs`: PASS; 13 tracked regular publication files and 80 root-domain URL references. No hidden paths, symlinks, hard links, untracked files or unapproved file types under `dist/`.
- actionlint 1.7.12: PASS for `.github/workflows/pages.yml` with optional ShellCheck/Pyflakes integration disabled. The temporary official Darwin ARM64 archive was verified against its published SHA-256; no project dependency was added.
- Parsed-YAML policy assertions: PASS for dispatch-only trigger, main/repository guard, empty global permissions, minimal per-job permissions, dependent deployment, `github-pages` environment, SHA-pinned official actions, `dist/` artifact and `enablement: false`. No custom secret references or additional shell deployment commands.
- `git diff --check`: PASS. All `dist/` bytes match the starting revision, including five HTML pages, CSS, JavaScript, fonts, licenses and favicon. No visual or interaction changes; browser QA was not repeated for unchanged assets.
- This is local static validation only. No Actions run, artifact upload, Pages enablement, deployment, live HTTPS/site check or repository visibility change was performed. Publication remains an Owner action described in `docs/DEPLOYMENT.md`.

## Content closeout — 2026-10-29

- `npm run check`: PASS. Five pages, one project card, 77 local links/assets, four approved public-link occurrences, Loyel Stone branding, confirmed education, eight SayRight chapters, local fonts and licenses.
- `git diff --check`: PASS. Shared CSS, JavaScript, fonts, favicon, preview server, package configuration, check script and ignore rules are unchanged from the baseline.
- Removed all six factual placeholders, the unconfirmed About interests/philosophy and visitor-facing editing prompts. Contact now contains only the confirmed GitHub profile, separate Public Demo and local case study. All five pages retain `noindex, nofollow`.
- SayRight comparison: the seven chapters outside My Role are unchanged; the role paragraph remains unchanged. Only the contribution placeholder and its editing note were replaced with a concise AI-tool / non-sole-authorship boundary. Historical test counts, their scope, development status and release limitations remain unchanged.
- Local HTTP: all 13 tracked files under `dist/` returned 200. README, content documentation, Git configuration and a missing page returned 404; POST returned 405.
- In-app browser: all five pages at 320, 390, 768, 1024 and 1440 CSS pixels (25 views) had no horizontal overflow. Each view retained one h1, one main landmark, one current navigation item, loaded fonts and named links/buttons; no visible factual placeholders or editing prompts were found.
- At 390px on every page, Menu opened, Escape closed it and returned focus to Menu; keyboard activation of Skip to content focused main. The Home project link opened the SayRight case using Enter. Testing & Iteration navigation placed its heading below the sticky header. No console errors were captured during this test session.
- Desktop Contact and mobile About, Skills and Contact were visually inspected. The Contact proof image is local-only under ignored `docs/previews/`; it is not a website asset or part of the commit.
- Temporary viewport overrides were reset and the owned preview server was stopped after checking.

These are portfolio checks, not fresh SayRight tests or a full WCAG audit. External GitHub link destinations were checked against the approved URLs; their contents were not audited. Physical devices, Safari and screen readers were not tested. No other project or private product repository was accessed. No website deployment, Pages activation or repository visibility change is authorised by this work.

## Historical first-version verification — 2026-10-28

The following records describe the initial version only; its content gaps and Git state are superseded by later work and the closeout above.

## Executed

- `npm run check`: PASS. JavaScript syntax; five English HTML pages; local links and fragments; unique IDs; one primary heading and main landmark; skip links; draft indexing directives; font assets and licenses; eight case-study chapters.
- HTTP checks: all five pages, CSS, JavaScript and three font files returned 200. `/README.md`, `/docs/CONTENT.md`, `/.git/config` and a missing page returned 404. POST returned 405. Preview binds only to `127.0.0.1` and serves only `dist/`.
- In-app browser: measured every page at 1440, 1024, 768, 390 and 320 CSS pixels. An initial 320px SayRight overflow was found in the title and concept diagram, then repaired. All five pages were rechecked at 320, 390 and 1440: document width equals viewport width.
- Mobile menu: expand state true, Escape closes it, focus returns to Menu.
- Keyboard skip link: Enter moves focus to the main landmark.
- Case-study link: Testing & Iteration resolves to `sayright.html#testing`; its chapter starts approximately 90px below the viewport top on mobile, clear of the sticky header. Smooth scrolling was removed after an initial check exposed delayed positioning.
- No console errors were reported during the tested mobile case-navigation journey.
- Main text contrast calculations: ink/paper 12.35:1; muted/paper 5.38:1; clay/paper 5.54:1; status/project panel 4.76:1; placeholder text/panel 5.93:1.
- Desktop and mobile screenshots are stored in `docs/previews/`, outside the public site directory.

## Scope and limits

These checks concern this portfolio only. They do not verify SayRight source, implementation, test outcomes or release quality. No other project was read. Content is grounded only in the owner's supplied description; factual gaps and suggested personal wording remain labelled.

This is not a complete WCAG audit. Safari, physical mobile devices and screen-reader use were not separately tested. Education, contact details, personal tool proficiency, screenshots and project evidence still need owner input. No Site registration, deployment or publication was performed. The initially empty project directory was not a Git repository; no Git history was created or modified.
