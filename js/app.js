import {
  clinic, hours, nav, highlights, team, aboutPillars, services, feeGroups, savings, feeNote, faqs,
} from './data.js';
import { icon, logoMark } from './icons.js';

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = (n) => String(n).padStart(2, '0');

const callBtn = (cls = 'btn--dark', label = `Call ${clinic.phone}`) =>
  `<a class="btn ${cls}" href="${clinic.phoneHref}">${icon('phone')}<span>${label}</span></a>`;
const emailBtn = (cls = 'btn--line', label = 'Email the practice') =>
  `<a class="btn ${cls}" href="mailto:${clinic.email}?subject=Appointment%20request">${icon('mail')}<span>${label}</span></a>`;
const bookLink = (cls = 'btn--lime', label = 'Request an appointment') =>
  `<a class="btn ${cls}" href="#/contact" data-scroll="appointment">${icon('calendar')}<span>${label}</span></a>`;

const stars = () => `<span class="stars" aria-hidden="true">★★★★★</span>`;

// Section label: "01 / Services"
const label = (n, text) => `<p class="label"><span>${pad(n)}</span>${text}</p>`;

const pageHead = ({ crumb, n, title, lead, actions = '' }) => `
  <section class="page-head">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
      ${label(n, crumb)}
      <h1 class="title-xl">${title}</h1>
      ${lead ? `<p class="intro">${lead}</p>` : ''}
      ${actions ? `<div class="actions">${actions}</div>` : ''}
    </div>
  </section>`;

const accordion = (items, name = 'faq') => `
  <div class="faq">
    ${items.map((it, i) => `
      <details class="faq__item" name="${name}">
        <summary><span class="faq__n">${pad(i + 1)}</span><span>${it.q}</span><span class="faq__icon" aria-hidden="true"></span></summary>
        <div class="faq__body"><p>${it.a}</p></div>
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

const statusPill = (s = openStatus()) => `<span class="pill ${s.open ? 'is-open' : ''}"><span class="dot"></span>${s.text}</span>`;

// Week timetable: one row per day with a bar showing the opening window (8am–6pm scale).
const timetable = () => {
  const { day } = dublinNow();
  const from = 480, to = 1080;
  return `
  <ul class="week">
    ${[1, 2, 3, 4, 5, 6, 0].map((d) => {
      const h = hours.find((x) => x.day === d);
      const bar = h.open == null ? '' : `<span class="week__bar" style="left:${((h.open - from) / (to - from)) * 100}%;width:${((h.close - h.open) / (to - from)) * 100}%"></span>`;
      return `<li class="${d === day ? 'is-today' : ''}"><span class="week__day">${h.label.slice(0, 3)}</span><span class="week__track" aria-hidden="true">${bar}</span><span class="week__time">${h.text}</span></li>`;
    }).join('')}
  </ul>`;
};

/* ---------- shared blocks ---------- */
function visitBlock(n) {
  return `
  <section class="block block--paper" id="visit">
    <div class="wrap visit">
      <div data-reveal>
        ${label(n, 'Find us')}
        <h2 class="title-lg">In Inchicore village, a few doors from Tesco Express.</h2>
        <dl class="facts">
          <div><dt>${icon('mapPin')}Address</dt><dd>${clinic.addressText}<button type="button" class="link" data-copy="${esc(clinic.addressText)}">${icon('copy')}Copy</button></dd></div>
          <div><dt>${icon('car')}Parking</dt><dd>Outside the practice, and free in Tyrconnell Park, across the road at the traffic lights.</dd></div>
          <div><dt>${icon('phone')}Phone</dt><dd><a href="${clinic.phoneHref}">${clinic.phone}</a></dd></div>
          <div><dt>${icon('mail')}Email</dt><dd><a href="mailto:${clinic.email}">${clinic.email}</a></dd></div>
        </dl>
        <div class="actions">
          <a class="btn btn--dark" href="${clinic.directionsUrl}" target="_blank" rel="noopener">${icon('navigation')}<span>Get directions</span></a>
          ${callBtn('btn--line')}
        </div>
      </div>
      <div class="map" data-reveal>
        <iframe title="Map showing ${clinic.name}" loading="lazy" src="${clinic.mapEmbed}" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>`;
}

function callout(title = 'Toothache? Call us today.', text = 'We keep emergency appointments, and we’ll see you as quickly as we can.') {
  return `
  <section class="callout">
    <div class="wrap callout__inner" data-reveal>
      <div>
        <h2 class="title-lg">${title}</h2>
        <p>${text}</p>
      </div>
      <div class="actions">${callBtn('btn--lime btn--big')}${emailBtn('btn--ghost-light', 'Email us')}</div>
    </div>
  </section>`;
}

/* ---------- pages ---------- */
function renderHome() {
  const s = openStatus();
  const { day } = dublinNow();
  const today = hours.find((h) => h.day === day);
  return `
  <section class="hero">
    <div class="wrap hero__grid">
      <div class="hero__copy">
        ${statusPill(s)}
        <h1 class="title-hero">Your dentist in <mark>Inchicore</mark>.</h1>
        <p class="hero__lead">A family-friendly practice on Tyrconnell Road, with modern digital equipment and a personal, caring service. Private, PRSI and medical card patients welcome.</p>
        <div class="actions">${callBtn('btn--lime btn--big')}${bookLink('btn--ghost-light btn--big', 'Request a visit')}</div>
      </div>
      <div class="hero__tiles">
        <a class="tile tile--lime" href="${clinic.mapsUrl}" target="_blank" rel="noopener" aria-label="${clinic.rating.score} out of 5 from ${clinic.rating.count} Google reviews">
          <span class="tile__big">${clinic.rating.score}</span>
          <span>${stars()}<br>${clinic.rating.count} Google reviews</span>
        </a>
        <div class="tile tile--paper">
          <span class="tile__k">Today</span>
          <span class="tile__v">${today.text}</span>
          <a class="link" href="#/contact" data-scroll="hours">Full opening hours ${icon('arrowRight')}</a>
        </div>
        <a class="tile tile--line" href="${clinic.phoneHref}">
          ${icon('alert')}
          <span class="tile__k">Emergency?</span>
          <span class="tile__v">Call ${clinic.phone}</span>
        </a>
        <div class="tile tile--line">
          <span class="tile__k">Your dentists</span>
          <span class="tile__v">Dr Bernice Barry<br>Dr Keith McCourt</span>
        </div>
      </div>
    </div>
    <div class="wrap">
      <ul class="strip">
        ${highlights.map((h) => `<li>${icon(h.icon)}<span><strong>${h.title}</strong>${h.text}</span></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="block">
    <div class="wrap">
      <div class="block__head" data-reveal>
        ${label(1, 'Services')}
        <h2 class="title-lg">Everything from a check-up to a crown.</h2>
        <a class="link" href="#/services">All services ${icon('arrowRight')}</a>
      </div>
      <ol class="rows">
        ${services.slice(0, 8).map((t, i) => `
          <li data-reveal><a class="row" href="#/services/${t.id}">
            <span class="row__n">${pad(i + 1)}</span>
            <span class="row__title">${t.title}</span>
            <span class="row__text">${t.short}</span>
            <span class="row__fee">${t.fee}</span>
            <span class="row__go">${icon('arrowRight')}</span>
          </a></li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="block block--leaf">
    <div class="wrap duo">
      <div data-reveal>
        ${label(2, 'The practice')}
        <h2 class="title-lg">Even the most nervous patients feel at ease here.</h2>
        <p class="intro">Dr Bernice Barry and Dr Keith McCourt offer high-quality, affordable dental care in a state-of-the-art surgery, with a flexible service for regular check-ups and emergencies.</p>
        <a class="btn btn--dark" href="#/about">About the practice ${icon('arrowRight')}</a>
      </div>
      <ul class="numbers" data-reveal>
        <li><b>€15</b><span>Exam, scale and polish once a year if you are PRSI qualified</span></li>
        <li><b>8.30</b><span>Doors open at 8.30am, Monday to Friday</span></li>
        <li><b>Free</b><span>Parking in Tyrconnell Park, across the road</span></li>
      </ul>
    </div>
  </section>

  <section class="block">
    <div class="wrap duo duo--prices">
      <div data-reveal>
        ${label(3, 'Prices')}
        <h2 class="title-lg">Every price, before you sit in the chair.</h2>
        <p class="intro">Our full price list is online, so there are no surprises.</p>
        <a class="btn btn--dark" href="#/prices">See the price list ${icon('arrowRight')}</a>
      </div>
      <div class="menu" data-reveal>
        ${[['Exam, scale & polish (PRSI)', '€15'], ['Examination and X-rays', '€60'], ['Exam, scale & polish', '€70'], ['Fillings', '€100 – €160'], ['Tooth whitening', '€250']]
          .map(([n, p]) => `<div class="menu__row"><span>${n}</span><i></i><span>${p}</span></div>`).join('')}
      </div>
    </div>
  </section>

  ${visitBlock(4)}
  ${callout()}`;
}

function renderAbout() {
  return `
  ${pageHead({
    crumb: 'About Us', n: 1,
    title: 'Modern dentistry with a personal touch.',
    lead: 'In our state-of-the-art surgery, just a few doors down from Tesco Express in Inchicore village, we combine the latest digital equipment with a personal, caring service.',
    actions: callBtn() + bookLink(),
  })}
  <section class="block block--tight">
    <div class="wrap">
      <ol class="values">
        ${aboutPillars.map((p, i) => `<li data-reveal><span class="values__n">${pad(i + 1)}</span><h2 class="title-sm">${p.title}</h2><p>${p.text}</p></li>`).join('')}
      </ol>
    </div>
  </section>
  <section class="block block--leaf">
    <div class="wrap duo">
      <div class="photo-slot" data-reveal role="img" aria-label="Space for a photo of the practice">${icon('home')}<span>Photo of the practice</span></div>
      <div data-reveal>
        ${label(2, 'Who we see')}
        <h2 class="title-lg">Everyone is welcome.</h2>
        <p class="intro">We offer a full range of dental services at very affordable prices, and we welcome all private, PRSI and medical card patients.</p>
        <ul class="ticks">
          <li>${icon('check')}Private, PRSI and medical card patients</li>
          <li>${icon('check')}€15 exam, scale and polish once a year if PRSI qualified</li>
          <li>${icon('check')}Regular and emergency appointments</li>
          <li>${icon('check')}Parking outside, and free parking across the road</li>
        </ul>
        <div class="actions"><a class="btn btn--dark" href="#/team">Meet the dentists ${icon('arrowRight')}</a><a class="btn btn--line" href="#/prices">See our prices</a></div>
      </div>
    </div>
  </section>
  ${callout('We look forward to meeting you.', `Call us on ${clinic.phone} to book your appointment.`)}`;
}

function renderTeam() {
  return `
  ${pageHead({
    crumb: 'Our Team', n: 1,
    title: 'Two dentists. One friendly practice.',
    lead: 'Our highly trained and friendly dentists offer a full range of dental services for the whole family.',
    actions: callBtn() + bookLink(),
  })}
  <section class="block block--tight">
    <div class="wrap people">
      ${team.map((m) => `
        <article class="person" data-reveal>
          <div class="person__photo" aria-hidden="true"><span>${m.initials}</span></div>
          <div class="person__body">
            <p class="person__role">${m.role} · ${m.quals}</p>
            <h2 class="title-md">${m.name}</h2>
            <p>${m.bio}</p>
            <a class="link" href="#/contact" data-scroll="appointment">Book with ${m.name.split(' ').slice(0, 2).join(' ')} ${icon('arrowRight')}</a>
          </div>
        </article>`).join('')}
    </div>
  </section>
  ${callout('Nervous about your visit?', 'Let us know when you book. We make sure even the most nervous patients feel at ease.')}`;
}

function renderServices(sub) {
  return `
  ${pageHead({
    crumb: 'Services', n: 1,
    title: 'A full range of dental services.',
    lead: 'From regular check-ups to emergency appointments, for adults and children.',
  })}
  <section class="block block--tight">
    <div class="wrap services">
      <nav class="index" aria-label="Services">
        ${services.map((t, i) => `<a href="#/services/${t.id}"><span>${pad(i + 1)}</span>${t.title}</a>`).join('')}
      </nav>
      <div class="services__list">
        ${services.map((t, i) => `
          <article class="service${sub === t.id ? ' is-target' : ''}" id="t-${t.id}" data-reveal>
            <span class="service__n">${pad(i + 1)}</span>
            <div>
              <h2 class="title-md">${t.title}</h2>
              ${t.body.map((p) => `<p>${p}</p>`).join('')}
              <p class="service__fee"><span>Guide price</span><strong>${t.fee}</strong><a class="link" href="#/prices/${t.group}">See prices ${icon('arrowRight')}</a></p>
            </div>
          </article>`).join('')}
      </div>
    </div>
  </section>
  ${callout('Not sure what you need?', 'Book an examination and your dentist will talk you through your options and costs.')}`;
}

function renderPrices(sub) {
  return `
  ${pageHead({
    crumb: 'Price List', n: 1,
    title: 'Our price list.',
    lead: 'A full price list for our dental services, so you know what to expect before your visit.',
  })}
  <section class="block block--tight">
    <div class="wrap">
      <ul class="notes">
        ${savings.map((s) => `<li data-reveal><strong>${s.title}</strong><span>${s.text}</span></li>`).join('')}
      </ul>
      <div class="price-tools">
        <label class="search">
          ${icon('search')}
          <span class="sr-only">Search prices</span>
          <input type="search" id="fee-search" placeholder="Search, e.g. filling" autocomplete="off">
        </label>
        <div class="tabs" role="group" aria-label="Filter by category">
          <button type="button" class="tab${sub ? '' : ' is-active'}" data-filter="all" aria-pressed="${!sub}">All</button>
          ${feeGroups.map((g) => `<button type="button" class="tab${sub === g.id ? ' is-active' : ''}" data-filter="${g.id}" aria-pressed="${sub === g.id}">${g.title}</button>`).join('')}
        </div>
      </div>
      <div class="price-list" id="fee-groups">
        ${feeGroups.map((g) => `
          <section class="fee-card" data-group="${g.id}">
            <h2 class="price-list__title">${g.title}</h2>
            ${g.items.map(([n, p]) => `<div class="fee-row menu__row" data-name="${esc(`${g.title} ${n}`.toLowerCase())}"><span>${n}</span><i></i><span>${p}</span></div>`).join('')}
          </section>`).join('')}
      </div>
      <p class="empty" id="fee-empty" hidden>No treatment matches your search. Call us on <a href="${clinic.phoneHref}">${clinic.phone}</a> and we’ll be happy to help.</p>
      <p class="fine">${icon('info')}${feeNote}</p>
    </div>
  </section>
  ${callout('Questions about a treatment or its cost?', `Call us on ${clinic.phone} and we’ll talk you through it.`)}`;
}

function renderContact() {
  return `
  ${pageHead({
    crumb: 'Contact Us', n: 1,
    title: 'Book your appointment.',
    lead: 'Call us or send an email. We offer emergency appointments, and we’ll work to give you an appointment as quickly as possible.',
    actions: callBtn() + emailBtn(),
  })}
  <section class="block block--tight">
    <div class="wrap contact">
      <div class="contact__form" id="appointment" data-reveal>
        <h2 class="title-md">Appointment request</h2>
        <p class="muted">Fill this in and we’ll open an email to the practice with your request. Send it from your email app; the practice will confirm a time. For anything urgent, please call.</p>
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
          <div class="form__actions"><button class="btn btn--dark" type="submit">${icon('mail')}<span>Open email draft</span></button><button class="link" type="button" id="copy-request">${icon('copy')}Copy request</button></div>
          <p class="form__feedback" id="request-feedback" role="status" hidden></p>
        </form>
      </div>
      <aside class="contact__side">
        <div class="card" id="hours" data-reveal>
          <div class="card__head"><h2 class="title-sm">Opening hours</h2>${statusPill()}</div>
          ${timetable()}
        </div>
        <a class="card card--lime" href="${clinic.phoneHref}" data-reveal>
          <span class="tile__k">Call the practice</span>
          <span class="tile__v">${clinic.phone}</span>
          <span>Emergency appointments available</span>
        </a>
        <a class="card" href="mailto:${clinic.email}" data-reveal>
          <span class="tile__k">Email</span>
          <span class="tile__v tile__v--sm">${clinic.email}</span>
        </a>
      </aside>
    </div>
  </section>
  ${visitBlock(2)}
  <section class="block">
    <div class="wrap faq-wrap">
      <div data-reveal>
        ${label(3, 'Questions')}
        <h2 class="title-lg">Good to know.</h2>
      </div>
      ${accordion(faqs)}
    </div>
  </section>`;
}

function renderNotFound() {
  return pageHead({
    crumb: 'Page not found', n: 0, title: 'We couldn’t find that page.',
    lead: 'It may have moved. Try one of the links above, or call us and we’ll help.',
    actions: `<a class="btn btn--dark" href="#/">Back to home</a>${callBtn('btn--line')}`,
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
  $('#site-header').innerHTML = `
    <div class="wrap header">
      <a class="logo" href="#/" aria-label="${clinic.name}, home">${logoMark}<span class="logo__text">Inchicore<span>Dental Centre</span></span></a>
      <nav class="nav" id="nav" aria-label="Main">
        ${nav.map((n) => `<a href="#/${n.path}" ${n.path === path ? 'aria-current="page"' : ''}>${n.label}</a>`).join('')}
        <a class="btn btn--dark nav__cta" href="${clinic.phoneHref}">${icon('phone')}<span>${clinic.phone}</span></a>
      </nav>
      <a class="btn btn--dark header__call" href="${clinic.phoneHref}">${icon('phone')}<span>${clinic.phone}</span></a>
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
  ['#main', '#site-footer', '#action-bar'].forEach((selector) => {
    $(selector).inert = open;
  });
  if (open) $('#nav a').focus();
}

function renderFooter() {
  $('#site-footer').innerHTML = `
    <div class="wrap footer">
      <div class="footer__brand">
        <a class="logo" href="#/">${logoMark}<span class="logo__text">Inchicore<span>Dental Centre</span></span></a>
        <p>${clinic.addressText}</p>
        <p><a href="${clinic.phoneHref}">${clinic.phone}</a><br><a href="mailto:${clinic.email}">${clinic.email}</a></p>
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
    </div>
    <div class="wrap footer__base">
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
