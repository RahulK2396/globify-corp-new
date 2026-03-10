

## ZenoCrawl Audit Fix Plan

The report scored 82/100 with 30 failed checks. The root cause of most failures is that this is a **Single Page Application** — crawlers that don't execute JavaScript see a bare `index.html` with no meta tags, no canonical, no OG tags, no JSON-LD. React Helmet only works after JS runs.

### Issues & Fixes

**Root Fix: Add fallback SEO meta to `index.html`** (solves 8+ issues at once)
The stripped-down `index.html` currently has zero SEO tags. Add default homepage meta as fallback for non-JS crawlers:
- Default `<meta name="description">` 
- Default canonical `<link rel="canonical">`
- OG tags (og:title, og:description, og:image, og:url, og:type, og:site_name)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Homepage Organization + WebSite JSON-LD schema inline

React Helmet will override these per-page for real users/modern crawlers.

**Issues this solves**: Canonical Tag (HIGH), JSON-LD Schema Present (HIGH), Meta Description (MEDIUM), Open Graph Tags (MEDIUM), Open Graph Completeness (MEDIUM), Organization/Website Schema (MEDIUM), Twitter Card tags (LOW), BreadcrumbList/FAQPage schema (LOW), Content-Type Schema (MEDIUM), Entity & Authority signals (MEDIUM).

---

**Fix: Email Address Protection (MEDIUM, $18/mo impact)**
Replace all plain `mailto:sales@globify.in` links in Footer.tsx, PrivacyPolicy.tsx, and TermsOfService.tsx with obfuscated versions. Use a JavaScript-based `onClick` handler that constructs the mailto dynamically, preventing scraper bots from harvesting the address.

---

**Fix: Image Dimensions Specified (MEDIUM, $5/mo impact)**
Add `width` and `height` attributes to key `<img>` tags across components (Navbar logo, Footer logo, case study images, industry images, mega menu images, etc.) to prevent CLS. Update `LazyImage.tsx` to pass through width/height props.

---

**Fix: Duplicate Page Titles (HIGH)**
Audit all pages for duplicate `<title>` tags. The likely cause is pages that share generic titles. Check all SEOHead usages and ensure unique titles. The `index.html` fallback title "Globify" will be overridden by Helmet on every page.

---

**Fix: favicon.ico reference (LOW)**
Add `<link rel="icon" href="/favicon.ico">` to index.html and copy the existing favicon.png as favicon.ico, or add a standard .ico reference.

---

**Fix: HTML Document Size (MEDIUM)**
This is inherent to the SPA bundle. Not much actionable beyond current lazy-loading, which is already implemented.

---

**Fix: Orphan Pages (MEDIUM)**
Ensure all pages are linked from at least one other page. Cross-reference the sitemap URLs against internal links. Most likely the newer platform blog posts and some case studies need links from the sitemap page or blog index.

---

### Files to Edit
1. `index.html` — Add fallback meta, OG, Twitter, JSON-LD, favicon.ico
2. `src/components/Footer.tsx` — Obfuscate email
3. `src/pages/PrivacyPolicy.tsx` — Obfuscate email  
4. `src/pages/TermsOfService.tsx` — Obfuscate email
5. `src/components/SEOHead.tsx` — Remove email from Organization schema plaintext
6. `src/components/LazyImage.tsx` — Support width/height passthrough
7. `src/components/Navbar.tsx` — Add image dimensions
8. Various component files — Add width/height to `<img>` tags
9. Audit all SEOHead title props for duplicates

