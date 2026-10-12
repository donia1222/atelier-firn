import Stop from './Stop';
import Dial from './Dial';
import { escenas } from '../data/escenas';

const title = 'mt-3 text-[clamp(2.1rem,6.2svh,3rem)] leading-[0.95] md:mt-4 md:text-6xl';
const body = 'mt-[min(1.25rem,2svh)] max-w-lg text-[15px] text-nieve/75 md:mt-5 md:text-lg';

export default function PortalWorld() {
  return (
    <section data-world aria-label="Rundgang durch die Werkstatt" className="relative">
      <div data-stage className="sticky top-0 h-lvh overflow-hidden bg-noche">
        {/* Primera escena como imagen normal: se ve al instante mientras el canvas carga las demás. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-poster
          src={escenas[0].src}
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          fetchPriority="high"
          className="absolute inset-0 size-full scale-[1.04] object-cover transition-opacity duration-700"
        />
        <canvas data-portal aria-hidden="true" className="absolute inset-0 size-full opacity-0 transition-opacity duration-700" />

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
        <Stop index={0} eyebrow="Atelier Firn · Uhrmacherei in den Alpen">
          <h1 className={title}>
            Zeit wird <em className="text-laton">von Hand</em> gemacht
          </h1>
          <p className={body}>Eine Werkstatt aus Stein am Fuss des Gletschers. Scrollen Sie und treten Sie durchs Fenster ein.</p>
        </Stop>

        <Stop index={1} eyebrow="Die Werkbank">
          <h2 className={title}>Vierhundert Stunden unter derselben Lampe</h2>
          <p className={body}>
            Jedes Kaliber wird an einer einzigen Werkbank montiert, reguliert und wieder zerlegt – von einer einzigen Person.
          </p>
        </Stop>

        <Stop index={2} eyebrow="Das Kaliber">
          <h2 className={title}>Zweihundert Teile in der Grösse einer Münze</h2>
          <p className={body}>Von Hand gravierte Brücken und Rubine, die nur sieht, wer den Boden öffnet.</p>
        </Stop>

        <Stop index={3} eyebrow="Die Unruh">
          <h2 className={title}>
            Sie schlägt <em className="text-laton">28'800</em> Mal pro Stunde
          </h2>
          <p className={body}>Unruh und Spirale geben den Takt vor. Sie einzustellen dauert Tage: ein Haar daneben, und die Uhr lügt.</p>
        </Stop>

        <Stop index={4} eyebrow="Die Komplikation">
          <h2 className={title}>In der Unruh: der Himmel</h2>
          <p className={body}>Das Zifferblatt Nocturne zeigt den Alpenhimmel, wie er über der Werkstatt steht – Nacht für Nacht.</p>
        </Stop>

        <Stop index={5} eyebrow="Firn Nocturne · Kaliber F-01">
          <h2 className={title}>
            Die Berge <em className="text-laton">am Handgelenk</em>
          </h2>
          <p className={body}>Handaufzug und 72 Stunden Gangreserve. Eine Edition von 88 Stück, die es nicht gibt: Das hier ist ein Experiment.</p>
        </Stop>

        <Stop index={6} eyebrow="Zurück im Dorf">
          <h2 className={title}>
            Alles beginnt und endet <em className="text-laton">hier</em>
          </h2>
          <p className={body}>Von der Werkstatt in den Himmel und zurück ans Seeufer, wo das erste Licht angeht.</p>
          <a href="#experimento" className="btn btn-cristal mt-8">
            Wie es gemacht ist
          </a>
        </Stop>
      </div>
    </section>
  );
}
