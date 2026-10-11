export default function Pie() {
  return (
    <footer data-bg="#05070d" className="relative overflow-hidden px-6 pt-24 pb-10 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-sm text-sm text-nieve/60">
            Atelier Firn es una marca ficticia. Imágenes generadas con IA; animación con GSAP, Lenis y un poco de geometría.
          </p>
          <a href="#taller" className="btn btn-cristal self-start md:self-auto">
            Volver a entrar
          </a>
        </div>
        <p
          data-pie-marca
          aria-label="Firn"
          className="mt-16 font-display text-[34vw] leading-[0.8] font-semibold tracking-[-0.08em] md:text-[30vw]"
        >
          Firn<span className="text-laton">.</span>
        </p>
        <div className="mt-8 flex flex-col gap-2 border-t border-nieve/10 pt-6 font-mono text-[11px] tracking-wider text-nieve/45 uppercase md:flex-row md:justify-between">
          <p>Experimento de portafolio · 2026</p>
          <a href="https://lweb.ch" className="hover:text-laton" rel="noopener">
            Diseño y desarrollo: lweb.ch
          </a>
        </div>
      </div>
    </footer>
  );
}
