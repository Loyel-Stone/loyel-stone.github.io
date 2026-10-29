# GitHub Pages deployment preparation

Prepared 29 October 2026. This configuration has been checked locally, not run on GitHub. The repository remains Private; Pages is not enabled and no website deployment has been requested.

## Publication boundary

- Repository: `Loyel-Stone/loyel-stone.github.io`; deployment branch: `main`.
- Workflow: `.github/workflows/pages.yml`, named **Deploy portfolio to GitHub Pages**.
- Only `workflow_dispatch` is configured. Pushing commits, opening pull requests and changing repository visibility do not trigger this workflow.
- The preparation job also checks the event, repository identity and `refs/heads/main`. A dispatch on another branch is skipped.
- Only `dist/` is uploaded as the `github-pages` artifact. Its `index.html` becomes the site root. Repository documentation, scripts, Git history and ignored local previews are outside that artifact.
- The preparation job has only `contents: read`. The dependent deployment job has only `pages: write` and `id-token: write`, uses the `github-pages` environment and does not check out the repository. Top-level permissions are empty.
- Checkout credentials are not persisted; no PAT, custom secret or third-party deployment service is required. The Actions token and OIDC are supplied by GitHub for the deployment job.
- `configure-pages` explicitly uses `enablement: false`: Pages must be enabled separately by the Owner; the workflow will not create a Pages site itself.
- Deployments are serialised without cancelling a deployment already in progress. The artifact retention period is one day.
- There is no build or dependency installation. Node.js 24 runs the existing checks and the offline publication-boundary check; the maintained HTML/CSS/JavaScript is uploaded unchanged.

Official actions are pinned to full commit SHAs, with release labels in the workflow: checkout v7.0.1, setup-node v7.1.0, configure-pages v6.0.0, upload-pages-artifact v5.0.0 and deploy-pages v5.0.1. These releases, their tag-to-commit mappings and input metadata were read from the official `actions/*` repositories. Updating a pin requires reviewing its official release and rerunning validation.

## Approved SEO policy

The Owner has confirmed `https://loyel-stone.github.io/` as the formal site URL and approved search indexing. No custom domain, analytics, advertising or tracking is configured. All five pages omit `noindex, nofollow`; title and description copy is unchanged from the reviewed baseline. Each page has one absolute canonical and matching `og:title`, `og:description`, `og:type`, `og:url` and `og:site_name`. Home uses the root URL, not `/index.html`.

Open Graph image metadata is intentionally omitted until a suitable image is approved. This is text sharing metadata; it does not promise an image card or complete rich-preview support on every platform. No screenshot, portrait or product-image claim is added.

`dist/robots.txt` allows all crawlers and declares `https://loyel-stone.github.io/sitemap.xml`. The XML sitemap lists only `/`, `/about.html`, `/sayright.html`, `/skills.html` and `/contact.html` at the confirmed HTTPS origin. No invented `lastmod`, update frequency or priority is supplied. Crawling permission and sitemap inclusion do not guarantee indexing, rankings or a particular search snippet.

## Local validation without publishing

From the project root:

```sh
npm run check
node --check scripts/check-pages.mjs
node scripts/check-pages.mjs
git diff --check
```

`check-pages.mjs` reads the directory and Git index without changing either. It rejects hidden paths, untracked files, symbolic/hard links and file types outside the current HTML/CSS/JS/SVG/font/license allowlist, with exact root-file exceptions for `robots.txt` and `sitemap.xml`. Newly approved publication files must be staged before this check. It checks page, canonical, stylesheet, script, font, sitemap and robots-declared URLs as served at `https://loyel-stone.github.io/`. The existing check separately validates local fragments, approved external links, font licenses, accessibility structure, absence of indexing restrictions, unique page metadata, canonical/Open Graph consistency, robots policy and the sitemap’s restricted XML structure and exact five-URL set.

When adding approved new asset types, deliberately extend this allowlist after reviewing the asset. A filename/type check is not a content-privacy audit.

For workflow syntax, run `actionlint -shellcheck= -pyflakes= .github/workflows/pages.yml` if actionlint is available. This is a development-time static checker, not a website or workflow runtime dependency. This preparation used actionlint 1.7.12 from its official release, with the downloaded archive SHA-256 verified. A separate parsed-YAML policy check also verified triggers, permissions, dependencies, artifact directory, immutable action refs and disabled auto-enablement. No workflow was dispatched as a test.

## Owner steps after explicit approval to publish

These are future instructions, not actions completed during preparation.

1. **Approve the exact revision and public scope.** Review the current commit and history, contact links and included documents. Switching the repository to Public exposes the entire tracked repository and history, including `docs/`; limiting the Pages artifact to `dist/` does not hide repository files. Crawler metadata is not access control.
2. **Change repository visibility, only when approved.** In this exact repository, open Settings → General → Danger Zone → Change repository visibility → Public, read the effects and complete GitHub’s confirmation. GitHub Free supports Pages from public repositories; supported paid plans can use private repositories, but a private source repository does not by itself make a Pages site private. The account plan was not inspected in this preparation.
3. **Enable Pages using Actions.** Open Settings → Pages → Build and deployment → Source → **GitHub Actions**. Do not choose “Deploy from a branch”, `/` or `/docs`, and do not create another generated workflow. The prepared workflow already exists.
4. **Restrict the deployment environment.** In Settings → Environments, create or inspect `github-pages` and restrict deployment branches to `main`. If the plan supports required reviewers, an Owner review may be added. Do not broaden token permissions or add a PAT to address a setup error.
5. **Manually request the first deployment.** In Actions → **Deploy portfolio to GitHub Pages** → Run workflow, select **main**, confirm that it contains the approved revision, then click Run workflow. The workflow must exist on the default branch. No automatic `push` trigger should be added for this first publication.
6. **Verify the actual result.** Check the run’s commit SHA, both jobs, the `github-pages` environment and the URL returned by the deployment step. The expected default user-site URL is `https://loyel-stone.github.io/`, without a repository-name subpath. Use the actual returned URL as the authority; no custom domain is configured here.
7. **Check the live website.** Open Home, About, SayRight, Skills and Contact directly; check navigation and chapter anchors, CSS/JavaScript/font requests, narrow-screen layout, keyboard focus and mobile Menu/Escape. Check one correct canonical per page, matching Open Graph URLs, successful `/robots.txt` and `/sitemap.xml` responses with suitable text/XML content types, and no unexpected `X-Robots-Tag` indexing restriction. Confirm the sitemap’s five URLs and the root Home canonical. Confirm that Public Demo remains separate from the full product source. `/README.md`, `/docs/CONTENT.md`, `/scripts/check.mjs` and `/.git/config` must not be served as repository content by the site; on a public repository, documents may still be readable through GitHub itself.

The indexing policy is now approved and enforced by the local checks. Search Console or Bing Webmaster Tools verification and sitemap submission, if desired after publication, are separate Owner actions. No account verification, sitemap submission or crawler request was made during preparation.

If preparation/checks fail, no dependent deployment should run. If Pages is disabled, the workflow should fail at configuration rather than enabling it automatically. A successful local validation is not proof of GitHub runner execution, artifact upload, Pages availability, HTTPS or live-site behaviour. Record those results only after the Owner authorises and performs publication.

## Official references

- [Custom Pages workflows and permissions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Publishing-source settings and site visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [User-site repository naming and root URL](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Manual workflow dispatch](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)
- [Repository visibility changes](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)
- [Configure Pages action inputs](https://github.com/actions/configure-pages/blob/v6.0.0/action.yml)
- [Upload Pages artifact inputs](https://github.com/actions/upload-pages-artifact/blob/v5.0.0/action.yml)
- [Deploy Pages action inputs](https://github.com/actions/deploy-pages/blob/v5.0.1/action.yml)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google robots.txt guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Open Graph protocol](https://ogp.me/)
