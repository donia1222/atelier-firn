import type { CSSProperties } from 'react';
import { escenas } from '../data/escenas';

const pasos = [
  {
    titulo: 'Szenen generieren',
    texto: 'Sieben Bilder, mit ChatGPT erstellt – jedes mit einer runden Öffnung in der Mitte, die das nächste versteckt.',
  },
  {
    titulo: 'Portale vermessen',
    texto: 'Für jedes Bild werden Mittelpunkt und Radius des Portals markiert, dazu der Punkt der nächsten Szene, an dem man landet.',
  },
  {
    titulo: 'Zoom und Masken',
    texto: 'Das Scrollen bewegt eine gemeinsame Kamera: Eine Szene nähert sich ihrem Portal, die nächste wächst in einer runden Maske heran.',
  },
  {
    titulo: 'Leben einhauchen',
    texto: 'Langsames Atmen, Parallax mit dem Mauszeiger und Schnee, der beim Durchqueren des Fensters davonfliegt. Kein einziges Video.',
  },
];

const datos = [
  { valor: String(escenas.length), texto: 'generierte Bilder' },
  { valor: '0', texto: 'Videos' },
  { valor: '1.9 MB', texto: 'für den ganzen Rundgang' },
];

// Diagrama: círculos anidados, uno por escena. Al hacer scroll la cámara entra en ellos.
function Diagrama() {
  const anillos = escenas.length;
  return (
    <svg viewBox="-200 -200 400 400" className="size-full overflow-visible" aria-hidden="true">
      <g data-diagrama>
        {Array.from({ length: anillos }, (_, i) => {
          const r = 180 * Math.pow(0.52, i);
          return (
            <g key={i}>
              <circle r={r} fill="none" stroke="currentColor" strokeWidth={1.2} vectorEffect="non-scaling-stroke" opacity={0.25 + i * 0.1} />
              <text
                x={r * 0.71 + 6}
                y={-r * 0.71 - 6}
                fontSize={Math.max(r * 0.08, 1.5)}
                className="fill-nieve/60 font-mono"
              >
                {String(i + 1).padStart(2, '0')} {escenas[i].lugar}
              </text>
            </g>
          );
        })}
      </g>
      <circle r="3" className="fill-laton" />
    </svg>
  );
}

export default function ComoSeHizo() {
  return (
    <section id="experimento" data-bg="#070a14" data-como aria-labelledby="como-titulo" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] tracking-[0.3em] text-laton uppercase">Das Experiment</p>
        <h2 id="como-titulo" data-split className="mt-4 max-w-4xl text-5xl leading-[0.95] md:text-8xl">
          Ein Rundgang aus Portalen, <em className="text-laton">nicht aus Video</em>
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
            <div className="mx-auto aspect-square w-full max-w-[520px] text-nieve">
              <Diagrama />
            </div>
          </div>
          <ol className="flex flex-col gap-10 lg:py-[30svh]">
            {pasos.map((paso, i) => (
              <li
                key={paso.titulo}
                data-paso
                className="rounded-[2rem] bg-nieve/[0.03] p-8 ring-1 ring-nieve/10 transition-colors duration-700 md:p-10"
              >
                <span className="font-mono text-sm text-laton">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-3xl md:text-4xl">{paso.titulo}</h3>
                <p className="mt-4 text-base text-nieve/70 md:text-lg">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="mt-24 grid gap-px overflow-hidden rounded-[2rem] bg-nieve/10 ring-1 ring-nieve/10 md:grid-cols-3">
          {datos.map((dato, i) => (
            <div key={dato.texto} data-reveal style={{ '--d': `${i * 100}ms` } as CSSProperties} className="flex flex-col-reverse gap-2 bg-noche p-8">
              <dt className="text-sm text-nieve/60">{dato.texto}</dt>
              <dd className="font-mono text-5xl font-light tracking-tight">{dato.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
