# jajehfinancial.com

Static site for Jajeh Financial, hosted on GitHub Pages (repo: overtaxedgoose/jajehfinancial.com).
Migrated from GoDaddy Websites+Marketing in August 2026.

## Structure
- Plain HTML/CSS, no build step. Pushing to `main` deploys via GitHub Pages.
- `index.html` — one-page site: hero, approach (Build / Capture / Secure), services, appointments,
  industries carousel, about, contact
- `industries/index.html` (/industries/) hub + `industries/<slug>.html` (/industries/<slug>) landing pages:
  creative-agencies, nonprofits, injury-attorneys, real-estate. Each follows the same template:
  hero > intro > "What the Books Have to Handle" (6 cards) > "The Numbers That Drive Profitability"
  (6 metrics with rule-of-thumb targets) > "From Profit to Wealth" (Build / Capture / Secure pillars)
  > CTA band > "Other industries" strip. Adding an industry = new page here, a slide in the homepage
  carousel (`<article class="ind-slide">` inside `#ind-track`; dots are generated), a card on the hub,
  a link in every other page's "Other industries" strip, and a line in sitemap.xml.
- `links.html` (/links), `privacy-policy.html` (/privacy-policy)
- `private/` and `.claude/launch.json` are gitignored: local-only working files (the methodology
  canvas source, the local preview config). Nothing in `private/` is ever published.
- `downloads/` — Alta Vista EULA + Privacy Policy PDFs (rescued from GoDaddy CDN; linked from /privacy-policy)
- `assets/css/style.css` — fonts: Libre Franklin (headings) + Lato (body); palette: charcoal + mint teal from the sail logo

## External integrations
- Booking links are Google Calendar appointment schedules (calendar.app.google/...) — owned by Patrick's Google Workspace
  - Discovery Call: https://calendar.app.google/xNYgmVwws6tfUpzz5
  - Strategy Session: https://calendar.app.google/pupygBZuvnSmjG4v7
- Contact + newsletter are NATIVE forms styled to the site that POST silently (fetch no-cors)
  to private Google Forms — do not replace with iframes, they look bulky:
  - Contact Jajeh Financial /d/e/1FAIpQLSebG08vBdQqcck3ehs02-Aio5-7Qkt-4LBxPPlFLnPcewbKTA
    fields: emailAddress, entry.1375934470 (Name), entry.126211689 (message)
  - Jajeh Financial Newsletter /d/e/1FAIpQLSdoxXHpUQNjtJnkFAvnxzg--265_VbVq8pgbEas1SnQ87HH2A
    fields: emailAddress (localStorage jf-newsletter-done prevents dupes)
  Both owned by patrick@jajehgroup.com, email notifications on. If form questions ever change,
  re-extract entry IDs from the viewform data-params attributes.
- Spam guards (added Oct 2026 after regular bot fills) live in the inline script in index.html and are
  deliberately silent: a blocked submission still shows the thank-you so bots learn nothing.
  1. honeypot `company_url` field in both forms (off-screen via `.nform .hp`, never display:none)
  2. timing: nothing sent within 4s of page load; contact form also needs 3s since first focus/input
  3. link stuffing: contact messages with more than one URL are dropped
  If spam keeps arriving after this, it is being POSTed straight to the Google Form, bypassing the site.
  The fix then is a NEW Google Form (new /d/e/ id, new entry ids) and, ideally, a tiny serverless
  proxy (Cloudflare Worker / Vercel function) that verifies a Cloudflare Turnstile token server-side
  and forwards to Google, so the form id never appears in page source.
- Reports → https://www.myaltavista.com/ ; Tax → unisoncpa.com ; Sharefile → jajeh.sharefile.com

## Positioning (since Oct 2026)
Jajeh Financial is positioned first as a fractional CFO service for owners who are scaling a business
and building, capturing and securing wealth from it. Bookkeeping/payroll is "the foundation", tax is
"planning all year, filing through Unison CPA". The method is three phases, "Build. Capture. Secure."
(homepage #approach band, and the "From Profit to Wealth" section on every industry page). The full
methodology graphic (phases > levels > operating rhythm) is a private Claude Design artifact that
Patrick walks prospects through; it is deliberately NOT on the site.

## Rules
- NEVER publish an email address anywhere on this site (including the privacy policy) —
  Patrick's addresses must stay protected. All contact goes through the native forms.
- URL paths /links and /privacy-policy must keep working (Pages serves links.html at /links).
- DNS at GoDaddy; email on Google Workspace — never change NS/MX/TXT records.
