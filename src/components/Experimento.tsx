import type { CSSProperties } from 'react';
import { escenas } from '../data/escenas';

const datos = [
  { valor: '6', texto: 'imágenes generadas con ChatGPT' },
  { valor: '0', texto: 'vídeos: solo zoom, máscaras y movimiento' },
  { valor: '1,3 MB', texto: 'para todo el recorrido' },
];

export default function Experimento() {
  return (
    <section id="experimento" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-xs font-medium tracking-[0.3em] text-laton uppercase">
          El experimento
        </p>
        <h2 data-reveal style={{ '--d': '100ms' } as CSSProperties} className="mt-5 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
          Un paseo hecho con <em className="text-laton">portales</em>, no con vídeo
        </h2>
        <p data-reveal style={{ '--d': '200ms' } as CSSProperties} className="mt-8 max-w-2xl text-lg text-nieve/70">
          Cada imagen tiene una abertura redonda en el centro: una ventana, una lupa, un volante. Al hacer scroll, la cámara
          se acerca a esa abertura y la escena siguiente aparece dentro, crece y ocupa la pantalla. El marco se desenfoca al
          pasar junto a la cámara y da la sensación de atravesarlo.
        </p>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-nieve/10 ring-1 ring-nieve/10 md:grid-cols-3">
          {datos.map((dato, i) => (
            <div
              key={dato.texto}
              data-reveal
              style={{ '--d': `${i * 100}ms` } as CSSProperties}
              className="flex flex-col-reverse gap-2 bg-noche p-8"
            >
              <dt className="text-sm text-nieve/60">{dato.texto}</dt>
              <dd className="font-display text-6xl">{dato.valor}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {escenas.map((escena, i) => (
            <li key={escena.id} data-reveal style={{ '--d': `${i * 80}ms` } as CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={escena.src}
                alt={escena.alt}
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover ring-1 ring-nieve/10"
              />
              <p className="mt-3 flex items-baseline gap-2 text-sm">
                <span className="text-xs text-laton tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {escena.lugar}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
