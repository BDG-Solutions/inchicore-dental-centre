# Inchicore Dental Centre — website redesign concept

A redesign proposal for [inchicoredentalcentre.com](https://inchicoredentalcentre.com), built with the practice's existing content and price list, plus the opening hours from its Google listing.

> This is a design concept, not the official website. It is excluded from search engines (`noindex` + `robots.txt`).

## What's improved

- **Phone links that dial** — the current site links the number as `callto:/14547207`, without the 01. Here every number is a `tel:+35314547207` link, and there's a sticky Call / Book / Directions bar on phones.
- **Opening hours on the site** — the current site has none. Here they're on every page, with today highlighted and a live "Open / Closed" status (Irish time).
- **Social proof** — the 4.8★ Google rating (71 reviews) is next to the main call to action and links to the Google listing.
- **Six clear pages** — Home, About Us, Our Team, Services, Price List and Contact Us, instead of three.
- **Services linked to prices** — each service has a short description and a guide price, and opens the price list filtered to its category.
- **Searchable price list** with category filters, plus PRSI, medical card and emergency notes.
- **Appointment request form** — prepares an email to the practice (name, phone, reason, preferred time), with a copy option. No server needed.
- **Getting here** — map, copy-address button, directions, and both parking options.
- **No stock photos** — the current site uses 2013 stock images; this one uses icons and leaves a marked space for real photos.
- **Its own look** — a "village practice" design: warm paper, near-black green and lime, a bold grotesque for headings, services as numbered rows, a menu-style price list and a weekly opening-hours chart.
- **Dental care at a glance** — a tooth illustration and dental-care label in the hero, plus treatment icons in the service rows.
- **Dentist preference carried through** — team links select the preferred dentist in the request form; the choice is included in both the email draft and copied request. Reception confirms availability.
- **Current open/closed status** — refreshes every 30 seconds and on tab return without resetting the appointment form. The weekly schedule itself is unchanged.
- **Accessible** — semantic HTML, skip link, keyboard-friendly menu (focus trap, Esc to close), visible focus, reduced-motion support.

## Stack

Plain HTML, CSS and JavaScript (ES modules). No build step, no dependencies.

```
index.html        page shell
css/styles.css    design system and layout
js/data.js        all content: services, prices, hours, team, contact details
js/app.js         router (#/, #/about, #/team, #/services, #/prices, #/contact), pages and interactions
js/icons.js       inline SVG icons and logo mark
assets/           favicon
```

To change a price, an opening time or any text, edit `js/data.js` — every page reads from it.

## Run locally

```bash
npx http-server . -p 5173
```

Then open http://127.0.0.1:5173. (ES modules don't load from `file://`, so use a local server.)

## Deploy

Any static host works (Hostinger, GitHub Pages, Netlify): upload the files as they are. Routing uses `#/` URLs, so no server rewrite rules are needed.

Before going live as the official site, remove the `noindex` meta tag from `index.html`, replace `robots.txt`, and remove the "design concept" note in the footer (`js/app.js`).

## Content to confirm with the practice

- Opening hours and the Eircode come from the Google listing, not the current site.
- Prices come from the current online price list (no date shown) and should be confirmed.
- Service descriptions explain each treatment in general terms; the practice's own wording should replace them.
- The dentists' profiles are a placeholder line each: qualifications beyond B.D.S., background and photos are needed.
- The practice has no logo; the tooth mark is a placeholder.
- Real photos of the practice should fill the marked photo space on About Us.
