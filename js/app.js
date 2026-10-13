import {
  clinic, hours, nav, highlights, team, aboutPillars, services, feeGroups, savings, feeNote, faqs,
} from './data.js';
import { icon, logoMark } from './icons.js';

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const callBtn = (cls = 'btn--primary', label = `Call ${clinic.phone}`) =>
  `<a class="btn ${cls}" href="${clinic.phoneHref}">${icon('phone')}<span>${label}</span></a>`;
const emailBtn = (cls = 'btn--ghost', label = 'Email the practice') =>
  `<a class="btn ${cls}" href="mailto:${clinic.email}?subject=Appointment%20request">${icon('mail')}<span>${label}</span></a>`;
const bookLink = (cls = 'btn--primary', label = 'Request an appointment') =>
  `<a class="btn ${cls}" href="#/contact" data-scroll="appointment">${icon('calendar')}<span>${label}</span></a>`;

const stars = () => `<span class="stars" aria-hidden="true">★★★★★</span>`;
const ratingLine = () =>
  `<a class="rating" href="${clinic.mapsUrl}" target="_blank" rel="noopener" aria-label="View the practice on Google Maps: ${clinic.rating.score} out of 5 from ${clinic.rating.count} reviews">${stars()}<span><strong>${clinic.rating.score}</strong> from ${clinic.rating.count} ${clinic.rating.source} reviews</span>${icon('arrowRight')}</a>`;

const sectionHead = ({ eyebrow, title, lead, center }) => `
  <header class="section-head${center ? ' section-head--center' : ''}" data-reveal>
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h2 class="h2">${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </header>`;

const pageHero = ({ crumb, eyebrow, title, lead, actions = '' }) => `
  <section class="page-hero">
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a>${icon('chevronRight')}<span aria-current="page">${crumb}</span></nav>
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1 class="h1">${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${actions ? `<div class="btn-row">${actions}</div>` : ''}
    </div>
  </section>`;

const accordion = (items, name = 'faq') => `
  <div class="accordion">
    ${items.map((it) => `
      <details class="accordion__item" name="${name}">
        <summary><span>${it.q}</span><span class="accordion__icon" aria-hidden="true"></span></summary>
        <div class="accordion__body"><p>${it.a}</p></div>
      </details>`).join('')}
  </div>`;

/* ---------- opening hours ---------- */
function dublinNow() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Dublin' }));
  return { day: now.getDay(), mins: now.getHours() * 60 + now.getMinutes() };
}

function openStatus() {
  const { day, mins } = dublinNow();
  const today = hours.find((h) => h.day === day);
  if (today?.open != null && mins >= today.open && mins < today.close) {
    return { open: true, text: `Open now · until ${today.text.split('–')[1].trim()}` };
  }
  // Next opening time.
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const h = hours.find((x) => x.day === d);
    if (h?.open == null) continue;
    if (i === 0 && mins >= h.open) continue;
    const start = h.text.split('–')[0].trim();
    const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : h.label;
    return { open: false, text: `Closed · opens ${when} at ${start}` };
  }
  return { open: false, text: 'Closed' };
}

const hoursList = () => {
  const { day } = dublinNow();
  return `
  <ul class="hours">
    ${hours.map((h) => `
      <li class="${h.day === day ? 'is-today' : ''}"><span>${h.label}${h.day === day ? ' <em>Today</em>' : ''}</span><span>${h.text}</span></li>`).join('')}
  </ul>`;
};

/* ---------- shared blocks ---------- */
function visitBlock() {
  return `
  <section class="section section--alt" id="visit">
    <div class="container split">
      <div data-reveal>
        <p class="eyebrow">Visit us</p>
        <h2 class="h2">In Inchicore village.</h2>
        <ul class="contact-list">
          <li>${icon('mapPin')}<div>${clinic.addressLines.join('<br>')}<button type="button" class="link-btn" data-copy="${esc(clinic.addressText)}">${icon('copy')}Copy address</button></div></li>
          <li>${icon('phone')}<div><a href="${clinic.phoneHref}">${clinic.phone}</a></div></li>
          <li>${icon('mail')}<div><a href="mailto:${clinic.email}">${clinic.email}</a></div></li>
          <li>${icon('home')}<div>Just a few doors down from Tesco Express in Inchicore village.</div></li>
          <li>${icon('car')}<div>Parking outside the practice, and free parking in Tyrconnell Park, across the road at the traffic lights.</div></li>
        </ul>
        <div class="btn-row">
          <a class="btn btn--primary" href="${clinic.directionsUrl}" target="_blank" rel="noopener">${icon('navigation')}<span>Get directions</span></a>
          ${callBtn('btn--ghost')}
        </div>
      </div>
      <div class="map" data-reveal>
        <iframe title="Map showing ${clinic.name}" loading="lazy" src="${clinic.mapEmbed}" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>`;
}

function ctaBand(title = 'Ready to book?', text = 'Call us and we’ll give you an appointment as quickly as possible, including emergency appointments.') {
  return `
  <section class="section section--tight">
    <div class="container">
      <div class="band" data-reveal>
        <div>
          <h2 class="h2">${title}</h2>
          <p>${text}</p>
        </div>
        <div class="btn-row">${callBtn('btn--primary')}${emailBtn('btn--light', 'Email us')}</div>
      </div>
    </div>
  </section>`;
}

/* ---------- pages ---------- */
function renderHome() {
  const status = openStatus();
  return `
  <section class="hero">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="eyebrow">Your family dentist · Dublin 8</p>
        <h1 class="display">Modern dental care.<br><span>Right here in Inchicore.</span></h1>
        <p class="lead">A family-friendly practice in Inchicore village, combining the latest digital equipment with a personal, caring service. We welcome private, PRSI and medical card patients.</p>
        <div class="btn-row">${callBtn()}${bookLink('btn--ghost')}</div>
        <p class="hero__availability">${icon('alert')}Emergency appointments available</p>
        ${ratingLine()}
      </div>
      <aside class="hero__practice" aria-label="The practice and opening hours">
        <div class="hero-proof">
          <a class="hero-proof__rating" href="${clinic.mapsUrl}" target="_blank" rel="noopener">
            <b>${clinic.rating.score}</b>
            <span>${stars()}<span>${clinic.rating.count} Google reviews</span></span>
          </a>
          <div class="hero-proof__team">
            ${team.map((m) => `<span class="mini-person"><span class="mini-person__avatar" aria-hidden="true">${m.initials}</span><span><strong>${m.name}</strong><small>${m.quals}</small></span></span>`).join('')}
          </div>
        </div>
        <div class="hero-hours">
          <p class="status ${status.open ? 'is-open' : ''}"><span class="dot"></span>${status.text}</p>
          <h2 class="h3">Open Monday to Friday.</h2>
          <div class="hero-hours__summary"><span>Monday – Thursday<strong>from 8.30am</strong></span><span>Friday<strong>8.30am – 1pm</strong></span></div>
          <details class="hero-hours__details"><summary>See all opening hours ${icon('chevronRight')}</summary>${hoursList()}</details>
        </div>
      </aside>
    </div>
  </section>

  <section class="section section--flush">
    <div class="container">
      <ul class="highlights">
        ${highlights.map((h) => `<li data-reveal>${icon(h.icon)}<div><strong>${h.title}</strong><span>${h.text}</span></div></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container split split--center split--wide">
      <div class="stats" data-reveal aria-label="The practice in numbers">
        <div><b>Free</b><span>Parking in Tyrconnell Park, across the road</span></div>
        <div><b>€15</b><span>Exam, scale and polish once a year for PRSI patients</span></div>
        <div><b>8.30am</b><span>Opening time, Monday to Friday</span></div>
      </div>
      <div data-reveal>
        <p class="eyebrow">About the practice</p>
        <h2 class="h2">Caring dentists, a few doors from Tesco Express.</h2>
        <p>Dr Bernice Barry and Dr Keith McCourt offer high-quality, affordable dental care in a state-of-the-art surgery. Our flexible service covers regular check-ups and emergency appointments, and we make sure even the most nervous patients feel at ease.</p>
        <a class="text-link" href="#/about">About the practice ${icon('arrowRight')}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: 'Services', title: 'A full range of dental services.', lead: 'From check-ups and fillings to crowns and dentures, with every price on our price list.' })}
      <div class="cards cards--4">
        ${services.slice(0, 8).map((t) => `
          <a class="card" href="#/services/${t.id}" data-reveal>
            <span class="card__icon">${icon(t.icon)}</span>
            <h3 class="h4">${t.title}</h3>
            <p>${t.short}</p>
            <span class="card__more">Learn more ${icon('arrowRight')}</span>
          </a>`).join('')}
      </div>
      <p class="center"><a class="btn btn--ghost" href="#/services">See all services ${icon('arrowRight')}</a></p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container split split--center">
      <div data-reveal>
        <p class="eyebrow">Price list</p>
        <h2 class="h2">Very affordable prices.</h2>
        <p>Our full price list is online, so you know what to expect before you come in. PRSI qualified patients get an exam, scale and polish for €15 once a year.</p>
        <a class="btn btn--primary" href="#/prices">View the price list ${icon('arrowRight')}</a>
      </div>
      <div class="price-peek" data-reveal>
        ${[['Exam, scale & polish (PRSI)', '€15'], ['Examination and X-rays', '€60'], ['Exam, scale & polish', '€70'], ['Fillings', '€100 – €160']]
          .map(([n, p]) => `<div class="fee-row"><span>${n}</span><span>${p}</span></div>`).join('')}
      </div>
    </div>
  </section>

  ${visitBlock()}
  ${ctaBand()}`;
}

function renderAbout() {
  return `
  ${pageHero({
    crumb: 'About Us', eyebrow: 'About us',
    title: 'A family-friendly practice in Inchicore.',
    lead: 'In our state-of-the-art dental surgery, just a few doors down from Tesco Express in Inchicore village, we combine the latest digital equipment with a personal, caring service.',
    actions: callBtn() + bookLink('btn--ghost'),
  })}
  <section class="section section--flush">
    <div class="container">
      <div class="pillars">
        ${aboutPillars.map((p) => `<article class="pillar" data-reveal><span class="card__icon">${icon(p.icon)}</span><h3 class="h4">${p.title}</h3><p>${p.text}</p></article>`).join('')}
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container split split--center">
      <div data-reveal>
        <p class="eyebrow">Our approach</p>
        <h2 class="h2">Modern care, at a price that’s fair.</h2>
        <p>We offer a full range of dental services at very affordable prices, and we welcome all private, PRSI and medical card patients.</p>
        <p>We make sure even the most nervous patients feel at ease during their visit, and our flexible service means we can see you for emergency appointments as well as regular check-ups.</p>
        <a class="text-link" href="#/team">Meet the dentists ${icon('arrowRight')}</a>
      </div>
      <div class="photo-slot" data-reveal role="img" aria-label="Space for a photo of the practice">${icon('home')}<span>Photo of the practice</span></div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container split split--center">
      <ul class="credentials" data-reveal>
        <li>${icon('users')}<div><strong>Private, PRSI and medical card</strong><span>All patients welcome</span></div></li>
        <li>${icon('badge')}<div><strong>€15 PRSI check-up</strong><span>Exam, scale and polish once a year, if PRSI qualified</span></div></li>
        <li>${icon('car')}<div><strong>Easy parking</strong><span>Outside the practice, and free in Tyrconnell Park</span></div></li>
      </ul>
      <div data-reveal>
        <p class="eyebrow">Good to know</p>
        <h2 class="h2">Everyone is welcome.</h2>
        <p>Whether you need a check-up, a filling or an emergency appointment, call us on ${clinic.phone} and we’ll find you a time.</p>
        <a class="text-link" href="#/prices">See our prices ${icon('arrowRight')}</a>
      </div>
    </div>
  </section>
  ${ctaBand('We look forward to meeting you.', `Call us on ${clinic.phone} to book your appointment.`)}`;
}

function renderTeam() {
  return `
  ${pageHero({
    crumb: 'Our Team', eyebrow: 'Our team',
    title: 'Meet your dentists.',
    lead: 'Our highly trained and friendly dentists offer a full range of dental services for the whole family.',
    actions: callBtn() + bookLink('btn--ghost'),
  })}
  <section class="section section--flush">
    <div class="container">
      <div class="team">
        ${team.map((m) => `
          <article class="person" data-reveal>
            <div class="person__avatar" aria-hidden="true">${m.initials}</div>
            <div>
              <h2 class="h3">${m.name}</h2>
              <p class="person__role">${m.role}</p>
              <p class="person__quals">${m.quals}</p>
              <p>${m.bio}</p>
            </div>
          </article>`).join('')}
      </div>
    </div>
  </section>
  ${ctaBand('Nervous about your visit?', 'Let us know when you book. We make sure even the most nervous patients feel at ease.')}`;
}

function renderServices(sub) {
  return `
  ${pageHero({
    crumb: 'Services', eyebrow: 'Our services',
    title: 'A full range of dental services.',
    lead: 'From regular check-ups to emergency appointments, for adults and children.',
  })}
  <section class="section section--flush">
    <div class="container">
      <nav class="chip-nav" aria-label="Jump to a service">
        ${services.map((t) => `<a class="chip" href="#/services/${t.id}">${t.title}</a>`).join('')}
      </nav>
    </div>
  </section>
  <section class="section">
    <div class="container treatment-list">
      ${services.map((t) => `
        <article class="treatment${sub === t.id ? ' is-target' : ''}" id="t-${t.id}" data-reveal>
          <span class="card__icon card__icon--lg">${icon(t.icon)}</span>
          <div class="treatment__body">
            <h2 class="h3">${t.title}</h2>
            ${t.body.map((p) => `<p>${p}</p>`).join('')}
          </div>
          <aside class="treatment__fee"><span class="muted">Guide price</span><strong>${t.fee}</strong><a class="text-link" href="#/prices/${t.group}">See prices ${icon('arrowRight')}</a></aside>
        </article>`).join('')}
    </div>
  </section>
  ${ctaBand('Not sure what you need?', 'Book an examination and your dentist will talk you through your options and costs.')}`;
}

function renderPrices(sub) {
  return `
  ${pageHero({
    crumb: 'Price List', eyebrow: 'Price list',
    title: 'Clear prices, no surprises.',
    lead: 'A full price list for our dental services, so you know what to expect before your visit.',
  })}
  <section class="section section--flush">
    <div class="container">
      <div class="savings savings--3">
        ${savings.map((s) => `<article data-reveal>${icon('badge')}<div><strong>${s.title}</strong><p>${s.text}</p></div></article>`).join('')}
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="fee-tools">
        <label class="search">
          ${icon('search')}
          <span class="sr-only">Search prices</span>
          <input type="search" id="fee-search" placeholder="Search a treatment, e.g. filling" autocomplete="off">
        </label>
        <div class="chip-nav chip-nav--filters" role="group" aria-label="Filter by category">
          <button type="button" class="chip${sub ? '' : ' is-active'}" data-filter="all" aria-pressed="${!sub}">All</button>
          ${feeGroups.map((g) => `<button type="button" class="chip${sub === g.id ? ' is-active' : ''}" data-filter="${g.id}" aria-pressed="${sub === g.id}">${g.title}</button>`).join('')}
        </div>
      </div>
      <div class="fee-groups" id="fee-groups">
        ${feeGroups.map((g) => `
          <section class="fee-card" data-group="${g.id}">
            <h2 class="h4">${icon(g.icon)}${g.title}</h2>
            ${g.items.map(([n, p]) => `<div class="fee-row" data-name="${esc(`${g.title} ${n}`.toLowerCase())}"><span>${n}</span><span>${p}</span></div>`).join('')}
          </section>`).join('')}
      </div>
      <p class="empty" id="fee-empty" hidden>No treatment matches your search. Call us on <a href="${clinic.phoneHref}">${clinic.phone}</a> and we’ll be happy to help.</p>
      <aside class="notice">${icon('info')}<p>${feeNote}</p></aside>
    </div>
  </section>
  ${ctaBand('Questions about a treatment or its cost?', `Call us on ${clinic.phone} and we’ll talk you through it.`)}`;
}

function renderContact() {
  const status = openStatus();
  return `
  ${pageHero({
    crumb: 'Contact Us', eyebrow: 'Contact us',
    title: 'Let’s find a time that suits you.',
    lead: 'Call us or send an email to book. We offer emergency appointments, and we’ll work to give you an appointment as quickly as possible.',
    actions: callBtn() + emailBtn('btn--ghost'),
  })}
  <section class="section section--flush">
    <div class="container contact-grid">
      <a class="contact-card" href="${clinic.phoneHref}">${icon('phone')}<span class="muted">Call the practice</span><strong>${clinic.phone}</strong><span class="small muted">Emergency appointments available</span></a>
      <a class="contact-card" href="mailto:${clinic.email}">${icon('mail')}<span class="muted">Email</span><strong>${clinic.email}</strong></a>
      <a class="contact-card" href="${clinic.directionsUrl}" target="_blank" rel="noopener">${icon('mapPin')}<span class="muted">Address</span><strong>${clinic.addressLines[0]}</strong><span class="small muted">${clinic.addressLines.slice(1).join(', ')}</span></a>
    </div>
  </section>
  <section class="section" id="appointment">
    <div class="container split">
      <div data-reveal>
        <p class="eyebrow">Appointment request</p>
        <h2 class="h2">Prepare your appointment email.</h2>
        <p class="muted">Add your details, then open the draft in your email app and send it to the practice. For anything urgent, please call.</p>
        <ol class="request-steps" aria-label="How an appointment request works"><li><span>1</span>Add your details</li><li><span>2</span>Send your email</li><li><span>3</span>Practice confirms</li></ol>
        <form class="form" id="appt-form" novalidate>
          <div class="form__row">
            <label>Name<input name="name" required autocomplete="name"></label>
            <label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>
          </div>
          <label>Email<input name="email" type="email" autocomplete="email"></label>
          <div class="form__row">
            <label>Reason for visit
              <select name="reason">
                <option>Check-up</option>
                ${services.slice(1).map((t) => `<option>${t.title}</option>`).join('')}
                <option>Something else</option>
              </select>
            </label>
            <label>Preferred time
              <select name="time">
                <option>Any time</option><option>Morning</option><option>Afternoon</option>
              </select>
            </label>
          </div>
          <label class="check"><input type="checkbox" name="new"> I’m a new patient</label>
          <label>Message (optional)<textarea name="message" rows="4"></textarea></label>
          <p class="form__error" id="form-error" role="alert" hidden>Please add your name and a phone number so we can call you back.</p>
          <div class="form__actions"><button class="btn btn--primary" type="submit">${icon('mail')}<span>Open email draft</span></button><button class="link-btn" type="button" id="copy-request">${icon('copy')}Copy request</button></div>
          <p class="small muted">You’ll need to send the email yourself. Your preferred time is a request; the practice will confirm availability.</p>
          <p class="form__feedback" id="request-feedback" role="status" hidden></p>
        </form>
      </div>
      <aside class="hours-card" data-reveal aria-label="Opening hours">
        <p class="status ${status.open ? 'is-open' : ''}"><span class="dot"></span>${status.text}</p>
        <h2 class="h3">Opening hours</h2>
        ${hoursList()}
      </aside>
    </div>
  </section>
  ${visitBlock()}
  <section class="section">
    <div class="container narrow">
      ${sectionHead({ eyebrow: 'FAQ', title: 'Good to know', center: true })}
      ${accordion(faqs)}
    </div>
  </section>`;
}

function renderNotFound() {
  return pageHero({
    crumb: 'Page not found', title: 'Sorry, we couldn’t find that page.',
    lead: 'It may have moved. Try one of the links above, or call us and we’ll help.',
    actions: `<a class="btn btn--primary" href="#/">Back to home</a>${callBtn('btn--ghost')}`,
  });
}

const routes = {
  '': { title: 'Family Dentist in Inchicore, Dublin 8', render: renderHome },
  about: { title: 'About Us', render: renderAbout },
  team: { title: 'Our Team', render: renderTeam },
  services: { title: 'Services', render: renderServices },
  prices: { title: 'Price List', render: renderPrices },
  contact: { title: 'Contact Us', render: renderContact },
};

/* ---------- layout ---------- */
function renderHeader(path) {
  const status = openStatus();
  $('#topbar').innerHTML = `
    <div class="container topbar__inner">
      <span class="status ${status.open ? 'is-open' : ''}"><span class="dot"></span>${status.text}</span>
      <span><span class="hide-sm">${clinic.addressLines[0]}, Dublin 8 · </span><a href="${clinic.phoneHref}">${clinic.phone}</a></span>
    </div>`;
  $('#site-header').innerHTML = `
    <div class="container header__inner">
      <a class="logo" href="#/" aria-label="${clinic.name}, home">${logoMark}<span class="logo__text">${clinic.name}<small>${clinic.tagline}</small></span></a>
      <nav class="nav" id="nav" aria-label="Main">
        ${nav.map((n) => `<a href="#/${n.path}" ${n.path === path ? 'aria-current="page"' : ''}>${n.label}</a>`).join('')}
        ${bookLink('btn--primary nav__cta', 'Request a visit')}
      </nav>
      <button type="button" class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Open menu">${icon('menu')}<span>Menu</span></button>
    </div>`;
  $('#menu-btn').addEventListener('click', () => toggleMenu());
}

function toggleMenu(force) {
  const btn = $('#menu-btn');
  const open = force ?? btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  btn.innerHTML = `${icon(open ? 'x' : 'menu')}<span>${open ? 'Close' : 'Menu'}</span>`;
  $('#nav').classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  ['#main', '#site-footer', '#action-bar', '#topbar'].forEach((selector) => {
    $(selector).inert = open;
  });
  if (open) $('#nav a').focus();
}

function renderFooter() {
  $('#site-footer').innerHTML = `
    <div class="container footer__grid">
      <div>
        <a class="logo logo--light" href="#/">${logoMark}<span class="logo__text">${clinic.name}<small>${clinic.tagline}</small></span></a>
        <p class="footer__muted">${clinic.addressText}</p>
      </div>
      <div>
        <h2 class="footer__title">Pages</h2>
        <ul>${nav.map((n) => `<li><a href="#/${n.path}">${n.label}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="footer__title">Opening hours</h2>
        <ul class="footer__hours">
          <li>Mon &amp; Thu<span>8.30am – 5.30pm</span></li>
          <li>Tue &amp; Wed<span>8.30am – 5pm</span></li>
          <li>Friday<span>8.30am – 1pm</span></li>
          <li>Sat &amp; Sun<span>Closed</span></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__title">Contact</h2>
        <ul>
          <li><a href="${clinic.phoneHref}">${clinic.phone}</a></li>
          <li><a href="mailto:${clinic.email}">${clinic.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer__base">
      <span>© ${new Date().getFullYear()} ${clinic.name}</span>
      <span>Design concept for discussion. Not the official website: visit <a href="${clinic.officialSite}">${clinic.officialSite.replace('https://', '')}</a>.</span>
    </div>`;
  $('#action-bar').innerHTML = `
    <a href="${clinic.phoneHref}">${icon('phone')}<span>Call</span></a>
    <a href="#/contact" data-scroll="appointment">${icon('calendar')}<span>Book</span></a>
    <a href="${clinic.directionsUrl}" target="_blank" rel="noopener">${icon('navigation')}<span>Directions</span></a>`;
}

/* ---------- interactions ---------- */
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-visible');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('is-visible'), 2400);
}

function bindPage() {
  // Copy address
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); toast('Address copied'); } catch { toast(b.dataset.copy); }
  }));

  // Fee search & filters
  const search = $('#fee-search');
  if (search) {
    let filter = $('[data-filter].is-active')?.dataset.filter || 'all';
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      $$('.fee-card').forEach((card) => {
        const inGroup = filter === 'all' || card.dataset.group === filter;
        let rows = 0;
        $$('.fee-row', card).forEach((r) => {
          const hit = inGroup && (!q || r.dataset.name.includes(q));
          r.hidden = !hit;
          rows += hit ? 1 : 0;
        });
        card.hidden = rows === 0;
        shown += rows;
      });
      $('#fee-empty').hidden = shown > 0;
    };
    search.addEventListener('input', apply);
    apply();
    $$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      filter = b.dataset.filter;
      $$('[data-filter]').forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      apply();
    }));
  }

  // Appointment request → opens the patient's email app with a ready-to-send message.
  const form = $('#appt-form');
  if (form) {
    const prepareRequest = () => {
      const f = new FormData(form);
      const name = (f.get('name') || '').trim();
      const phone = (f.get('phone') || '').trim();
      $('#form-error').hidden = Boolean(name && phone);
      if (!name || !phone) {
        form.elements.namedItem(name ? 'phone' : 'name').focus();
        return null;
      }
      if (!form.reportValidity()) return null;
      const body = [
        `Name: ${name}`, `Phone: ${phone}`, `Email: ${f.get('email') || '-'}`,
        `Reason: ${f.get('reason')}`, `Preferred time: ${f.get('time')}`,
        `New patient: ${f.get('new') ? 'Yes' : 'No'}`, '', f.get('message') || '',
      ].join('\n');
      return { body, subject: `Appointment request: ${name}` };
    };
    const feedback = (message) => {
      $('#request-feedback').textContent = message;
      $('#request-feedback').hidden = false;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const request = prepareRequest();
      if (!request) return;
      feedback('Opening your email app. Send the draft there to request your appointment. If no app opens, use Copy request and paste it into an email.');
      window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(request.body)}`;
    });
    $('#copy-request').addEventListener('click', async () => {
      const request = prepareRequest();
      if (!request) return;
      try {
        await navigator.clipboard.writeText(`To: ${clinic.email}\nSubject: ${request.subject}\n\n${request.body}`);
        feedback(`Request copied. Paste it into an email to ${clinic.email} and send it to the practice.`);
      } catch {
        feedback('Copy is unavailable in this browser. Use Open email draft or call reception.');
      }
    });
  }
}

function reveal() {
  const els = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-visible')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
}

/* ---------- router ---------- */
let pendingScroll = null;
document.addEventListener('click', (e) => {
  if (e.target.closest('.skip-link')) {
    e.preventDefault();
    $('#main').focus();
    $('#main').scrollIntoView({ block: 'start' });
    return;
  }
  const a = e.target.closest('[data-scroll]');
  if (a) {
    // Already on that page: no hashchange will fire, so scroll straight to the section.
    if (a.getAttribute('href') === location.hash) {
      e.preventDefault();
      $(`#${a.dataset.scroll}`)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    } else {
      pendingScroll = a.dataset.scroll;
    }
  }
  if (e.target.closest('#nav a')) toggleMenu(false);
});

function route() {
  const [path = '', sub] = location.hash.replace(/^#\/?/, '').split('/');
  const r = routes[path];
  const main = $('#main');
  main.innerHTML = r ? r.render(sub) : renderNotFound();
  document.title = `${r ? r.title : 'Page not found'} | ${clinic.name}`;
  renderHeader(path);
  toggleMenu(false);
  bindPage();
  reveal();

  const target = sub ? $(`#t-${sub}`) : pendingScroll ? $(`#${pendingScroll}`) : null;
  pendingScroll = null;
  if (target) {
    requestAnimationFrame(() => target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }));
  } else {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
}

renderFooter();
window.addEventListener('hashchange', route);
window.addEventListener('keydown', (e) => {
  if (!document.body.classList.contains('menu-open')) return;
  if (e.key === 'Escape') { toggleMenu(false); $('#menu-btn').focus(); }
  if (e.key === 'Tab') {
    const controls = $$('.site-header a, .site-header button');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && document.body.classList.contains('menu-open')) toggleMenu(false);
});
route();
