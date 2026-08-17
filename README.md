# Kūkulu ʻIke Website

This is a plain HTML/CSS/JavaScript website — no build tools, no npm install,
no frameworks. You can open the files directly, edit them in any text editor,
and see your changes by refreshing the browser. This guide walks through
everything you need to know as a beginner.

## 1. How to preview the site on your computer

**Easiest way:** double-click `index.html` and it'll open in your browser.
That works fine for looking around, but a couple of things (like page icons
in the tab, the homepage's autoplaying video, and the YouTube video on
`events.html`) don't work when opened this way, browsers block that kind of
media on a plain double-clicked file (a `file:///...` address) for security
reasons. If a video shows a play button instead of autoplaying, or a YouTube
embed shows "Error 153," that's why, run a local server instead:

```bash
cd my-website
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. Press `Ctrl+C` in the
terminal to stop the server when you're done.

(If you use VS Code, the "Live Server" extension does the same thing with
one click, and auto-refreshes when you save a file.)

## 2. File structure

```
my-website/
├── index.html          Home page
├── about.html          About / Mission page
├── events.html         Events page (incl. the Moanalua HS workshop + sign-up form)
├── opportunities.html  Opportunity Explorer (STEM competitions & programs)
├── roadmap.html        Grade-by-grade STEM roadmap
├── contact.html        Contact / Get Involved page
├── css/style.css       All the site's styling (colors, fonts, layout)
├── js/main.js          Mobile menu, nav highlighting, and form submission (all pages)
├── js/impact-stat.js   Count-up animation for the "250+ students" stat (index.html only)
├── js/opportunities.js Filters for the Opportunity Explorer (opportunities.html only)
├── js/opportunity-matcher.js  The opportunity-matcher quiz (opportunities.html only)
├── js/roadmap.js       Click-to-expand accordion (roadmap.html only)
├── images/             Logo, icons, and real photos
└── videos/             The looping video on the Mission section of index.html
```

Every page repeats the same header (navigation) and footer, since there's
no build step to share them automatically. If you edit the nav or footer,
you'll need to copy the change into all six HTML files. (Once you're ready
to grow beyond this, a static site generator like Eleventy or a framework
like Astro can share these automatically — but you don't need that yet.)

## 3. How to edit the text

Every spot that needs real content is marked `[Placeholder]` or
`[Placeholder copy]`. Open a page in your text editor, search for
`[Placeholder`, and replace the sentence around it with your real content.
There's also a yellow "✏️" note box near the top of most pages listing
what still needs attention on that page — you can delete those note boxes
(the `<div class="placeholder-note">...</div>` block) once you're done.

## 4. How to replace placeholder images

Two kinds of images are used:

- **Brand graphics** (`images/logo.svg`, `images/hero-graphic.svg`, the
  `images/icon-*.svg` files) — these are custom vector illustrations built
  from your brand colors. You can use them as-is, or replace them later
  with your own logo/illustrations by swapping the file (keep the same
  filename, or update the `src="images/..."` reference in the HTML).
- **Photo placeholders** — dashed boxes like this:
  ```html
  <div class="placeholder-box">
    <span class="pb-icon">📷</span>
    <span>[Placeholder photo] Add a photo here</span>
  </div>
  ```
  To swap one for a real photo, replace the whole `<div class="placeholder-box">...</div>`
  block with an image tag, e.g.:
  ```html
  <img src="images/your-photo.jpg" alt="Describe the photo here">
  ```
  Put your photo file in the `images/` folder first.

## 5. How to change the brand colors or fonts

Open `css/style.css` and look at the very top for this block:

```css
:root {
  --blue: #1b3a8f;
  --green: #2e9e5b;
  --gold: #f2b705;
  ...
}
```

These are called CSS variables — change a color here once, and it updates
everywhere on the site that uses it. The fonts (Poppins for headings, Inter
for body text) are loaded from Google Fonts in the `<head>` of each HTML
page; swap the font names there and in `--font-heading` / `--font-body` if
you want something different.

## 6. How the sign-up and contact forms work

Both forms (the workshop sign-up on `events.html` and the contact form on
`contact.html`) are connected to [Formspree](https://formspree.io) and
submissions arrive by email. Here's how it works:

- Each `<form>` tag has `data-ajax-form action="https://formspree.io/f/xljrlnbb" method="POST"`.
  The `data-ajax-form` attribute tells `js/main.js` to submit the form in
  the background (via `fetch`) instead of doing a normal page reload, so
  your custom "thanks!" message can show in its place.
- Each form also has a hidden `_subject` field (e.g. "New Event Sign-Up —
  Kūkulu ʻIke") so you can tell the two forms apart in your inbox even
  though they share one Formspree endpoint.
- If the request fails for any reason (offline, Formspree down, etc.),
  `js/main.js` falls back to a normal form submission so the visitor's
  message still goes through instead of silently disappearing.

To point either form at a different Formspree form (or a new account),
change the `action="..."` URL on that `<form>` tag; no JavaScript edits
needed. A couple of alternatives if you ever want to switch off Formspree:

- **Google Forms** — create a form in Google Forms and either link to it
  directly (swap the sign-up section for a button that opens the Google
  Form) or embed it with an `<iframe>`.
- **Netlify Forms** — if you deploy on Netlify (see below), add a
  `netlify` attribute to the `<form>` tag and Netlify collects submissions
  automatically, no third-party service needed.

## 7. Putting the site online

Once you're happy with it, two free, beginner-friendly ways to publish:

- **[Netlify Drop](https://app.netlify.com/drop)** — drag your whole
  `my-website` folder into the browser window, and it's live in seconds
  with a shareable URL.
- **GitHub Pages** — put this folder in a GitHub repository, then turn on
  GitHub Pages in the repo settings (Settings → Pages → deploy from the
  `main` branch). Good option if you're already using GitHub for other
  Kūkulu ʻIke files.

Either way, you can point a custom domain (like `kukuluike.org`) at the
site later if you buy one.

## 8. Quick checklist before launch

- [ ] Replace all `[Placeholder]` text with real content
- [ ] Swap photo placeholder boxes for real photos
- [ ] Fill in the four placeholder cards on `opportunities.html` with real opportunities
- [ ] Fill in the real grade-by-grade advice on `roadmap.html`
- [ ] Confirm the Moanalua High School event's exact time, room, and RSVP contact
- [ ] Remove the yellow "✏️" placeholder-note boxes once each page is finalized
- [ ] Test the site on your phone (or shrink your browser window) to check the mobile menu
