# ChatGPT Sites compatibility investigation — 29 October 2026

## Conclusion and evidence level

**The current static portfolio is compatible with the documented Sites project format.** This is a source/configuration assessment, not a successful Sites deployment or a guarantee of personal-profile placement. No Site, hosting manifest, adaptation copy, source credential, saved version or deployment was created during this investigation.

GitHub Pages remains the primary published site. A future ChatGPT Site would be a separately managed presentation copy, not a migration or replacement.

## What can be reused

The current `dist/` has five standalone HTML pages, shared CSS/JavaScript, a favicon, local TTF fonts with OFL licenses, robots.txt and sitemap.xml: 15 regular files, about 1.26 MB total. It needs no backend, framework build, database, sign-in or API key. Relative `.html` links and asset paths make it a suitable static-site candidate.

The installed Sites skill explicitly supports buildless HTML/JavaScript with `dist/index.html`. Its static preparer accepts `static.directory: "dist"`, checks the directory for regular files and copies the whole static tree, rather than only index.html. That supports retaining all five pages and the font assets. No documented five-page limit was found. Actual `.html` deep links, MIME types, fonts, keyboard navigation and narrow-screen behaviour still require checks on the eventual Sites host; they have not been exercised there.

Local evidence read, not executed: Sites plugin 1.1.2 `skills/sites/SKILL.md`, `scripts/set-project-id.mjs`, `scripts/package-site.mjs` and `skills/sites/scripts/prepare-site-build.cjs`. Available connector schemas separately expose Site creation, saving pushed source versions and deployment. Tool availability does not establish account quota, permission to publish publicly or successful hosting.

## Smallest follow-up, only after Owner approval

1. **Verify the profile goal first.** In the actual personal-profile editing UI, check whether Featured works / 精选作品 accepts a published Site owned by this account, an external URL, or another item type. The official pages reviewed do not establish this control, and the current tool cannot inspect the Codex app’s own UI. No exact menu sequence or guaranteed placement is claimed. If a Site selector exists, the Owner would select the accepted published Site and save the profile after checking its public audience; if the control is absent, stop and reassess before creating a second host.
2. **Create an isolated copy in a separately approved location.** Copy only the approved website files and necessary local check/preview scripts. Do not copy the existing `.git`, GitHub Pages workflow, local QA screenshots, credentials or unrelated files. Do not change the main checkout, its origin, branch or Pages environment. Keep the new Site source repository independent.
3. **Register one Site only when authorised.** Reuse any existing Site identity if one is subsequently assigned; do not create duplicates. Persist the returned real project ID in the copy’s `.openai/hosting.json`, with `static.directory: "dist"`. The ID must come from Sites, not an invented slug or GitHub URL. No framework, runtime package, database or custom domain is needed. Keep the Site private during review; do not opt into automatic publish-on-push.
4. **Validate before packaging.** Run the website checks in the copy, after recording its approved files in its own source repository. Use the current Sites helper to package the configured static tree and source manifest, review archive contents, push only to the returned Sites source remote, and save a version without deploying it. A packager may add generated `.openai` metadata inside its staged output; do not weaken the GitHub Pages checker’s hidden-file rejection or add those generated files to the main site.
5. **Publish separately, only on explicit instruction.** Review the saved version, audience, current quota and platform behaviour first. Then publish for the approved audience and verify the returned production URL and all five direct page URLs. A private Site is not suitable as a publicly browsable featured work. Finally, the Owner uses the profile control verified in step 1; publishing a Site does not itself prove that it appears on a profile.

The minimum source addition in the isolated copy is the Sites hosting manifest. The existing HTML/CSS/JavaScript/fonts need no architectural rewrite. Additional edits should be limited to concrete host issues found in testing, not assumed in advance.

## Decisions and limits to resolve

- **Featured-profile support is unverified.** No corresponding profile-editing action is exposed by the available Sites connector. This is the main unresolved dependency for the requested end-to-end goal, not evidence that static hosting is unsupported.
- **Account entitlement and usage:** public-beta inclusion depends on the eligible plan, region, workspace and current limits. The official pricing page does not promise unlimited hosting. This investigation did not inspect account billing or quota, purchase anything, or verify numeric site/traffic/file limits. Check the actual Sites UI before registration and public publication.
- **Platform analytics:** the official Manage a site guide says Sites records traffic automatically without an analytics SDK. We would add no tracking code, but cannot describe the host itself as having no analytics. Whether this is acceptable must be decided by the Owner; no opt-out has been verified.
- **Two-host maintenance:** source updates and deployments would be independent. A GitHub push or GitHub Pages run does not update Sites. Choose a source snapshot and a deliberate copy/update process to avoid stale versions.
- **SEO remains pointed at GitHub Pages:** direct reuse preserves the existing canonical, Open Graph URLs and sitemap origin at `https://loyel-stone.github.io/`. Treat this as a secondary showcase copy. If the Owner wants the Sites URL indexed independently, that requires a separate decision and copy-only metadata/check adjustments; do not change the primary site’s current SEO configuration as an incidental adaptation.
- **Runtime limits:** static hosting is the intended fit. The documented platform does not support every framework or private-network/background-service pattern. None is needed here. No live routing test or specific static-page quota was available without creating a Site, so those remain host-verification items.

## Current official sources

- [Create a site](https://learn.chatgpt.com/docs/sites/creating-a-site): existing local projects and save-without-deploy workflow.
- [Sites overview](https://learn.chatgpt.com/docs/sites): compatible existing projects and supported runtime boundaries.
- [Publish and share](https://learn.chatgpt.com/docs/sites/publishing-and-sharing): review, access and public publishing.
- [Manage a site](https://learn.chatgpt.com/docs/sites/managing-a-site): hosting manifest, saved versions, deployments and built-in traffic analytics.
- [Pricing](https://learn.chatgpt.com/docs/pricing): eligible-plan inclusion and availability qualifications.
- [Desktop app settings — Profile](https://learn.chatgpt.com/docs/app/settings): general profile controls; it does not document the requested featured-Site selector.
