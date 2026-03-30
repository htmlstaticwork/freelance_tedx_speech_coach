# Prompt — Freelance TEDx Speech Coach

> **Dashboard: YES** — Clients book sessions, upload drafts, track rehearsal progress.

---

## IDENTITY & CONCEPT

Build a complete multipage website for **"StageReady"** — a freelance coach specializing in TEDx and keynote talk preparation. The site must feel like a **speaker's war room** — focused, confident, results-driven — not a generic coaching template.

**Technology**: Bootstrap 5 + Bootstrap Icons + Vanilla JS only.  
**Branding**: Single SVG logo (microphone-spark icon + "StageReady" text). Reuse everywhere. Favicon from SVG.

---

## ANTI-REDUNDANCY RULES (MANDATORY)

- ❌ No life-coach aesthetic (soft pastels, vague empowerment quotes).
- ❌ No generic coaching sections (crossed-arms hero, "My Approach" circles).
- ✔ Every section must be **public-speaking specific** — speech structure, rehearsal timelines, audience psychology.
- ✔ Content must reference TEDx concepts: "18-minute rule," "idea worth spreading."
- ✔ If a section could sell fitness or therapy coaching, **redesign it**.

---

## FOLDER STRUCTURE (STRICT — DO NOT CHANGE)

```
stageready/
├── index.html
├── home-2.html
├── about.html
├── services.html
├── service-details.html
├── blog.html
├── blog-details.html
├── pricing.html
├── contact.html
├── login.html
├── register.html
├── dashboard.html
├── 404.html
├── coming-soon.html
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── dark-mode.css
    │   └── rtl.css
    ├── js/
    │   ├── main.js
    │   └── dashboard.js
    ├── images/
    └── fonts/
```

❌ No extra folders. ❌ No nested page directories.

---

## DESIGN SYSTEM

**Palette** (STRICT — 3 colors only):
- **Black** (#000) → text in light mode.
- **White** (#FFF) → backgrounds in light mode, text in dark mode.
- **Accent: TEDx Red** (#E62B1E) → buttons, links, emphasis, all highlights.
- ❌ NO other colors. No Charcoal accent, no grey, no muted tones.

**Typography**:
- H1: 40–48px bold commanding sans-serif.
- H2: 32–36px. H3: 24–28px. Body: 16–18px.
- Line height: 1.25–1.5.
- Max 2–3 font families. Use Google Fonts.

**Dark Mode**: Separate `dark-mode.css` file. Deep Charcoal (#171717). High contrast. Theme toggle in header.

**RTL**: Separate `rtl.css` file. Full support.

---

## RESPONSIVE BREAKPOINTS (NON-NEGOTIABLE)

- **280px – 1100px** → Hamburger ONLY, Offcanvas, centered logo.
- **1100px+** → Full desktop nav.

Test at: 320px, 480px, 768px, 1024px, 1440px.

Mobile-specific:
- Touch-friendly buttons (minimum 44px).
- Reduced animations on mobile.
- Simplified tables/data display.
- Optimized image sizes for mobile data.

---

## HEADER (ALL PAGES IDENTICAL)

Logo, Nav (Home, About, Programs, Pricing, Blog, Contact), "Book a Session" CTA, Login, Theme toggle (top-right).

## FOOTER (ALL PAGES IDENTICAL)

4 columns (Brand/Social, Programs, Resources, Newsletter). © 2026. Back-to-top.

---

## HOME 1 (`index.html`) — "Own the Stage"

**S1 — Countdown Clock** (NOT generic hero): Full-viewport dark section. H1: "Your TEDx Talk Is In ___ Days." Live JS countdown timer (90 days). "Are you ready?" + "Start Preparing" button. No image. Pure typographic urgency.

**S2 — Speech Anatomy Breakdown**: Vertical diagram showing 18-minute talk structure: Hook (0:00–1:30) → Problem → Insight → Evidence → Call to Change → Closing Line. Proportional accent-colored bars. Not steps — a visual speech map.

**S3 — Before/After Transformation**: 2-column split card, ONE client story. Left (muted): "Dr. Priya, 4 months ago — terrified, couldn't finish 5-min draft." Right (vivid): "Today — TEDxBangalore, 1.2M views, 3 keynote invites." No carousel.

**S4 — Coaching Comparison Table**: "What Most Coaches Do" vs. "What StageReady Does." 4 rows of contrasts. Table format, not cards.

**S5 — Stats Strip**: 4 numbers (2×2 mobile, 4×1 desktop): "47 Talks Coached" / "12M+ Views" / "6 Continents" / "92% Standing Ovation."

**S6 — CTA**: H2: "The world needs your idea." Email + "Book Free Discovery Call."

---

## HOME 2 (`home-2.html`) — "The Speaker's Path"

**S1**: Horizontal roadmap — 5 milestones: Apply → Craft Idea → Write Script → Rehearse → Deliver. Connected path.
**S2**: 4 client badges (2×2) — industry tag, talk title, event name.
**S3**: Single large blog preview — full-width, contrarian title.
**S4**: FAQ accordion (4 questions).
**S5**: CTA same as Home 1.

---

## OTHER PAGES

**about.html**: Coach backstory timeline → Philosophy blockquote → 2×2 credentials → Media logos.
**services.html**: 4 program cards (2×2): TEDx Full Prep, Keynote Sprint, Script Surgery, Stage Sim Day.
**service-details.html**: Hero → Week-by-week breakdown → Deliverables → FAQ → CTA.
**blog.html**: Search + filter (TEDx, Storytelling, Stage Presence). Full-width posts.
**blog-details.html**: Article + sidebar.
**pricing.html**: 2-column plans. **contact.html**: Form with "tell me about your talk idea."
**404.html**: "This talk was cut for time." **coming-soon.html**: Countdown + signup.

---

## AUTH PAGES (`login.html`, `register.html`)

No header/footer. Centered forms. Social login.
Client-side form validation with clear error messages.

---

## DASHBOARD (`dashboard.html`)

This is a **User Dashboard** for coaching clients — NOT an admin panel.

**Sidebar**: Overview, Sessions, Speech Drafts, Rehearsal Log, Calendar, Resources, Settings, Logout. Theme/RTL toggles, Notifications, Profile.

**Tabs** (JS, no reloads):
1. **Overview**: 4 stats (2×2): Weeks Until Talk, Drafts Submitted, Rehearsals Logged, Next Session. Current phase card.
2. **Sessions**: Table (date, type, status). "Join" button for upcoming.
3. **Drafts**: Upload area + history table (filename, version, feedback status).
4. **Rehearsal Log**: Log table + progress bar (8/15 rehearsals). "Add Entry" form.
5. **Calendar**: Month-view grid. Sessions highlighted.
6. **Resources**: Download cards for templates/worksheets.
7. **Settings**: Account settings, notification preferences, privacy options.

Same branding as frontend. Even grids. No 3-column layouts. dashboard.js handles tab switching.

---

## FORM VALIDATION

All forms must include client-side validation with:
- Clear, user-friendly error messages.
- Tooltips to guide users.
- Visual feedback on invalid inputs.

## CRITICAL RULES

❌ No low contrast. ❌ No overlaps. ❌ No horizontal scroll. ❌ No inconsistent buttons. Even grids only (2×1, 2×2, 2×3).

## PERFORMANCE & SEO

- Optimize images (alt text, WebP format where possible).
- Minimal CSS/JS. CSS/JS minified for production.
- SEO meta tags on every page. Unique title tags (60 chars max). Meta descriptions (150–160 chars).
- One H1 per page, proper heading hierarchy.
- Structured data (JSON-LD) for business info.
- PageSpeed 90+ on mobile and desktop.

## CODE QUALITY

- HTML: Semantic markup (`header`, `main`, `section`, `footer`), proper heading hierarchy.
- CSS: CSS variables for theming.
- JavaScript: ES6+, modular structure, no console logs in production.
- Section headers commented in HTML.
- Function descriptions commented in JS.
- CSS organized by sections.

## FINAL CHECKLIST

✔ Readable text. ✔ Working buttons/nav. ✔ Dark mode. ✔ RTL. ✔ Dashboard tabs functional. ✔ All forms validated. ✔ Cross-browser tested (Chrome, Firefox, Safari, Edge). ✔ Accessibility tested (keyboard navigation). ✔ Images optimized with alt text.
