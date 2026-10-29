# Loyel Stone portfolio design

## Purpose and journey

A long-term portfolio for Loyel Stone’s independent software and product development: selected projects, product decisions, engineering practice and substantiated work. It is not an application-specific or job-search site. Main journey: Home → SayRight → About/Skills → Contact. First decision: whether the project is relevant enough to explore. Case-study chapter links support scanning; full-page navigation and back links provide recovery. Mobile preserves the project CTA and uses an accessible disclosure menu. No backend or forms are needed for this edition.

## Chosen visual direction

An editorial portfolio: warm paper, quiet rules, ink text, terracotta accents, generous margins, asymmetric composition and numbered chapters. Serif headlines contrast with a restrained sans-serif body. The owner's warm, restrained reference is interpreted as a temperament, not a reproduction of a brand. The arch mark, expression-paper illustration and layouts are original CSS/SVG work. Avoid dashboard card grids, fake app screenshots, fabricated metrics and decorative AI gradients.

Tokens live in `dist/assets/styles.css`: paper `#f8f6f0`, ink `#2e302b`, muted `#65665d`, sand `#eeebe2`, clay `#93523b`. Shared spacing, border and typography rules apply to all five pages. No photographs are used because no approved portrait or project screenshots were supplied.

## Typography licenses

Locally hosted, unmodified variable TrueType fonts:

- Newsreader, roman and italic: https://github.com/google/fonts/tree/main/ofl/newsreader
- DM Sans, roman: https://github.com/google/fonts/tree/main/ofl/dmsans

Both are distributed under the SIL Open Font License 1.1. The original licenses are included alongside the fonts. The OFL permits commercial use subject to its terms, including keeping its copyright/license notice when redistributing font files. See the original files for the full terms. No remote font service is requested at runtime. System serif/sans-serif fonts provide fallbacks.

## Interaction and accessibility

- Semantic header, navigation, main, article, sections and footer; one primary heading per page.
- Skip link, visible keyboard focus, descriptive navigation labels and active-page state.
- Mobile menu has an expanded state, Escape handling and no focus trap. Without JavaScript all navigation remains available.
- Chapter anchors work natively; optional section highlighting is a progressive enhancement.
- No hidden-on-load content or animation-dependent navigation. Only short hover transitions; reduced-motion preference disables motion. Chapter jumps are immediate so long-page navigation has predictable positioning.
- Fluid type and layouts support small screens; the long case study has a desktop chapter rail and a compact mobile chapter list.
- Contact presents the confirmed GitHub profile, separate Public Demo and local case study in the existing two-column layout. Unconfirmed contact methods are omitted.
- Print CSS removes sticky navigation and presents the case study as a readable document.

## Maintenance and boundaries

Loyel Stone is the formal public brand and site name; navigation and first-person introductions may use Loyel. Never infer a legal name. Keep the positioning Independent Software & Product Developer. Education is limited to the confirmed degree and June 2026 graduation, without an institution.

The Home `.project-list` holds one semantic article per approved project: name, description, tags, status and a single local case-study link. Preserve SayRight first. A stretched native link makes the full card clickable; the same terracotta feedback applies to hover and keyboard focus, with an outer focus outline. Do not add focusable children or extra actions inside a card. No entrance animations, card movement or JavaScript click handlers are needed. The Projects navigation links to the existing collection; case pages mark that category current. See README for the extension procedure.

Use semantic static HTML, CSS and small JavaScript enhancements. Keep personal facts and project claims subject to owner confirmation; omit unconfirmed material from visitor-facing pages. Do not add new projects, fetch private project data, enable analytics, add remote APIs or publish updates without authorization. The approved SEO policy permits indexing at `https://loyel-stone.github.io/` with no custom domain. Use one canonical per page, matching text Open Graph metadata, crawlable robots.txt and a five-page sitemap; omit unapproved sharing images. SEO metadata does not provide privacy or authorise deployment. Local preview serves only on loopback. The repository is Public and GitHub Pages is live; updates require a separate manual deployment. ChatGPT Sites has not been created for this project. Actual indexing is unverified.

## Refined arch and LS mark

The source now retains the arch outline and warm-paper/terracotta palette with an original geometric L + S interior. The L is a short right-angle stroke; the S uses a stepped top and diagonal centre, with open spacing between strokes. No font glyph or another brand's artwork is used. Navigation and browser favicon share `dist/assets/favicon.svg`; navigation keeps its existing 30 × 34 CSS-pixel box, brand text and spacing.

The original and refined marks were compared at actual 16, 20, 24, 32 and 48-pixel icon sizes and in the navigation. The refined icon uses more of the available favicon canvas than the old padded design; the 16-pixel rendering remains a small monogram, not a promise of equally clear lettering on every browser or display. This is a source refinement awaiting Owner acceptance and a separate deployment, not a trademark-registration or legal-clearance claim. Original source remains recoverable from Git history; comparison captures are local and ignored.

The existing Education section supports additional factual qualification/date entries when real milestones are confirmed. No future admission, enrolment or graduation entry is added in advance.

For later Chinese support, use separate language pages and a meaningful language switch once content exists. Do not add a nonfunctional switch now.
