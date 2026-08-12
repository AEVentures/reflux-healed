# Domain setup for Reflux Healed

## Domains to register

- Primary: `reflux-healed.org`
- Redirect: `refluxhealed.org` → `reflux-healed.org`

Both were registered through Cloudflare on 2026-08-11.

## Cloudflare setup (what was used for this site)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Register both domains (or transfer them in).
3. For `reflux-healed.org`:
   - Go to **DNS** → **Records**.
   - Add these A records for the apex (`@`), **proxied** (orange cloud):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a `CNAME` for `www` pointing to `aeventures.github.io`, **proxied** (orange cloud).
   - In **SSL/TLS** → **Overview**, set the mode to **Full (strict)** once GitHub Pages has issued a certificate for `reflux-healed.org`.
   - In **SSL/TLS** → **Edge Certificates**, enable **Always Use HTTPS**.
4. For `refluxhealed.org` (redirect to primary):
   - Add a dummy A record for `@` pointing to `192.0.2.1`, **proxied**.
   - Add a dummy A record for `www` pointing to `192.0.2.1`, **proxied**.
   - Go to **Rules** → **Page Rules**.
   - Create a forwarding rule:
     - **URL matches:** `*refluxhealed.org/*`
     - **Then:** Forwarding URL → `https://reflux-healed.org/$2` with **301** status.
   - Enable **Always Use HTTPS** in **SSL/TLS** → **Edge Certificates**.
5. In the GitHub repo settings, ensure GitHub Pages is enabled and using the GitHub Actions workflow source.
6. The `public/CNAME` file in this repo is already set to `reflux-healed.org`, so GitHub Pages will accept the custom domain.
7. It can take several minutes to an hour for GitHub Pages to issue the TLS certificate. Until then, Cloudflare can serve the site using **Full** (not strict) SSL with the GitHub wildcard certificate.

## Why this works

- GitHub Pages serves the site at the custom domain once the A records and `CNAME` file match.
- Cloudflare proxies the apex domain so `https://reflux-healed.org` works with a valid certificate even while GitHub Pages is still provisioning its own certificate.
- The Page Rule on `refluxhealed.org` runs at the Cloudflare edge and 301-redirects every path to the hyphenated domain.

## After DNS is live

- Visit `https://reflux-healed.org` and confirm the site loads.
- Visit `https://refluxhealed.org` and confirm it redirects to `https://reflux-healed.org`.
- Check that `https://www.reflux-healed.org` redirects to `https://reflux-healed.org`.

## GitHub Pages notes

- The GitHub Pages source in this repo is the GitHub Actions workflow (`.github/workflows/deploy.yml`).
- The site uses a relative base URL (`./`) so it works at any path.
