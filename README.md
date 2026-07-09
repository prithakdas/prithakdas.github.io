# Prithak Das — Portfolio

Two-page static site (no build step required): `index.html` (home) and
`certificates.html` (internships / CTF / hackathon credentials).

## Folder structure

```
index.html
certificates.html
css/style.css
js/main.js
assets/
  resume/Prithak_Das_Resume.pdf   ← your resume, already in place
  certs/                          ← add certificate files here
  projects/shadowmap/             ← add ShadowMap deck/screenshots here
```

## Latest update: professional tone + UI/UX polish

- Removed all terminal/command-line roleplay (fake `$` prompts, `ls`/`cat`-style
  headings, macOS traffic-light title bars, blinking cursor). Kept the cyan +
  magenta color palette and monospace accents for a technical feel, but the
  copy now reads like a normal professional site.
- Button labels are now plain text ("Download Resume", "View Certificate",
  "View on GitHub") instead of underscore/code-style labels.
- Added UI/UX improvements:
  - **Scroll-reveal animation** — cards fade/slide into view as you scroll.
  - **Scrollspy navigation** — the nav highlights whichever section you're
    currently viewing.
  - **Back-to-top button** — appears after scrolling, click to smooth-scroll up.
  - **Copy-email button** — one click to copy the email address in the contact card.
  - A small shield-icon favicon.

## Status: what's already wired in

- ✅ All certificates you sent are in `assets/certs/` and every "View"/"Download"
  button on both pages opens the real file.
- ✅ Real profile links: LinkedIn, GitHub, TryHackMe, HackTheBox, CTFtime
  (personal + team) in the `#links` section.
- ✅ Real GitHub repo links on every project card.
- ✅ Added credentials that weren't in the original resume but were in your
  certificate uploads: Be10X AI Tools Workshop (main certifications section),
  Datacom job simulation (Internships tab), BrainCON 2K25 / ZeroBreach CTF 2026 /
  ZeroDay Heist CTF 2026 (CTF tab), and a new **Write-ups** tab linking your
  three CTF write-up PDFs on GitHub.
- ⏳ **Still pending — waiting on you:** the ShadowMap presentation deck. Its
  project card currently links to a placeholder. Two internship
  confirmations (Unified Mentor, Brainware VAPT) and the "Ethical Hacking
  Training" cert also don't have files yet — those buttons show a placeholder
  modal until you send them.
- ℹ️ Two project cards (CI/CD Pipeline, Static Website Hosting on Azure) had no
  matching repo name in what you sent, so their "View on GitHub" currently
  points at your general profile (`github.com/prithakdas`) — send the specific
  repo names if you want them linked directly.

## 1. Add the ShadowMap deck (only remaining item)

Since ShadowMap's source isn't public, its project card links to a
"View Presentation" placeholder. Once you send the PPT, export it as a PDF or
images, place it in `assets/projects/shadowmap/`, then link it the same way
as the certificate files above:
```html
<a href="assets/projects/shadowmap/shadowmap-deck.pdf" target="_blank" rel="noopener">▶ View Presentation</a>
```

## 2. Adding any future certificate

Every "View"/"Download" button follows the same pattern — a file in
`assets/certs/` linked with:
```html
<a href="assets/certs/your-file.pdf" target="_blank" rel="noopener">View</a>
<a href="assets/certs/your-file.pdf" download>Download</a>
```

## 4. Contact form

The form currently opens the visitor's email client via a `mailto:` link —
this works with zero setup but depends on the visitor having a mail client
configured. For messages to land in your inbox automatically without that
dependency:

1. Sign up for a free endpoint at [Formspree](https://formspree.io) or
   [EmailJS](https://www.emailjs.com).
2. In `js/main.js`, replace the `mailto:` logic in the `contactForm` submit
   handler with a `fetch()` POST to your endpoint (both services provide a
   copy-paste snippet for this).

## 5. Deploying

This is a static site — no server or build step needed. Easiest free options:

- **GitHub Pages**: push this folder to a repo, enable Pages in repo settings.
- **Netlify / Vercel**: drag-and-drop the folder in their dashboard.

## Notes

- Both pages share `css/style.css` and `js/main.js`.
- The design uses a terminal/SOC (security operations center) visual theme —
  monospace command-style headers and a severity-color tagging system
  (critical/high/info/low) borrowed from vulnerability triage.
