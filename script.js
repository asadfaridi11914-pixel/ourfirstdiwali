// ===== EDIT THESE =====
const HER = "My Love";
const ME = "Asad";
const WISH = "On our first Diwali together, may every diya remind you of how brightly you light up my life.";
const LETTER = "My dearest " + HER + ",\n\nThis is our first Diwali together, and I wanted to give you something that glows as much as you do. You make my ordinary days feel like festivals. May this Diwali bring you endless happiness, sweet moments and every colour of joy.\n\nI promise to be your light on the darkest nights.\n\nForever yours,\n" + ME;
const PHOTO_MESSAGE = "This picture is my favourite because it was the first time we holded our hands very tightly as a life partner and started our new life together.";
const MEMORIES = [
["💫", "Where It Began", "From the first moment, something in my heart whispered that you were special.", "#ff2e88"],
["😊", "Your Smile", "Your smile is brighter than every firework in the sky tonight.", "#ffc857"],
["🌙", "Our Little Moments", "Every chat, every laugh and every silence with you is my favourite memory.", "#22d3ee"],
["🪔", "This Diwali", "The first of many festivals we will light up together.", "#8b5cf6"]
];
// ======================
const $ = id => document.getElementById(id);
const song = $('song');
$('names').textContent = HER + " ❤ " + ME;
$('fname').textContent = HER;
$('from').textContent = "Forever yours, " + ME + " ❤️";

// ----- Rangoli -----
const R = $('rangoli'), NS = 'http://www.w3.org/2000/svg';
function mk(tag, attrs) {
const e = document.createElementNS(NS, tag);
for (const k in attrs) e.setAttribute(k, attrs[k]);
R.appendChild(e);
return e;
}
for (let i = 0; i < 16; i++) {
const a = i * 22.5, h = (i * 22.5 + 20) % 360;
mk('ellipse', {cx: 0, cy: -95, rx: 13, ry: 38, transform: 'rotate(' + a + ')', stroke: 'hsl(' + h + ',100%,65%)', style: 'animation-delay:' + i * .12 + 's'});
}
for (let i = 0; i < 12; i++) {
const a = i * 30;
mk('ellipse', {cx: 0, cy: -55, rx: 9, ry: 24, transform: 'rotate(' + a + ')', stroke: 'hsl(' + (a + 180) % 360 + ',100%,70%)', style: 'animation-delay:' + (1 + i * .1) + 's'});
}
[135, 88, 40, 16].forEach((r, i) => mk('circle', {r: r, stroke: ['#ffc857', '#ff2e88', '#22d3ee', '#ff7b00'][i], 'stroke-dasharray': '6 5', style: 'animation:none;stroke-dashoffset:0'}));

// ----- Typing (hero) and letter (on scroll) -----
function type(el, txt, speed, done) {
let i = 0;
(function t() {
el.textContent = txt.slice(0, i++);
if (i <= txt.length) setTimeout(t, speed); else if (done) done();
})();
}
// ----- Timeline cards -----
MEMORIES.forEach(m => {
const c = document.createElement('div');
c.className = 'card glass';
c.style.setProperty('--c1', m[3]);
c.innerHTML = '<div class="ico">' + m[0] + '</div><h3>' + m[1] + '</h3><p>' + m[2] + '</p>';
$('timeline').appendChild(c);
});
// ----- Diyas -----
const total = 7;
let lit = 0;
for (let i = 0; i < total; i++) {
const d = document.createElement('div');
d.className = 'diya';
d.innerHTML = '<div class="flame"></div><div class="bowl"></div>';
d.onclick = () => {
if (d.classList.contains('lit')) return;
d.classList.add('lit');
lit++;
const r = d.getBoundingClientRect();
launch(r.left + r.width / 2, r.top - 90);
$('counter').textContent = lit < total ? lit + ' / ' + total + ' diyas lit' : 'All diyas lit! 🎉';
if (lit === total) { finale(); setTimeout(showPop, 1500); }
};
$('diyas').appendChild(d);
}
// ----- Scroll reveals -----
let typedLetter = false;
const io = new IntersectionObserver(es => es.forEach((en, i) => {
if (!en.isIntersecting) return;
if (en.target.id === 'letter') {
if (!typedLetter) { typedLetter = true; type(en.target, LETTER, 35); }
} else setTimeout(() => en.target.classList.add('in'), i * 140);
io.unobserve(en.target);
}), {threshold: .25});
document.querySelectorAll('.card,#letter').forEach(e => io.observe(e));

// ----- Open gift: start the song and the show -----
$('open').onclick = () => {
$('gate').classList.add('off');
song.volume = 0.8;
song.play().catch(() => {});
type($('typed'), WISH, 55);
grandLaunch();
setInterval(petal, 700);
};

// ----- Falling petals and diyas -----
const fall = ['🌼', '🏵️', '🪔', '✨', '🌸', '🧡'];
function petal() {
const e = document.createElement('div');
e.className = 'fl';
e.textContent = fall[Math.random() * fall.length | 0];
e.style.left = Math.random() * 100 + '%';
e.style.fontSize = 14 + Math.random() * 18 + 'px';
e.style.animationDuration = 7 + Math.random() * 7 + 's';
e.style.opacity = .5 + Math.random() * .5;
document.body.appendChild(e);
setTimeout(() => e.remove(), 15000);
}

// ----- Canvas: stars, shooting stars, fireworks -----
const cv = $('fx'), cx = cv.getContext('2d');
let W, H, stars = [];
function size() {
W = cv.width = innerWidth;
H = cv.height = innerHeight;
stars = Array.from({length: 130}, () => ({x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .3, p: Math.random() * 6, h: [45, 200, 320, 30][Math.random() * 4 | 0]}));
}
size();
addEventListener('resize', size);
const rk = [], bits = [], shoot = [];
const hues = [0, 20, 45, 150, 190, 280, 320, 340];
function launch(x, ty) {
rk.push({x: x, y: H, ty: ty, vy: -9 - Math.random() * 3, h: hues[Math.random() * hues.length | 0]});
}
function boom(x, y, h) {
const n = 80 + Math.random() * 50 | 0, ring = Math.random() > .5, two = Math.random() > .6;
for (let i = 0; i < n; i++) {
const a = Math.PI * 2 * i / n, s = ring ? 4.6 : 1 + Math.random() * 5;
bits.push({x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, dc: .008 + Math.random() * .01, h: two && i % 2 ? (h + 140) % 360 : h + Math.random() * 30, s: 1.4 + Math.random() * 2});
}
}
function frame(t) {
cx.globalCompositeOperation = 'source-over';
cx.clearRect(0, 0, W, H);
stars.forEach(s => {
const a = .35 + .65 * Math.abs(Math.sin(t / 900 + s.p));
cx.fillStyle = 'hsla(' + s.h + ',100%,85%,' + a + ')';
cx.beginPath();
cx.arc(s.x, s.y, s.r, 0, 7);
cx.fill();
});
cx.globalCompositeOperation = 'lighter';
if (Math.random() < .006) shoot.push({x: Math.random() * W, y: Math.random() * H * .4, l: 1});
for (let i = shoot.length - 1; i >= 0; i--) {
const s = shoot[i];
s.x += 9; s.y += 4; s.l -= .02;
const g = cx.createLinearGradient(s.x, s.y, s.x - 90, s.y - 40);
g.addColorStop(0, 'rgba(255,255,255,' + s.l + ')');
g.addColorStop(1, 'rgba(255,255,255,0)');
cx.strokeStyle = g;
cx.lineWidth = 2;
cx.beginPath();
cx.moveTo(s.x, s.y);
cx.lineTo(s.x - 90, s.y - 40);
cx.stroke();
if (s.l <= 0) shoot.splice(i, 1);
}
for (let i = rk.length - 1; i >= 0; i--) {
const r = rk[i];
r.y += r.vy; r.vy += .07;
cx.fillStyle = 'hsl(' + r.h + ',100%,70%)';
cx.beginPath();
cx.arc(r.x, r.y, 2.6, 0, 7);
cx.fill();
if (r.y <= r.ty || r.vy >= -1) { boom(r.x, r.y, r.h); rk.splice(i, 1); }
}
for (let i = bits.length - 1; i >= 0; i--) {
const b = bits[i];
b.x += b.vx; b.y += b.vy;
b.vx *= .98; b.vy = b.vy * .98 + .05;
b.l -= b.dc;
if (b.l <= 0) { bits.splice(i, 1); continue; }
cx.fillStyle = 'hsla(' + b.h + ',100%,65%,' + b.l + ')';
cx.beginPath();
cx.arc(b.x, b.y, b.s, 0, 7);
cx.fill();
}
requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
setInterval(() => launch(W * (.12 + Math.random() * .76), H * (.08 + Math.random() * .4)), 1300);
document.addEventListener('pointerdown', e => {
if (e.target.closest('button,.diya,.frame,#gate')) return;
launch(e.clientX, e.clientY);
});
function grandLaunch() {
for (let i = 0; i < 10; i++) setTimeout(() => launch(W * (.1 + Math.random() * .8), H * (.1 + Math.random() * .4)), i * 240);
}
function finale() {
grandLaunch();
setTimeout(grandLaunch, 2400);
}

// ----- Final question -----
const em = ['❤️', '💖', '✨', '🪔', '🌸', '💛', '🎆', '💕'];
function hearts(n) {
for (let i = 0; i < n; i++) setTimeout(() => {
const h = document.createElement('div');
h.className = 'up';
h.textContent = em[Math.random() * em.length | 0];
h.style.left = Math.random() * 100 + '%';
h.style.fontSize = 1 + Math.random() * 2 + 'rem';
document.body.appendChild(h);
setTimeout(() => h.remove(), 4200);
}, i * 110);
}
$('heartBtn').onclick = () => {
$('ask').classList.add('show');
const row = $('row');
if (row.children.length) return;
row.innerHTML = '<button class="btn" id="yes">Yes, forever 💖</button><button class="btn no" id="no">No 😅</button>';
const no = $('no');
const dodge = e => {
e.preventDefault();
no.style.position = 'fixed';
no.style.left = Math.random() * (innerWidth - 110) + 'px';
no.style.top = Math.random() * (innerHeight - 60) + 'px';
};
no.addEventListener('mouseenter', dodge);
no.addEventListener('touchstart', dodge);
no.onclick = dodge;
$('yes').onclick = () => {
no.remove();
$('final').classList.add('show');
$('yes').textContent = 'Happy Diwali 🪔';
finale();
hearts(40);
};
grandLaunch();
};

// ----- Popup after all diyas are lit -----
function showPop() {
$('popMsg').textContent = PHOTO_MESSAGE;
$('popPic').style.backgroundImage = getComputedStyle(document.querySelector('.frame .in')).backgroundImage;
$('pop').classList.add('show');
hearts(25);
}
function hidePop() {
$('pop').classList.remove('show');
}
$('popX').onclick = hidePop;
$('popOk').onclick = hidePop;