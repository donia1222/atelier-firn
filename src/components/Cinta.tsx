const palabras = ['Hecho a mano', '28.800 A/h', 'Valle de Firn', 'Calibre F-01', '88 piezas', 'Esfera Nocturne'];

function Fila({ invertida = false }: { invertida?: boolean }) {
  // Dos copias seguidas para que el bucle no tenga costuras.
  const items = [...palabras, ...palabras];
  return (
    <div data-cinta-fila data-invertida={invertida ? '' : undefined} className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
      {[0, 1].map((copia) => (
        <div key={copia} className="flex items-center gap-10" aria-hidden={copia === 1 ? 'true' : undefined}>
          {items.map((palabra, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:1px_var(--color-nieve)]' : ''}>{palabra}</span>
              <span className="size-3 rounded-full bg-laton" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Cinta() {
  return (
    <section data-bg="#0b0f1d" data-cinta aria-label="Atelier Firn" className="overflow-hidden py-24 font-display text-6xl font-medium tracking-[-0.05em] md:py-32 md:text-9xl">
      <div className="flex flex-col gap-4 md:gap-6">
        <Fila />
        <Fila invertida />
      </div>
    </section>
  );
}
