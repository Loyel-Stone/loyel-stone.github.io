# First-version verification — 2026-10-28

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
