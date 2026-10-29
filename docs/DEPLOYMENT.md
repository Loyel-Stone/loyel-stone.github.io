# GitHub Pages deployment and maintenance

GitHub Pages first went live on **29 October 2026** at [https://loyel-stone.github.io/](https://loyel-stone.github.io/). The repository is **Public**, Pages is enabled, and manual [Run 40810073671](https://github.com/Loyel-Stone/loyel-stone.github.io/actions/runs/40810073671) completed successfully for `a018a7550ef4dc6479ee0c24e9da5ae602fc8754`. The Owner visited and accepted all five live pages. Search indexing is allowed but actual inclusion in search results is unverified.

This document describes the operating workflow. Earlier preparation-only checks remain in `VERIFICATION.md` as historical evidence. ChatGPT Sites is a separate hosting platform; this project has not been created or published there. A source push is not a GitHub Pages deployment and does not publish a ChatGPT Site.

## Publication boundary

- Repository: `Loyel-Stone/loyel-stone.github.io`; deployment branch: `main`.
- Workflow: `.github/workflows/pages.yml`, named **Deploy portfolio to GitHub Pages**.
- Only `workflow_dispatch` is configured. Pushing commits, opening pull requests and changing repository visibility do not trigger this workflow.
- The preparation job also checks the event, repository identity and `refs/heads/main`. A dispatch on another branch is skipped.
- Only `dist/` is uploaded as the `github-pages` artifact. Its `index.html` becomes the site root. Repository documentation, scripts, Git history and ignored local previews are outside that artifact.
- The preparation job has only `contents: read`. The dependent deployment job has only `pages: write` and `id-token: write`, uses the `github-pages` environment and does not check out the repository. Top-level permissions are empty.
- Checkout credentials are not persisted; no PAT, custom secret or third-party deployment service is required. The Actions token and OIDC are supplied by GitHub for the deployment job.
- `configure-pages` explicitly uses `enablement: false`: it reads the existing Pages configuration and will not enable or recreate Pages automatically if that setting is later disabled.
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

For workflow changes, run `actionlint -shellcheck= -pyflakes= .github/workflows/pages.yml` if actionlint is available. This is a development-time static checker, not a website or workflow runtime dependency. Prelaunch validation used actionlint 1.7.12 from its official release, with the downloaded archive SHA-256 verified, plus parsed-YAML policy checks. Those checks did not dispatch a workflow; the later successful first deployment is recorded separately above.

## Future updates — manual deployment

Do not change the existing Public visibility, Pages source, environment settings or dispatch-only workflow as part of an ordinary content update.

1. **Approve the change.** Review the exact diff and public content. The entire tracked repository and history, including `docs/`, is public; the Pages artifact itself contains only `dist/`. Keep secrets and private source out of both.
2. **Validate locally.** Run the commands above. Stage newly approved publication assets before `check-pages.mjs`, which requires tracked files. Review the staged diff, create a normal commit and push to this repository’s `main` without force.
3. **Record the revision.** Note the full commit SHA intended for deployment. Pushing it alone leaves the live site on the previous successful deployment.
4. **Request a deployment separately.** After Owner approval, open Actions → **Deploy portfolio to GitHub Pages** → Run workflow, select **main**, check that main still points to the approved revision, then run it. If another commit arrived meanwhile, review that revision before running. Do not add a push trigger or create another workflow.
5. **Check the run.** Confirm the run uses `workflow_dispatch`, branch `main`, and the approved SHA. Preparation must pass before deployment; review any environment approval required by the existing settings. Do not add a PAT or broaden permissions to bypass a failure.
6. **Verify the actual result.** Check the run’s commit SHA, both jobs, the `github-pages` environment and the URL returned by the deployment step. The expected default user-site URL is `https://loyel-stone.github.io/`, without a repository-name subpath. Use the actual returned URL as the authority; no custom domain is configured here.
7. **Check the live website.** Open Home, About, SayRight, Skills and Contact directly; check navigation and chapter anchors, CSS/JavaScript/font requests, narrow-screen layout, keyboard focus and mobile Menu/Escape. Check one correct canonical per page, matching Open Graph URLs, successful `/robots.txt` and `/sitemap.xml` responses with suitable text/XML content types, and no unexpected `X-Robots-Tag` indexing restriction. Confirm the sitemap’s five URLs and the root Home canonical. Confirm that Public Demo remains separate from the full product source. `/README.md`, `/docs/CONTENT.md`, `/scripts/check.mjs` and `/.git/config` must not be served as repository content by the site; on a public repository, documents may still be readable through GitHub itself.

## Rollback without rewriting history

For a faulty update, first identify the last accepted deployment SHA and the exact unwanted commit(s). With Owner approval and a clean working tree, use a normal `git revert <unwanted-commit>` for the reviewed change, resolve any conflicts, rerun both checks and inspect the resulting public content. Commit any conflict resolution as part of the revert and push normally. Then manually deploy the new revert revision on `main` and verify its run SHA and live pages. Reverting source alone does not roll back the website.

Do not reset or force-push main to an old SHA. Do not assume rerunning only a historical deployment job will work: the Pages artifact retention is one day, so old artifacts may have expired. The first accepted production baseline is `a018a7550ef4dc6479ee0c24e9da5ae602fc8754`; future accepted deployments should be recorded with their own run IDs and SHAs. No rollback is performed by these instructions.

The indexing policy is approved and enforced by local checks. Search Console or Bing Webmaster Tools verification and sitemap submission, if desired, remain separate Owner actions. Actual indexing has not been verified.

If preparation/checks fail, no dependent deployment should run. If Pages is disabled, the workflow should fail at configuration rather than enabling it automatically. A successful local validation does not establish that a newer commit has been deployed. Compare the latest successful run SHA with the intended source revision and inspect the live site. Future ChatGPT Sites versions would need separate saving, publication and verification; GitHub Pages runs cannot update them.

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
