# MFM Orlando — The Citadel of Solution
### Professional Church Website — Next.js 14 + TypeScript

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
mfm-orlando/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout + SEO metadata
│   │   ├── page.tsx            ← Main page (assembles all sections)
│   │   └── globals.css         ← Global styles, CSS variables, keyframes
│   │
│   ├── components/
│   │   ├── Navbar.tsx / .module.css          ← Sticky nav + mobile menu
│   │   ├── HeroSection.tsx / .module.css     ← Full-screen hero + flame
│   │   ├── Marquee.tsx / .module.css         ← Gold scrolling ticker
│   │   ├── WelcomeSection.tsx / .module.css  ← Pastor greeting
│   │   ├── StatsSection.tsx / .module.css    ← Animated count-up stats
│   │   ├── ServicesSection.tsx / .module.css ← Weekly service schedule
│   │   ├── AboutSection.tsx / .module.css    ← History timeline + mission
│   │   ├── MinistriesSection.tsx / .module.css ← 7 ministry cards
│   │   ├── PrayerSection.tsx / .module.css   ← USA Prayer line info
│   │   ├── GivingSection.tsx / .module.css   ← Giving CTA
│   │   ├── ContactSection.tsx / .module.css  ← Contact form + info
│   │   ├── Footer.tsx / .module.css          ← Footer
│   │   ├── CustomCursor.tsx / .module.css    ← Gold cursor (client-only)
│   │   └── ParticlesCanvas.tsx               ← Ember particles (client-only)
│   │
│   ├── data/
│   │   └── siteData.ts         ← ⭐ ALL CHURCH CONTENT LIVES HERE
│   │
│   └── hooks/
│       └── useScrollReveal.ts  ← IntersectionObserver scroll animations
│
├── public/                     ← Static assets (add images here)
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## ✏️ How to Edit Content

**All church content is centralized in one file:**

```
src/data/siteData.ts
```

Edit this file to update:
- Church name, address, phone, email
- Pastor's name and greeting message
- Service schedule (days, times, names)
- Prayer line numbers
- Ministry names and descriptions
- Social media links
- Navigation links
- History timeline
- Stats numbers

---

## 🖼️ Adding Images

### Pastor Photo
Replace the placeholder in `WelcomeSection.tsx`:

```tsx
// Replace the .imgPlaceholder div with:
import Image from 'next/image'

<Image
  src="/images/pastor-samuel.jpg"
  alt="Pastor Samuel Omoigberae"
  fill
  style={{ objectFit: 'cover' }}
/>
```

Then add `pastor-samuel.jpg` to the `/public/images/` folder.

### Logo
Add your logo to `/public/images/mfm-logo.png` and update `Navbar.tsx`.

---

## 🎨 Design System

All CSS variables are defined in `globals.css`:

```css
:root {
  --red:        #B01A1A;   /* Primary red */
  --deep-red:   #7A0000;   /* Dark red */
  --gold:       #D4A017;   /* Primary gold */
  --gold-light: #F0C040;   /* Light gold */
  --dark:       #0A0A0A;   /* Page background */
  --dark2:      #111111;   /* Section background */
  --white:      #FFFFFF;
  --off-white:  #F5EDD8;
}
```

**Typography** — loaded from Google Fonts:
- `Cinzel Decorative` — hero titles
- `Cinzel` — headings, nav, labels
- `Lato` — body text

---

## ✨ Features

| Feature | Implementation |
|---|---|
| Custom gold cursor | `CustomCursor.tsx` (client-only) |
| Floating ember particles | `ParticlesCanvas.tsx` (canvas API) |
| Scroll reveal animations | `useScrollReveal.ts` hook |
| Animated flame | Pure CSS in `HeroSection.module.css` |
| Scrolling marquee | CSS animation in `Marquee.module.css` |
| Count-up numbers | `IntersectionObserver` in `StatsSection.tsx` |
| Mobile hamburger menu | State in `Navbar.tsx` |
| Sticky nav on scroll | `window.scroll` listener in `Navbar.tsx` |
| Contact form | Controlled form in `ContactSection.tsx` |
| SEO metadata | `layout.tsx` with Next.js Metadata API |

---

## 📦 Adding New Pages

```bash
# Example: Add a Gallery page
mkdir src/app/gallery
touch src/app/gallery/page.tsx
```

Then add a link in `src/data/siteData.ts`:
```ts
export const NAV_LINKS = [
  ...
  { label: 'Gallery', href: '/gallery' },
]
```

---

## 🔌 Connecting a Backend (Optional)

To wire up the contact form to a real backend, update `ContactSection.tsx`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  setSubmitted(true)
}
```

Then create `src/app/api/contact/route.ts` as a Next.js API route.

---

## 🌐 Deployment

### Vercel (Recommended — free)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the .next/out folder to Netlify
```

---

## 📞 Church Contact

- **Phone:** +1 (407) 751-8237
- **Email:** mfmorlando1@yahoo.com
- **Address:** 7200 Lake Ellenor Dr, Orlando, FL 32809
- **Pastor:** Samuel Omoigberae

---

*Mountain of Fire and Miracles Ministries — The Citadel of Solution*
*© 2024 MFM Orlando. All Rights Reserved.*
