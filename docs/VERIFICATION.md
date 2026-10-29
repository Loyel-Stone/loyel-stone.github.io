# Portfolio verification records

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
