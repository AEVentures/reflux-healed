# Domain setup for Reflux Healed

## Domains to register

- Primary: `reflux-healed.org`
- Redirect: `refluxhealed.org` → `reflux-healed.org`

Both were checked by WHOIS on 2026-08-11 and were unregistered. Prices will vary by registrar and term length.

## Option A: Cloudflare Registrar + DNS (recommended if you already use Cloudflare)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Register both domains:
   - Search for `reflux-healed.org` and add to cart.
   - Search for `refluxhealed.org` and add to cart.
   - Complete checkout.
3. Wait for registration to complete (usually minutes).
4. For `reflux-healed.org`:
   - Go to **DNS** → **Records**.
   - If Cloudflare is not proxying the records (grey cloud), add:
     - Type `A`, Name `@`, IPv4 address `185.199.108.153`
     - Type `A`, Name `@`, IPv4 address `185.199.109.153`
     - Type `A`, Name `@`, IPv4 address `185.199.110.153`
     - Type `A`, Name `@`, IPv4 address `185.199.111.153`
     - Type `CNAME`, Name `www`, Target `ae-ventures.github.io` (or your org page hostname)
   - If Cloudflare **is** proxying (orange cloud), use a single `CNAME` record for `@` pointing to `ae-ventures.github.io` if your DNS provider supports CNAME flattening, or use the A records above with proxy disabled for the apex.
5. For `refluxhealed.org` (redirect to primary):
   - Go to **Rules** → **Redirect Rules**.
   - Create a rule:
     - When incoming requests match: `http.request.full_uri ne "https://reflux-healed.org"` (or any hostname other than the primary)
     - Then: `Dynamic` redirect to `concat("https://reflux-healed.org", http.request.uri.path)`
   - Alternatively, use **Bulk Redirects** with both `refluxhealed.org/*` and `www.refluxhealed.org/*` pointing to `https://reflux-healed.org/$1`.
6. In the GitHub repo settings, ensure GitHub Pages is enabled and using the `main` branch / GitHub Actions source.
7. The `public/CNAME` file in this repo is already set to `reflux-healed.org`, so GitHub Pages will accept the custom domain.
8. Wait for DNS to propagate and for the SSL certificate to be issued (GitHub Pages will do this automatically once the A records resolve).

## Option B: Namecheap

1. Register both domains at [Namecheap](https://www.namecheap.com/).
2. In the `reflux-healed.org` dashboard:
   - Go to **Advanced DNS**.
   - Add an `ALIAS` or `A` record for `@` pointing to the GitHub Pages IPs above.
   - Add a `CNAME` record for `www` pointing to your GitHub Pages hostname.
3. In the `refluxhealed.org` dashboard:
   - Use Namecheap’s **URL Redirect** feature to redirect all traffic to `https://reflux-healed.org`.
4. Enable GitHub Pages custom domain in the repo settings if it is not already set.

## After DNS is live

- Visit `https://reflux-healed.org` and confirm the site loads.
- Visit `https://refluxhealed.org` and confirm it redirects to `https://reflux-healed.org`.
- Check for SSL: both should show a valid certificate.

## GitHub Pages notes

- The GitHub Pages source in this repo is the GitHub Actions workflow (`.github/workflows/deploy.yml`).
- The `VITE_BASE_URL` is set to `/` for the custom-domain deployment.
- If you ever view the site at `https://aeventures.github.io/reflux-healed/`, assets may 404 because the base URL is set for the custom domain. To support both, change `base` in `vite.config.ts` to use the `VITE_BASE_URL` environment variable and set it differently for the GitHub preview URL.
