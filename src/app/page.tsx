import PortalWorld from '../components/PortalWorld';
import Manifiesto from '../components/Manifiesto';
import Galeria from '../components/Galeria';
import Revelado from '../components/Revelado';
import Cifras from '../components/Cifras';
import Cinta from '../components/Cinta';
import ComoSeHizo from '../components/ComoSeHizo';
import Pie from '../components/Pie';

export default function Home() {
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-5 md:px-8 md:pt-7">
        <a href="#taller" className="pointer-events-auto font-display text-2xl font-semibold leading-none tracking-[-0.06em]">
          Firn<span className="text-laton">.</span>
        </a>
        <a href="https://lweb.ch" className="btn btn-cristal pointer-events-auto" rel="noopener">
          Ein Experiment von lweb.ch
        </a>
      </header>
      <main>
        <PortalWorld />
        <Manifiesto />
        <Galeria />
        <Revelado />
        <Cifras />
        <Cinta />
        <ComoSeHizo />
      </main>
      <Pie />
      {/* Grano fino sobre toda la página: le quita el aspecto plano a los fondos de color. */}
      <div aria-hidden="true" className="grano pointer-events-none fixed inset-0 z-[60]" />
    </>
  );
}
