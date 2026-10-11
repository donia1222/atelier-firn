import PortalWorld from '../components/PortalWorld';
import Experimento from '../components/Experimento';

export default function Home() {
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-5 md:px-8 md:pt-7">
        <a href="#taller" className="pointer-events-auto font-display text-3xl leading-none tracking-tight">
          Firn<span className="text-laton">.</span>
        </a>
        <a href="https://lweb.ch" className="btn btn-cristal pointer-events-auto" rel="noopener">
          Un experimento de lweb.ch
        </a>
      </header>
      <main>
        <PortalWorld />
        <Experimento />
      </main>
      <footer className="px-6 pt-8 pb-12 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-nieve/10 pt-8 text-xs text-nieve/50 md:flex-row md:justify-between">
          <p>Atelier Firn es una marca ficticia. Imágenes generadas con IA.</p>
          <p>Diseño y desarrollo: lweb.ch · Next.js, GSAP y Lenis</p>
        </div>
      </footer>
    </>
  );
}
