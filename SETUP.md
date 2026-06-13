# One-time setup

Everything below is configured **once**. After that, editing content (CMS) auto-deploys with no further action.

## 1. CI deploy token (auto-deploy to Hostinger)

The site deploys by pushing the built `dist/` to the **`my-portfolio-dist`** repo (which Hostinger auto-pulls).

1. Create a GitHub **Personal Access Token** (fine-grained) with **Contents: Read & write** on the `my-portfolio-dist` repo.
2. In this repo → *Settings → Secrets and variables → Actions → New repository secret*:
   - Name: `DEPLOY_TOKEN`
   - Value: the token

That's it — every push to `main` now builds and deploys via `.github/workflows/deploy.yml`.

## 2. CMS login (edit content from your phone at /admin)

The CMS commits to this repo via GitHub OAuth, brokered by a tiny PHP script on Hostinger (`public/oauth/`).

1. Create a GitHub **OAuth App**: https://github.com/settings/developers → *New OAuth App*
   - Application name: `melissacolin.ai CMS`
   - Homepage URL: `https://melissacolin.ai`
   - Authorization callback URL: `https://melissacolin.ai/oauth`
2. On Hostinger, create the file **`/oauth/secret.php`** in the deployed site (not committed) with:
   ```php
   <?php
   define('OAUTH_CLIENT_ID', 'your_client_id');
   define('OAUTH_CLIENT_SECRET', 'your_client_secret');
   ```
   (or set `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` as environment variables in hPanel)
3. Visit https://melissacolin.ai/admin and sign in with GitHub.

## 3. Google Search Console (stronger search authority)

1. Add the property `melissacolin.ai` at https://search.google.com/search-console and choose the *HTML tag* verification method.
2. Copy the token and paste it into `GOOGLE_SITE_VERIFICATION` in `src/lib/seo.ts`.
3. Commit — the verification meta tag is then emitted on every page; submit `https://melissacolin.ai/sitemap.xml` in Search Console.
