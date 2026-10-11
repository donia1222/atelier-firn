import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tramos } from '../data/escenas';

// Recorrido por portales. Cada tramo lleva de una escena a la siguiente: la cámara se acerca al portal de la escena
// actual (ventana, lupa, volante…) y la siguiente aparece dentro de él, crece y acaba ocupando la pantalla.
//
// Todo se calcula en fracciones del marco 16:9 de cada escena. Un punto `x` de una escena se pinta en `c + k · (x − p)`,
// donde `p` es el portal, `k` el zoom y `c` el punto de la pantalla hacia el que viaja la cámara (del portal de esta
// escena al punto de llegada de la siguiente). La escena siguiente usa la misma cámara con zoom `k / K`, así que al
// final del tramo (k = K) queda exactamente en su sitio y sin escalar.

type Key = { y: number; v: number };

const piecewise = (y: number, keys: Key[]) => {
  if (y <= keys[0].y) return keys[0].v;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (y <= b.y) return a.v + (b.v - a.v) * ((y - a.y) / (b.y - a.y || 1));
  }
  return keys[keys.length - 1].v;
};

const clamp01 = gsap.utils.clamp(0, 1);
const smooth = (t: number) => t * t * (3 - 2 * t);
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
// Mitad del alto del marco 16:9 en fracciones del ancho: el círculo visible de la escena entrante no puede ser mayor
// o se verían los bordes de la imagen.
const MAX_RHO = 0.27;
const RATIO = 16 / 9;

export function initPortal(world: HTMLElement, reduceMotion: boolean) {
  const stage = world.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-stop]')];
  const layers = [...stage.querySelectorAll<HTMLElement>('[data-layer]')];
  const scenes = layers.map((layer) => layer.parentElement as HTMLElement);
  const hand = document.querySelector<HTMLElement>('[data-dial-hand]');
  const dialLabel = document.querySelector<HTMLElement>('[data-dial-label]');
  const dialCount = document.querySelector<HTMLElement>('[data-dial-count]');
  const hint = stage.querySelector<HTMLElement>('[data-hint]');
  const last = stops.length - 1;
  const marks = stops.map((stop) => ScrollTrigger.create({ trigger: stop, start: 'top top' }));
  const pad = (n: number) => String(n).padStart(2, '0');

  let current = -2;
  const setCurrent = (index: number) => {
    if (index === current) return;
    current = index;
    stops.forEach((stop, i) => stop.classList.toggle('is-current', i === index));
    if (index < 0) return;
    if (dialLabel) dialLabel.textContent = stops[index].dataset.lugar ?? '';
    if (dialCount) dialCount.textContent = `${pad(index + 1)} / ${pad(stops.length)}`;
  };

  const place = (i: number, s: { tx: number; ty: number; k: number; opacity: number; blur: number; mask?: string }) => {
    const layer = layers[i];
    scenes[i].style.visibility = 'visible';
    layer.style.transform = `translate(${s.tx * 100}%, ${s.ty * 100}%) scale(${s.k})`;
    layer.style.opacity = String(s.opacity);
    layer.style.filter = s.blur > 0.05 ? `blur(${s.blur.toFixed(2)}px)` : '';
    layer.style.maskImage = s.mask ?? '';
    layer.style.webkitMaskImage = s.mask ?? '';
  };

  // Snow: en el exterior nieva; al entrar por la ventana los copos salen despedidos con el zoom.
  const snow = initSnow(stage.querySelector<HTMLCanvasElement>('[data-snow]'), reduceMotion);

  const render = (self: ScrollTrigger) => {
    const y = self.scroll();
    const w = piecewise(y, [...marks.map((mark, i) => ({ y: mark.start, v: i })), { y: self.end, v: last + 0.5 }]);
    const at = Math.min(w, last);
    if (hand) hand.style.transform = `rotate(${(at / last) * 360}deg)`;
    if (hint) hint.style.opacity = String(clamp01(1 - w * 5));

    const i = Math.min(Math.floor(at), last - 1);
    // Cada tramo deja quietas las escenas al principio y al final para que se pueda leer el texto.
    const t = at >= last ? 1 : range(at - i, 0.18, 0.88);
    // El texto solo se ve con la escena quieta; durante el viaje la pantalla es toda imagen.
    setCurrent(t < 0.06 ? i : t > 0.94 ? i + 1 : -1);

    scenes.forEach((scene, n) => {
      if (n !== i && n !== i + 1) scene.style.visibility = 'hidden';
    });

    const tramo = tramos[i];
    const { portal: p, llegada: q, zoom: K, apertura } = tramo;

    if (reduceMotion) {
      place(i, { tx: 0, ty: 0, k: 1, opacity: 1, blur: 0 });
      place(i + 1, { tx: 0, ty: 0, k: 1, opacity: smooth(range(t, 0.3, 0.7)), blur: 0 });
      snow?.set(at < 0.5 ? 1 : 0, 1, p);
      return;
    }

    const e = smooth(t);
    const k = Math.pow(K, e);
    const cx = p.x + (q.x - p.x) * e;
    const cy = p.y + (q.y - p.y) * e;

    // Escena actual: se acerca al portal; al final se desenfoca y se desvanece como algo que pasa junto a la cámara.
    const extra = 1 + 0.6 * smooth(range(t, 0.6, 1));
    const ko = k * extra;
    place(i, {
      tx: cx - ko * p.x,
      ty: cy - ko * p.y,
      k: ko,
      opacity: 1 - smooth(range(t, 0.86, 1)),
      blur: 14 * smooth(range(t, 0.5, 1)),
    });

    // Escena siguiente: vista a través del portal, recortada con un círculo difuminado que se abre al final.
    const ki = k / K;
    const rho0 = apertura ?? Math.min(p.r * K, MAX_RHO);
    const rho = rho0 + (1.4 - rho0) * smooth(range(t, 0.45, 1));
    const rx = rho * 100;
    const ry = rho * 100 * RATIO;
    const feather = 100 - 40 * (1 - smooth(range(t, 0.7, 1)));
    place(i + 1, {
      tx: cx - ki * q.x,
      ty: cy - ki * q.y,
      k: ki,
      // No aparece hasta que el portal ya es grande: antes, el portal sigue enseñando lo que tiene pintado dentro.
      opacity: smooth(range(t, 0.42, 0.72)),
      blur: 6 * (1 - smooth(range(t, 0.42, 0.8))),
      mask: t >= 1 ? undefined : `radial-gradient(ellipse ${rx}% ${ry}% at ${q.x * 100}% ${q.y * 100}%, #000 ${Math.min(feather, 99.5) - 40}%, transparent ${feather}%)`,
    });

    // Nieve solo en el primer tramo: k y el portal en pantalla le dicen desde dónde salir despedida.
    snow?.set(i === 0 ? 1 - range(t, 0.55, 0.9) : 0, i === 0 ? k : 1, { x: cx, y: cy });
  };

  const span = ScrollTrigger.create({
    trigger: world,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: render,
    onRefresh: render,
  });
  render(span);

  // Movimiento ambiente: el escenario respira un poco y sigue al puntero, para que las imágenes fijas no parezcan fotos.
  if (!reduceMotion) {
    const drift = stage.querySelector<HTMLElement>('[data-drift]');
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    window.addEventListener('pointermove', (event) => {
      target.x = event.clientX / innerWidth - 0.5;
      target.y = event.clientY / innerHeight - 0.5;
    });
    gsap.ticker.add((time) => {
      pos.x += (target.x - pos.x) * 0.04;
      pos.y += (target.y - pos.y) * 0.04;
      const breathe = 1.04 + Math.sin(time * 0.35) * 0.012;
      if (drift) drift.style.transform = `translate3d(${-pos.x * 18}px, ${-pos.y * 12}px, 0) scale(${breathe})`;
    });
  }
}

type Flake = { x: number; y: number; z: number; vx: number; vy: number };

function initSnow(canvas: HTMLCanvasElement | null, reduceMotion: boolean) {
  if (!canvas || reduceMotion) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  let width = 0;
  let height = 0;
  let amount = 1;
  let zoom = 1;
  let origin = { x: 0.5, y: 0.5 };
  const flakes: Flake[] = Array.from({ length: 160 }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: 0.25 + Math.random() * 0.75,
    vx: (Math.random() - 0.5) * 0.02,
    vy: 0.02 + Math.random() * 0.03,
  }));

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  let prev = 0;
  gsap.ticker.add((time) => {
    const dt = Math.min(time - prev, 0.05);
    prev = time;
    ctx.clearRect(0, 0, width, height);
    if (amount <= 0.01) return;
    // El origen del zoom está en fracciones del marco 16:9 que cubre la pantalla.
    const box = Math.max(width, height * RATIO);
    const ox = width / 2 + (origin.x - 0.5) * box;
    const oy = height / 2 + (origin.y - 0.5) * (box / RATIO);
    ctx.fillStyle = '#eef1f6';
    for (const f of flakes) {
      f.x = (f.x + f.vx * dt * f.z + 1) % 1;
      f.y = (f.y + f.vy * dt * f.z) % 1;
      // Los copos cercanos (z alto) se separan más deprisa del centro al hacer zoom: sensación de atravesar la nevada.
      const s = Math.pow(zoom, 0.6 + f.z * 1.6);
      const x = ox + (f.x * width - ox) * s;
      const y = oy + (f.y * height - oy) * s;
      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;
      ctx.globalAlpha = amount * (0.25 + f.z * 0.55);
      ctx.beginPath();
      ctx.arc(x, y, (0.6 + f.z * 1.8) * Math.min(s, 3), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });

  return {
    set(nextAmount: number, nextZoom: number, nextOrigin: { x: number; y: number }) {
      amount = nextAmount;
      zoom = nextZoom;
      origin = nextOrigin;
    },
  };
}
