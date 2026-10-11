export default function Revelado() {
  return (
    <section data-bg="#04060d" data-revelado aria-labelledby="revelado-titulo" className="relative h-[320svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Imagen recortada por un círculo que se abre con el scroll, como un portal más. */}
        <div data-revelado-mascara className="absolute inset-0" style={{ clipPath: 'circle(8vmin at 50% 50%)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-revelado-img
            src="/escenas/6-montanas.webp"
            alt="Vía Láctea sobre los Alpes y el pueblo iluminado junto al lago"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            className="size-full scale-125 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-noche/80 via-transparent to-noche/30" />
        </div>
        <div
          data-revelado-aro
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[16vmin] -translate-1/2 rounded-full ring-1 ring-laton"
        />

        <div data-revelado-antes className="absolute inset-x-0 top-[18%] text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-laton uppercase">La esfera</p>
          <p className="mt-4 font-display text-4xl font-medium tracking-[-0.045em] md:text-6xl">Mira por el volante</p>
        </div>

        <div data-revelado-despues className="absolute inset-x-0 bottom-[12%] px-6 text-center opacity-0">
          <h2 id="revelado-titulo" className="mx-auto max-w-4xl text-5xl leading-[0.95] md:text-8xl">
            El cielo de Firn, <em className="text-laton">en tu muñeca</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-nieve/75 md:text-lg">
            La esfera Nocturne se pinta a mano con el cielo que hay sobre el taller la noche en que se termina cada pieza.
          </p>
        </div>
      </div>
    </section>
  );
}
