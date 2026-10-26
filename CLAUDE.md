# jajehfinancial.com

Static site for Jajeh Financial, hosted on GitHub Pages (repo: overtaxedgoose/jajehfinancial.com).
Migrated from GoDaddy Websites+Marketing in August 2026.

## Structure
- Plain HTML/CSS, no build step. Pushing to `main` deploys via GitHub Pages.
- `index.html` — one-page site, light/dark sections alternating: hero (dark), approach
  (Build / Capture / Secure), services (`section.dark`), industries carousel, appointments (dark),
  about, contact. Keep that alternation when adding or moving sections.
- `industries/index.html` (/industries/) hub + `industries/<slug>.html` (/industries/<slug>) landing pages:
  creative-agencies, nonprofits, injury-attorneys, real-estate, residential-construction. Each follows
  the same template:
  hero > intro > "What the Books Have to Handle" (6 cards) > "The Numbers That Drive Profitability"
  (6 metrics with rule-of-thumb targets) > "From Profit to Wealth" (Build / Capture / Secure pillars)
  > CTA band > "Other industries" strip. Adding an industry = new page here, a slide in the homepage
  carousel (`<article class="ind-slide">` inside `#ind-track`; dots are generated), a card on the hub,
  a link in every other page's "Other industries" strip, and a line in sitemap.xml. Carousel tiles are
  clickable as a whole (the Explore link is stretched over the tile via `.ind-slide .more::after`).
  The real estate page links to DealSheets (jajehgroup.com/dealsheets, Patrick's deal-modeling app)
  via the `.resource` callout in its intro.
- `cfo-fit.html` (/cfo-fit) — the fractional CFO qualification survey the "See if you qualify" link on
  the homepage CFO card points to. Eight multiple-choice questions (single or multi select) + name/email.
  Scored in the browser (POINTS / TIERS at the top of its inline script; revenue under $500K always gets
  the "foundation" result), result shown on the page, and a text summary is POSTed silently into the
  CONTACT Google Form (name, email, summary in the message field) with the same spam guards. If Patrick
  wants the answers in columns instead, create a dedicated Google Form and swap the entry ids there.
- `links.html` (/links), `privacy-policy.html` (/privacy-policy)
- `private/` and `.claude/launch.json` are gitignored: local-only working files (the methodology
  canvas source, the local preview config). Nothing in `private/` is ever published.
- `downloads/` — Alta Vista EULA + Privacy Policy PDFs (rescued from GoDaddy CDN; linked from /privacy-policy)
- `assets/css/style.css` — type is Lato throughout since Oct 2026 (headings Lato 700, body Lato 400;
  `--head` and `--sans` both resolve to Lato with Helvetica Neue fallback); palette: charcoal + mint teal
  from the sail logo. Brand guide: the logo itself is Flama Condensed (Bold or Light), complementary fonts
  are Helvetica Neue LT Std or Lato. The header wordmark next to the sail mark is Lato regular, not bold;
  Flama is not a webfont we have, so never fake it with a bold sans. Libre Franklin is gone; do not
  reintroduce it.

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
and building, capturing and securing wealth from it. The niche is the growth STAGE, not an industry
(most accounting firms pick a sector; ours is growth) — say so in hero/industries copy. Bookkeeping/payroll is "the foundation", tax is
"planning all year, filing through Unison CPA". The method is three phases, "Build. Capture. Secure."
(homepage #approach band, and the "From Profit to Wealth" section on every industry page). The full
methodology graphic (phases > levels > operating rhythm) is a private Claude Design artifact that
Patrick walks prospects through; it is deliberately NOT on the site.

## Rules
- NEVER publish an email address anywhere on this site (including the privacy policy) —
  Patrick's addresses must stay protected. All contact goes through the native forms.
- URL paths /links and /privacy-policy must keep working (Pages serves links.html at /links).
- DNS at GoDaddy; email on Google Workspace — never change NS/MX/TXT records.
