# jajehfinancial.com

Static site for Jajeh Financial, hosted on GitHub Pages (repo: overtaxedgoose/jajehfinancial.com).
Migrated from GoDaddy Websites+Marketing in August 2026.

## Structure
- Plain HTML/CSS, no build step. Pushing to `main` deploys via GitHub Pages.
- `index.html` — one-page site: hero, services, appointments, industries, about, contact
- `links.html` (/links), `privacy-policy.html` (/privacy-policy)
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
- Reports → https://www.myaltavista.com/ ; Tax → unisoncpa.com ; Sharefile → jajeh.sharefile.com

## Rules
- NEVER publish an email address anywhere on this site (including the privacy policy) —
  Patrick's addresses must stay protected. All contact goes through the native forms.
- URL paths /links and /privacy-policy must keep working (Pages serves links.html at /links).
- DNS at GoDaddy; email on Google Workspace — never change NS/MX/TXT records.
