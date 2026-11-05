// Builds the "Paris Sans Filtre" moodboard mockup as HTML, then renders it to PNG.
// Usage: node build.js <out.html> <out.png>
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const [outHtml, outPng] = process.argv.slice(2);

// Seeded RNG so the board renders the same way every time.
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const R = rng(7);
const rand = (a, b) => a + R() * (b - a);
const pick = (arr) => arr[Math.floor(R() * arr.length)];

const C = {
  nuit: '#0E1512', pellicule: '#2F4A3A', teal: '#5E9488',
  ambre: '#E0AC3F', neon: '#E4FF1A', vert: '#37AB2F', ink: '#1d1d1b',
};

const tile = (x, y, w, h, rot, inner, extra = '') =>
  `<div class="tile grain ${extra}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg)">` +
  `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg></div>`;

const blur = (id, sd) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
const glow = (id, sd) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
const vignette = (id, w, h, o = 0.65) =>
  `<radialGradient id="${id}" cx="50%" cy="50%" r="70%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${o}"/></radialGradient>`;

// ---------- Tile A: quai de nuit ----------
function tileA(w = 310, h = 240) {
  const yTop = (x) => 26 + (96 - 26) / 150 * x;
  const yBot = (x) => 232 - (232 - 128) / 150 * x;
  const wins = [[8, 38], [50, 76], [86, 104], [112, 124], [130, 139], [143, 148]].map(([a, b]) => {
    const p = (x, f) => `${x},${(yTop(x) + (yBot(x) - yTop(x)) * f).toFixed(1)}`;
    return `<polygon points="${p(a, .14)} ${p(b, .14)} ${p(b, .46)} ${p(a, .46)}" fill="#E9C46A" opacity=".78" filter="url(#aG)"/>`;
  }).join('');
  let lights = '';
  for (let t = 0; t < 10; t++) {
    const x = 302 - 128 * t / 9, y = 8 + 86 * t / 9;
    lights += `<circle cx="${x}" cy="${y}" r="${(5.5 * (1 - t / 11) + 0.8).toFixed(1)}" fill="#FFF4C9" filter="url(#aG)"/>`;
  }
  return `<defs>
    <linearGradient id="aBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2620"/><stop offset="1" stop-color="#0b100d"/></linearGradient>
    <pattern id="aT" width="16" height="9" patternUnits="userSpaceOnUse"><rect width="16" height="9" fill="#2b3a33"/><rect x=".8" y=".8" width="14.4" height="7.4" rx="1.5" fill="#56706a"/></pattern>
    <linearGradient id="aShade" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#0b100d" stop-opacity=".15"/><stop offset="1" stop-color="#0b100d" stop-opacity=".95"/></linearGradient>
    ${blur('aG', 2.2)}${vignette('aV', w, h)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#aBg)"/>
  <polygon points="0,0 310,0 180,96 150,96" fill="#17211c"/>
  <polygon points="310,0 310,212 182,122 182,96" fill="url(#aT)"/>
  <polygon points="310,0 310,212 182,122 182,96" fill="url(#aShade)"/>
  <polygon points="58,240 310,240 310,212 182,122 158,122" fill="#121915"/>
  <polygon points="58,240 68,240 160,122 158,122" fill="#cfd8cf" opacity=".45"/>
  <polygon points="74,240 106,240 164,122 161,122" fill="#E9C440" opacity=".92"/>
  <polygon points="0,26 150,96 150,128 0,232" fill="#22302a"/>
  ${wins}${lights}
  <ellipse cx="216" cy="187" rx="10" ry="2.5" fill="#000" opacity=".5"/>
  <circle cx="216" cy="146" r="4.6" fill="#050807"/>
  <rect x="209.5" y="151" width="13" height="27" rx="4" fill="#050807"/>
  <rect x="210.5" y="175" width="4.4" height="12" fill="#050807"/><rect x="217.2" y="175" width="4.4" height="12" fill="#050807"/>
  <rect width="${w}" height="${h}" fill="${C.pellicule}" opacity=".18"/>
  <rect width="${w}" height="${h}" fill="url(#aV)"/>`;
}

// ---------- Tile B: foule en pose longue, une silhouette nette ----------
function tileB(w = 240, h = 300) {
  const cols = ['#0b0e0b', '#1f2a22', '#3b3b33', '#2c3d4a', '#6b2a22', '#4a4a3a', '#c9b25a', '#141a15'];
  let crowd = '';
  for (let i = 0; i < 18; i++) {
    const pw = rand(18, 36), x = rand(-10, w - 10), top = rand(100, 135), ph = rand(160, 200), c = pick(cols);
    crowd += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" rx="9" fill="${c}" opacity=".9" filter="url(#bM)"/>`;
    crowd += `<circle cx="${(x + pw / 2).toFixed(1)}" cy="${(top - 9).toFixed(1)}" r="8.5" fill="${c}" opacity=".9" filter="url(#bM)"/>`;
  }
  return `<defs>
    <linearGradient id="bBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3c1e"/><stop offset=".45" stop-color="#1d2116"/><stop offset="1" stop-color="#0e120d"/></linearGradient>
    <filter id="bM" x="-80%" y="-20%" width="260%" height="140%"><feGaussianBlur stdDeviation="8 1"/></filter>
    ${blur('bS', 16)}${vignette('bV', w, h, .7)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bBg)"/>
  <ellipse cx="120" cy="18" rx="120" ry="55" fill="${C.ambre}" opacity=".38" filter="url(#bS)"/>
  <rect y="245" width="${w}" height="55" fill="#0b0e0b" opacity=".55"/>
  ${crowd}
  <path d="M96 300 L98 176 Q100 147 120 145 Q140 147 142 176 L144 300 Z" fill="#070907"/>
  <circle cx="120" cy="129" r="11.5" fill="#070907"/>
  <path d="M101 172 Q104 149 120 147 Q136 149 139 172" fill="none" stroke="${C.ambre}" stroke-width="1.2" opacity=".6"/>
  <path d="M110 121 Q120 114 130 121" fill="none" stroke="${C.ambre}" stroke-width="1" opacity=".55"/>
  <rect width="${w}" height="${h}" fill="${C.pellicule}" opacity=".12"/>
  <rect width="${w}" height="${h}" fill="url(#bV)"/>`;
}

// ---------- Tile C: pluie et feux, samedi soir ----------
function tileC(w = 270, h = 240) {
  const lights = [[40, 172, 16, '#ff3b2f'], [76, 184, 11, '#ff3b2f'], [192, 160, 21, '#ffb547'], [232, 116, 8, '#7be0a0'],
    [30, 108, 6, '#9fe8b8'], [140, 142, 12, '#f2f2e0'], [252, 192, 13, '#ff5a3c'], [112, 206, 9, '#ffb547'], [168, 98, 5, '#7be0a0']];
  const bokeh = lights.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".85" filter="url(#cB)"/>`).join('');
  const refl = lights.filter((l) => l[2] > 9).map(([x, y, r, c]) =>
    `<rect x="${x - 4}" y="${y + 12}" width="8" height="${30 + r}" fill="${c}" opacity=".32" filter="url(#cR)"/>`).join('');
  let rain = '';
  for (let i = 0; i < 70; i++) {
    const x = rand(0, w), y = rand(0, h), l = rand(9, 18);
    rain += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 3).toFixed(1)}" y2="${(y + l).toFixed(1)}" stroke="#fff" stroke-opacity="${rand(.12, .3).toFixed(2)}" stroke-width=".8"/>`;
  }
  let dust = '';
  for (let i = 0; i < 28; i++) dust += `<circle cx="${rand(0, w).toFixed(1)}" cy="${rand(0, h).toFixed(1)}" r="${rand(.4, 1.2).toFixed(2)}" fill="#fff" opacity=".35"/>`;
  return `<defs>${blur('cB', 5.5)}${blur('cR', 3)}${vignette('cV', w, h, .6)}
    <radialGradient id="cG" cx="50%" cy="85%" r="60%"><stop offset="0" stop-color="#1b3a2a" stop-opacity=".7"/><stop offset="1" stop-color="#070b09" stop-opacity="0"/></radialGradient></defs>
  <rect width="${w}" height="${h}" fill="#070b09"/>
  <rect width="${w}" height="${h}" fill="url(#cG)"/>
  <path d="M150 196 Q152 150 175 146 L248 146 Q266 150 268 196 Z" fill="#17241e" opacity=".85" filter="url(#cR)"/>
  ${refl}${bokeh}${rain}${dust}
  <text x="14" y="22" font-family="Space Mono" font-size="9" fill="#ff4a3d" letter-spacing="1">SAMEDI · 24.10.2026</text>
  <text x="256" y="22" text-anchor="end" font-family="Space Mono" font-size="9" fill="#ff4a3d">19:42</text>
  <rect x="14" y="31" width="132" height="13" rx="6.5" fill="none" stroke="#ff4a3d" stroke-width=".8"/>
  <text x="14" y="229" font-family="Space Mono" font-size="7" fill="#ff4a3d" letter-spacing="2">UNE NUIT DE PLUIE À PARIS</text>
  <rect width="${w}" height="${h}" fill="url(#cV)"/>`;
}

// ---------- Tile D: néon "station fermée" ----------
function tileD(w = 290, h = 180) {
  return `<defs>
    <pattern id="dT" width="28" height="14" patternUnits="userSpaceOnUse"><rect width="28" height="14" fill="#101612"/><rect x=".8" y=".8" width="26.4" height="12.4" rx="2" fill="#141c17"/></pattern>
    ${glow('dGy', 5)}${glow('dGg', 4)}${vignette('dV', w, h, .55)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#dT)"/>
  <line x1="70" y1="0" x2="70" y2="34" stroke="#2c332f" stroke-width="1.2"/><line x1="220" y1="0" x2="220" y2="34" stroke="#2c332f" stroke-width="1.2"/>
  <rect x="22" y="34" width="246" height="112" rx="8" fill="#090c0a" opacity=".75"/>
  <text x="145" y="82" text-anchor="middle" font-family="Anton" font-size="34" letter-spacing="1.5" fill="#F6FFC2" stroke="${C.neon}" stroke-width=".8" filter="url(#dGy)">STATION FERMÉE</text>
  <text x="128" y="128" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="30" fill="#D8FFD0" filter="url(#dGg)">plan B</text>
  <path d="M168 120 L222 120 M211 111 L223 120 L211 129" fill="none" stroke="#D8FFD0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#dGg)"/>
  <rect width="${w}" height="${h}" fill="url(#dV)"/>`;
}

// ---------- Tile E: lumière ambre dans la rame ----------
function tileE(w = 230, h = 310) {
  return `<defs>
    <linearGradient id="eBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18241c"/><stop offset="1" stop-color="#0b110d"/></linearGradient>
    <linearGradient id="eW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ebc2"/><stop offset="1" stop-color="#e2b04a"/></linearGradient>
    ${blur('eB', 7)}${blur('eS', 1.3)}${glow('eL', 3)}${vignette('eV', w, h, .6)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#eBg)"/>
  <rect x="40" y="9" width="150" height="7" rx="3" fill="#eef6d0" filter="url(#eL)"/>
  <rect x="112" y="48" width="108" height="96" rx="15" fill="url(#eW)"/>
  <rect x="112" y="48" width="108" height="96" rx="15" fill="none" stroke="#0a0f0b" stroke-width="7"/>
  <rect x="12" y="58" width="66" height="82" rx="13" fill="#cdbf8a" opacity=".55"/>
  <rect x="12" y="58" width="66" height="82" rx="13" fill="none" stroke="#0a0f0b" stroke-width="6"/>
  <polygon points="118,142 214,142 205,292 92,292" fill="${C.ambre}" opacity=".14" filter="url(#eB)"/>
  <rect x="100" y="152" width="122" height="40" rx="7" fill="#121a14"/>
  <rect x="94" y="190" width="132" height="18" rx="6" fill="#0d130e"/>
  <ellipse cx="160" cy="170" rx="7" ry="9" fill="#c2463a" opacity=".85"/>
  <polygon points="96,252 176,252 162,290 80,290" fill="#E9C46A" opacity=".92" filter="url(#eS)"/>
  <polygon points="190,236 230,236 230,260 180,260" fill="#E9C46A" opacity=".8" filter="url(#eS)"/>
  <line x1="56" y1="0" x2="56" y2="310" stroke="#7f876f" stroke-width="6"/>
  <line x1="54" y1="0" x2="54" y2="310" stroke="#d6dcbc" stroke-width="1.4" opacity=".55"/>
  <rect width="${w}" height="${h}" fill="${C.pellicule}" opacity=".12"/>
  <rect width="${w}" height="${h}" fill="url(#eV)"/>`;
}

// ---------- Tile F: piste typo façon affiche ----------
function tileF(w = 280, h = 390) {
  let handles = '';
  for (let i = 0; i < 8; i++) {
    const s = 1 - i * 0.09;
    handles += `<rect x="${(16 + i * 13).toFixed(1)}" y="${(34 + i * 7).toFixed(1)}" width="${(9 * s).toFixed(1)}" height="${(14 * s).toFixed(1)}" rx="3" fill="none" stroke="#e8892b" stroke-width="2.2"/>`;
    handles += `<rect x="${(w - 25 - i * 13).toFixed(1)}" y="${(34 + i * 7).toFixed(1)}" width="${(9 * s).toFixed(1)}" height="${(14 * s).toFixed(1)}" rx="3" fill="none" stroke="#e8892b" stroke-width="2.2"/>`;
  }
  const cols = ['#3b4a22', '#596a2c', '#2a3418', '#7a6a3a', '#1c2412', '#a8322a', '#d9d6c4'];
  let crowd = '';
  for (let j = 0; j < 4; j++) {
    const y = 128 + j * 34, size = 1 - j * 0.12;
    for (let i = 0; i < 6; i++) {
      const x = rand(10, w - 30), c = pick(cols);
      crowd += `<rect x="${x.toFixed(1)}" y="${(y + 14 * size).toFixed(1)}" width="${(26 * size).toFixed(1)}" height="${(120 * size).toFixed(1)}" rx="8" fill="${c}" opacity=".85" filter="url(#fB)"/>`;
      crowd += `<circle cx="${(x + 13 * size).toFixed(1)}" cy="${y.toFixed(1)}" r="${(10 * size).toFixed(1)}" fill="${c === '#d9d6c4' ? '#3a2e22' : c}" opacity=".9" filter="url(#fB)"/>`;
    }
  }
  const para = ['Ils ont appris leur trajet par', 'cœur en trois semaines. Un', 'seul trajet. Le reste du', 'réseau, c’est encore une', 'carte pleine de couleurs.'];
  const paraSvg = para.map((l, i) => `<tspan x="266" dy="${i ? 8.4 : 0}">${l}</tspan>`).join('');
  return `<defs>
    <linearGradient id="fBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a18"/><stop offset=".6" stop-color="#162010"/><stop offset="1" stop-color="#0c1208"/></linearGradient>
    ${blur('fB', 2.2)}${blur('fL', 5)}${vignette('fV', w, h, .55)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#fBg)"/>
  <polygon points="70,0 210,0 160,110 120,110" fill="#d9ecb0" opacity=".16" filter="url(#fL)"/>
  ${handles}${crowd}
  <rect width="${w}" height="${h}" fill="${C.pellicule}" opacity=".22"/>
  <rect width="${w}" height="${h}" fill="url(#fV)"/>
  <text x="140" y="17" text-anchor="middle" font-family="Space Mono" font-size="7.5" fill="${C.ambre}" letter-spacing="1">© PARIS SANS FILTRE · 2026</text>
  <text x="266" y="248" text-anchor="end" font-family="Inter" font-size="6.6" fill="${C.ambre}">${paraSvg}</text>
  <text x="14" y="318" font-family="Anton" font-size="34" fill="${C.ambre}" letter-spacing=".5">MOI, JE N’AI QUE</text>
  <text x="12" y="374" font-family="Instrument Serif" font-style="italic" font-size="70" fill="${C.ambre}">le plan A.</text>`;
}

// ---------- LED board ----------
function tileG(w = 320, h = 115) {
  return `<defs>${glow('gG', 2.2)}
    <pattern id="gDots" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="none"/><rect x="2.2" width=".8" height="3" fill="#000" opacity=".55"/><rect y="2.2" width="3" height=".8" fill="#000" opacity=".55"/></pattern></defs>
  <rect width="${w}" height="${h}" rx="9" fill="#0a0a09"/>
  <rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="7" fill="none" stroke="#2c2c2a" stroke-width="3"/>
  <text x="20" y="40" font-family="DotGothic16" font-size="17" fill="#FFB000" filter="url(#gG)">LIGNE 7</text>
  <text x="300" y="40" text-anchor="end" font-family="DotGothic16" font-size="17" fill="#FFB000" filter="url(#gG)">19:42</text>
  <text x="20" y="84" font-family="DotGothic16" font-size="29" fill="#FFB000" filter="url(#gG)">TRAFIC INTERROMPU</text>
  <rect width="${w}" height="${h}" rx="9" fill="url(#gDots)"/>`;
}

// ---------- Phone: plan B ----------
function tileH(w = 230, h = 380) {
  let streets = '';
  for (let i = 0; i < 9; i++) {
    const y = 80 + i * 32 + rand(-6, 6);
    streets += `<line x1="0" y1="${y.toFixed(1)}" x2="230" y2="${(y + rand(-30, 30)).toFixed(1)}" stroke="#fff" stroke-width="${pick([3, 5, 7])}"/>`;
  }
  for (let i = 0; i < 7; i++) {
    const x = 20 + i * 32 + rand(-6, 6);
    streets += `<line x1="${x.toFixed(1)}" y1="60" x2="${(x + rand(-25, 25)).toFixed(1)}" y2="380" stroke="#fff" stroke-width="${pick([3, 5])}"/>`;
  }
  return `<defs>
    <clipPath id="hS"><rect x="13" y="13" width="204" height="354" rx="26"/></clipPath>
    <filter id="hSh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity=".18"/></filter>
  </defs>
  <rect x="4" y="4" width="222" height="372" rx="34" fill="#121212"/>
  <rect x="5.5" y="5.5" width="219" height="369" rx="33" fill="none" stroke="#3a3a3a" stroke-width="1.5"/>
  <g clip-path="url(#hS)">
    <rect x="13" y="13" width="204" height="354" fill="#EEF0E8"/>
    <rect x="120" y="230" width="70" height="50" fill="#dcebcd"/><rect x="20" y="110" width="50" height="40" fill="#dcebcd"/>
    <path d="M0 175 C60 150 90 200 150 182 S220 160 240 170" stroke="#cbdbe1" stroke-width="16" fill="none"/>
    ${streets}
    <path d="M40 282 L112 232 L176 118" stroke="#9aa09a" stroke-width="4" stroke-dasharray="6 5" fill="none" opacity=".85"/>
    <polyline points="40,282 62,266 62,240 150,206 150,130 182,98" fill="none" stroke="${C.vert}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="112" cy="232" r="9.5" fill="${C.neon}" stroke="#111" stroke-width="1.6"/>
    <path d="M107.5 227.5 L116.5 236.5 M116.5 227.5 L107.5 236.5" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <circle cx="40" cy="282" r="6" fill="#fff" stroke="${C.vert}" stroke-width="3"/>
    <circle cx="182" cy="98" r="8" fill="${C.vert}" stroke="#fff" stroke-width="2.5"/>
    <rect x="13" y="13" width="204" height="62" fill="${C.vert}"/>
    <text x="27" y="46" font-family="Inter" font-weight="700" font-size="16.5" fill="#fff">Ton plan B</text>
    <text x="204" y="46" text-anchor="end" font-family="Space Mono" font-weight="700" font-size="13" fill="#fff">12 min</text>
    <text x="27" y="63" font-family="Inter" font-size="8.6" fill="#fff" opacity=".92">Itinéraire mis à jour · 19:42</text>
    <rect x="24" y="300" width="182" height="54" rx="11" fill="#fff" filter="url(#hSh)"/>
    <text x="37" y="322" font-family="Space Mono" font-weight="700" font-size="9.6" fill="#111">Ligne 6 + 5 min à pied</text>
    <text x="37" y="340" font-family="Inter" font-weight="600" font-size="8.6" fill="${C.vert}">Départ dans 2 min</text>
  </g>
  <rect x="92" y="19" width="46" height="11" rx="5.5" fill="#121212"/>`;
}

// ---------- Textures ----------
function texTiles(w = 170, h = 125) {
  return `<defs>
    <linearGradient id="tG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfaf5"/><stop offset=".6" stop-color="#e8e5dc"/><stop offset="1" stop-color="#c9c4b6"/></linearGradient>
    <pattern id="tP" width="34" height="17" patternUnits="userSpaceOnUse"><rect width="34" height="17" fill="#aca697"/><rect x="1" y="1" width="32" height="15" rx="3.5" fill="url(#tG)"/></pattern>
    <radialGradient id="tD" cx="40%" cy="35%" r="80%"><stop offset=".4" stop-color="#3a3a2a" stop-opacity="0"/><stop offset="1" stop-color="#3a3a2a" stop-opacity=".45"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#tP)"/>
  <rect width="${w}" height="${h}" fill="url(#tD)"/>`;
}
function texGlass(w = 170, h = 125) {
  let drops = '';
  for (let i = 0; i < 34; i++) {
    const x = rand(0, w), y = rand(0, h), r = rand(1.4, 5);
    drops += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" fill-opacity=".09" stroke="#fff" stroke-opacity=".28" stroke-width=".6"/>`;
    drops += `<circle cx="${(x - r * .35).toFixed(1)}" cy="${(y - r * .35).toFixed(1)}" r="${(r * .25).toFixed(2)}" fill="#fff" opacity=".55"/>`;
  }
  return `<defs>${blur('vB', 8)}</defs>
  <rect width="${w}" height="${h}" fill="#0e1612"/>
  <circle cx="40" cy="80" r="22" fill="${C.ambre}" opacity=".6" filter="url(#vB)"/>
  <circle cx="120" cy="40" r="18" fill="#5bd38a" opacity=".45" filter="url(#vB)"/>
  <circle cx="140" cy="100" r="14" fill="#ff4a3d" opacity=".5" filter="url(#vB)"/>
  ${drops}`;
}

// ---------- Cut-outs ----------
const compass = `<svg class="cutout" style="left:1086px;top:262px;transform:rotate(12deg)" width="124" height="124" viewBox="0 0 124 124">
  <defs><linearGradient id="kB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3c26a"/><stop offset=".5" stop-color="#b08a36"/><stop offset="1" stop-color="#7d5f1f"/></linearGradient></defs>
  <circle cx="62" cy="62" r="58" fill="url(#kB)"/><circle cx="62" cy="62" r="48" fill="#f3eddb"/>
  ${Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12, r1 = 48, r2 = i % 6 === 0 ? 40 : 44; return `<line x1="${(62 + r1 * Math.sin(a)).toFixed(1)}" y1="${(62 - r1 * Math.cos(a)).toFixed(1)}" x2="${(62 + r2 * Math.sin(a)).toFixed(1)}" y2="${(62 - r2 * Math.cos(a)).toFixed(1)}" stroke="#5a4a2a" stroke-width="1"/>`; }).join('')}
  <text x="62" y="31" text-anchor="middle" font-family="Instrument Serif" font-size="13" fill="#2a2418">N</text>
  <text x="62" y="101" text-anchor="middle" font-family="Instrument Serif" font-size="13" fill="#2a2418">S</text>
  <text x="96" y="66" text-anchor="middle" font-family="Instrument Serif" font-size="13" fill="#2a2418">E</text>
  <text x="28" y="66" text-anchor="middle" font-family="Instrument Serif" font-size="13" fill="#2a2418">O</text>
  <polygon points="62,22 68,62 56,62" fill="${C.vert}"/><polygon points="62,102 68,62 56,62" fill="${C.neon}" stroke="#4a4a2a" stroke-width=".7"/>
  <circle cx="62" cy="62" r="4.5" fill="#2a2418"/></svg>`;

const ticket = `<svg class="cutout" style="left:1452px;top:842px;transform:rotate(-6deg)" width="204" height="76" viewBox="0 0 204 76">
  <rect x="2" y="2" width="200" height="72" rx="5" fill="#f1e9d2"/>
  <rect x="2" y="50" width="200" height="11" fill="#7a5a34"/>
  <text x="14" y="24" font-family="Space Mono" font-weight="700" font-size="11.5" fill="#1d1d1b" letter-spacing="1">TICKET · SÉANCE PLAN B</text>
  <text x="14" y="41" font-family="Inter" font-size="8.6" fill="#3a3a33">Fin heureuse garantie.</text>
  <text x="190" y="72" text-anchor="end" font-family="Space Mono" font-size="6.5" fill="#5a5a50">N° 0B-2026</text></svg>`;

// ---------- Hand-drawn helpers ----------
const arrow = (x, y, w, h, d, head) =>
  `<svg class="ink" style="left:${x}px;top:${y}px" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d}" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="${head}" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const note = (x, y, w, html, size = 23, rot = 0, extra = '') =>
  `<div class="note ${extra}" style="left:${x}px;top:${y}px;width:${w}px;font-size:${size}px;transform:rotate(${rot}deg)">${html}</div>`;

// ---------- Palette ----------
const swatches = [
  ['Nuit de quai', '#0E1512'], ['Vert pellicule', '#2F4A3A'], ['Teal métro', '#5E9488'],
  ['Ambre d’automne', '#E0AC3F'], ['Jaune néon', '#E4FF1A'], ['Vert Citymapper', '#37AB2F'],
];
const paletteHtml = swatches.map(([n, hex], i) => {
  const x = 50 + (i % 3) * 144, y = 664 + Math.floor(i / 3) * 150;
  return `<div class="swatch" style="left:${x}px;top:${y}px"><div class="chip" style="background:${hex}"></div><div class="lab"><span class="sn">${n}</span><span class="sh">${hex}</span></div></div>`;
}).join('');

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500;700&family=DotGothic16&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;600;700&family=Space+Mono:wght@400;700&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1920px; height: 1080px; background: #ECE7DC; }
  .board { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: #ECE7DC; }
  .board::before { content: ''; position: absolute; inset: 0; opacity: .55; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .55  0 0 0 0 .5  0 0 0 0 .42  0 0 0 .35 0'/></filter><rect width='400' height='400' filter='url(%23n)'/></svg>"); }
  .tile, .cutout, .card, .swatch, .sticky { position: absolute; }
  .tile { box-shadow: 0 10px 22px rgba(30,25,15,.28), 0 2px 4px rgba(30,25,15,.2); overflow: hidden; }
  .tile svg { display: block; }
  .grain::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .38; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23g)'/></svg>"); }
  .cutout { filter: drop-shadow(0 6px 8px rgba(30,25,15,.32)); }
  .ink { position: absolute; overflow: visible; }
  .note { position: absolute; font-family: 'Caveat', cursive; font-weight: 500; color: ${C.ink}; line-height: 1.02; }
  .hl-y { background: linear-gradient(transparent 52%, ${C.neon} 52%, ${C.neon} 88%, transparent 88%); padding: 0 4px; }
  .hl-g { background: linear-gradient(transparent 52%, #bfe8b9 52%, #bfe8b9 88%, transparent 88%); padding: 0 4px; }
  .info { position: absolute; top: 12px; left: 0; width: 1920px; display: flex; justify-content: center; gap: 74px; }
  .info div { text-align: center; }
  .info b { display: block; font-family: 'Anton'; font-weight: 400; font-size: 17px; letter-spacing: 2px; color: ${C.nuit}; }
  .info span { font-family: 'Space Mono'; font-size: 11.5px; letter-spacing: 1px; color: #3b3b35; }
  .title { position: absolute; top: 58px; left: 0; width: 1920px; text-align: center; font-family: 'Instrument Serif'; font-size: 206px;
    line-height: 1; letter-spacing: -3px; color: ${C.nuit}; }
  .swatch { width: 132px; box-shadow: 0 6px 14px rgba(30,25,15,.18); background: #fbfaf6; }
  .chip { width: 132px; height: 96px; }
  .lab { padding: 6px 8px 7px; display: flex; flex-direction: column; gap: 2px; }
  .sn { font-family: 'Instrument Serif'; font-size: 15px; text-transform: uppercase; letter-spacing: .4px; color: #1d1d1b; line-height: 1; }
  .sh { font-family: 'Space Mono'; font-size: 10px; color: #55554d; }
  .card { background: #fbfaf6; box-shadow: 0 10px 22px rgba(30,25,15,.22); padding: 14px 18px; }
  .tape { position: absolute; width: 92px; height: 26px; background: rgba(233,224,190,.72); box-shadow: 0 1px 2px rgba(0,0,0,.08); }
  .sticky { background: #EEF4A8; box-shadow: 0 8px 16px rgba(30,25,15,.2); padding: 14px 18px; font-family: 'Caveat'; font-weight: 500; font-size: 25px; line-height: 1.08; color: ${C.ink}; }
</style></head><body><div class="board">

<div class="info">
  <div><b>CAMPAGNE</b><span>PARIS SANS FILTRE</span></div>
  <div><b>ANNONCEUR</b><span>CITYMAPPER</span></div>
  <div><b>CIBLE</b><span>NOUVEAUX PARISIENS</span></div>
  <div><b>TON</b><span>DIRECT · COMPLICE</span></div>
  <div><b>SUPPORTS</b><span>DOOH + SOCIAL</span></div>
</div>
<div class="title">PARIS SANS FILTRE</div>

${note(52, 318, 180, '<span class="hl-y">Plan A :</span><br><span class="hl-y">le chaos</span>', 44, -3)}
${arrow(150, 425, 100, 40, 'M4 8 C30 30 60 30 92 22', 'M78 12 L93 22 L80 32')}
${tile(240, 305, 310, 240, -2.2, tileA())}
${tile(572, 280, 240, 300, 1.8, tileB())}
${tile(832, 320, 270, 240, -1, tileC())}
${compass}
${note(1214, 290, 240, 'Ta boussole au cœur du chaos', 22, -2)}
${tile(1152, 344, 290, 180, 2, tileD())}
${tile(1466, 284, 230, 310, -1.5, tileE())}
${note(1716, 318, 190, 'Lumière ambre d’automne, soleil bas dans la rame', 23, 2)}
${arrow(1690, 400, 40, 30, 'M34 6 C24 14 14 18 6 20', 'M15 11 L5 20 L17 25')}

${note(258, 556, 300, 'Quai de nuit, teinte verte', 22, -1)}
${note(588, 590, 260, 'Paris bouge, elle reste figée.', 22, 1)}
${note(850, 568, 290, 'Pluie, reflets, grain pellicule', 22, -1)}
${note(1168, 534, 290, 'Néons : jaune = alerte,<br>vert = solution', 22, 1)}

${note(52, 606, 140, 'Palette', 40, -2)}
${note(190, 612, 300, 'Fond sombre teinté pellicule.<br>Le jaune alerte, le vert rassure.', 20, -1)}
${paletteHtml}
<div class="sticky" style="left:50px;top:966px;width:430px;transform:rotate(-1deg)">Intention : le plan A est filmé comme un drame de cinéma (flou, grain, nuit). Le plan B en est la fin heureuse : net, vert, lumineux.</div>

${tile(512, 630, 280, 390, -1.5, tileF())}
<div class="tape" style="left:610px;top:618px;transform:rotate(-4deg)"></div>
${note(512, 1030, 300, 'Piste typo : grotesk + serif italique', 22, -1)}

${tile(826, 640, 320, 115, 1, tileG())}
<div class="card" style="left:826px;top:778px;width:320px;height:252px;transform:rotate(-1.2deg)">
  <div class="tape" style="left:114px;top:-12px;transform:rotate(3deg)"></div>
  <div style="font-family:Caveat;font-size:30px;font-weight:700;color:${C.ink};line-height:1">Typographie</div>
  <div style="font-family:'Instrument Serif';font-style:italic;font-size:40px;line-height:1.05;margin-top:6px">Paris sans filtre</div>
  <div style="font-family:Caveat;font-size:18px;color:#55554d;line-height:1">Instrument Serif · titres, émotion</div>
  <div style="font-family:Anton;font-size:30px;letter-spacing:.5px;line-height:1.15;margin-top:8px">STATION FERMÉE.</div>
  <div style="font-family:Caveat;font-size:18px;color:#55554d;line-height:1">Anton · messages DOOH, lisibles en 3 s</div>
  <div style="font-family:'Space Mono';font-size:14.5px;margin-top:9px">09:12 · LIGNE 6 · +5 MIN</div>
  <div style="font-family:Caveat;font-size:18px;color:#55554d;line-height:1">Space Mono · infos en temps réel</div>
</div>

${tile(1186, 610, 230, 380, 3, tileH(), 'phone')}
<svg class="ink" style="left:1176px;top:996px" width="260" height="70" viewBox="0 0 260 70"><path d="M14 36 C14 12 120 6 210 12 C250 16 252 52 200 60 C120 70 20 66 12 44" fill="none" stroke="${C.vert}" stroke-width="2.6" stroke-linecap="round"/></svg>
${note(1206, 1010, 230, 'Plan B : la clarté', 34, -1)}

${tile(1458, 642, 170, 125, -2, texTiles())}
${tile(1648, 652, 170, 125, 2.5, texGlass())}
${note(1462, 782, 380, 'Textures : carrelage du métro, vitres mouillées', 21, -1)}
${ticket}
${note(1700, 836, 200, 'Mots-clés', 34, -2)}
${note(1712, 878, 190, '<span class="hl-y">Chaos</span><br>Mouvement<br>Nuit<br><span class="hl-g">Clarté</span><br><span class="hl-g">Plan B</span>', 30, -2)}

</div></body></html>`;

fs.writeFileSync(outHtml, html);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(outHtml), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: outPng, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  await browser.close();
  console.log('ok', outPng);
})();
