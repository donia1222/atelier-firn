import Stop from './Stop';
import Dial from './Dial';
import { escenas } from '../data/escenas';

const title = 'mt-4 text-5xl leading-[0.95] md:text-6xl';
const body = 'mt-5 max-w-lg text-base text-nieve/75 md:text-lg';

export default function PortalWorld() {
  return (
    <section data-world aria-label="Recorrido por el taller" className="relative">
      <div data-stage className="sticky top-0 h-lvh overflow-hidden bg-noche">
        <div data-drift aria-hidden="true" className="absolute inset-0" style={{ transform: 'scale(1.04)' }}>
          {escenas.map((escena, i) => (
            <div key={escena.id} className="scene" style={i === 0 ? undefined : { visibility: 'hidden' }}>
              <div data-layer className="scene-layer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={escena.src}
                  alt=""
                  width={1672}
                  height={941}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <canvas data-snow aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />

        {/* Velos: viñeta para dar profundidad y degradado inferior para leer el texto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(7_10_20/0.55)_100%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-noche/90 via-noche/40 to-transparent" />

        <div data-hint aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="relative block h-9 w-5 rounded-full ring-1 ring-nieve/40">
            <span className="hint-dot absolute top-2 left-1/2 -ml-0.5 size-1 rounded-full bg-nieve" />
          </span>
        </div>

        <Dial />
      </div>

      <div className="relative z-10 -mt-[100lvh]">
        <Stop index={0} eyebrow="Atelier Firn · Relojería alpina">
          <h1 className={title}>
            El tiempo se hace <em className="text-laton">a mano</em>
          </h1>
          <p className={body}>Un taller de piedra al pie del glaciar. Desliza y entra por la ventana.</p>
        </Stop>

        <Stop index={1} eyebrow="El banco">
          <h2 className={title}>Cuatrocientas horas bajo la misma lámpara</h2>
          <p className={body}>
            Cada calibre se monta, se ajusta y se vuelve a desmontar en un solo banco, por una sola persona.
          </p>
        </Stop>

        <Stop index={2} eyebrow="El calibre">
          <h2 className={title}>Doscientas piezas en el tamaño de una moneda</h2>
          <p className={body}>Puentes grabados a mano y rubíes que solo verá quien abra la tapa.</p>
        </Stop>

        <Stop index={3} eyebrow="El volante">
          <h2 className={title}>
            Late <em className="text-laton">28.800</em> veces por hora
          </h2>
          <p className={body}>El volante y su espiral marcan el ritmo. Ajustarlos lleva días: un pelo fuera de sitio y el reloj miente.</p>
        </Stop>

        <Stop index={4} eyebrow="La complicación">
          <h2 className={title}>Dentro del volante, el cielo</h2>
          <p className={body}>La esfera Nocturne muestra el cielo de los Alpes tal y como está sobre el taller, noche a noche.</p>
        </Stop>

        <Stop index={5} eyebrow="Firn Nocturne · Calibre F-01">
          <h2 className={title}>
            Las montañas, <em className="text-laton">a tu muñeca</em>
          </h2>
          <p className={body}>Carga manual, 72 horas de reserva. Una edición de 88 piezas que no existe: esto es un experimento.</p>
          <a href="#experimento" className="btn btn-cristal mt-8">
            Cómo está hecho
          </a>
        </Stop>
      </div>
    </section>
  );
}
