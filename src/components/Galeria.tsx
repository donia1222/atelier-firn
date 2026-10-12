import { escenas } from '../data/escenas';

export default function Galeria() {
  return (
    <section data-bg="#120c07" data-galeria aria-labelledby="galeria-titulo" className="relative">
      <div data-galeria-pin className="relative flex h-svh flex-col justify-center overflow-hidden pt-16 md:pt-0">
        <div className="flex items-end justify-between gap-6 px-6 md:px-12">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-laton uppercase">Der Rundgang</p>
            <h2 id="galeria-titulo" data-split className="mt-3 text-[clamp(2.1rem,6.5svh,3rem)] leading-[0.95] md:mt-4 md:text-7xl">
              Sieben Szenen, <em className="text-laton">eine Reise</em>
            </h2>
          </div>
          <p className="hidden max-w-xs pb-2 text-sm text-nieve/60 md:block">
            Jedes Bild versteckt das nächste in einem Kreis: Fenster, Lupe, Unruh, Reif, See.
          </p>
        </div>

        <ol data-galeria-pista className="mt-[4svh] flex w-max gap-5 px-6 md:mt-14 md:gap-8 md:px-12">
          {escenas.map((escena, i) => (
            <li
              key={escena.id}
              data-galeria-tarjeta
              className="group relative h-[min(52svh,calc(100svh-15rem))] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-nieve/10 md:h-[58svh] md:w-[42vw]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-galeria-img
                src={escena.src}
                alt={escena.alt}
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-[124%] max-w-none -translate-x-[10%] object-cover transition-transform duration-1000 ease-(--ease-fluid) group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-noche/85 via-noche/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <h3 className="text-3xl md:text-4xl">{escena.lugar}</h3>
                  <p className="mt-2 max-w-sm text-sm text-nieve/70">{escena.nota}</p>
                </div>
                <span className="font-mono text-6xl leading-none font-light text-nieve/25 md:text-8xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-6 mt-10 h-px bg-nieve/10 md:mx-12">
          <div data-galeria-barra className="h-full origin-left scale-x-0 bg-laton" />
        </div>
      </div>
    </section>
  );
}
