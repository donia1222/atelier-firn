const cifras = [
  { valor: 28800, sufijo: '', texto: 'Halbschwingungen pro Stunde' },
  { valor: 212, sufijo: '', texto: 'Bauteile im Kaliber F-01' },
  { valor: 72, sufijo: ' h', texto: 'Gangreserve' },
  { valor: 88, sufijo: '', texto: 'Stück in der ganzen Edition' },
];

// Espiral del volante: una espiral de Arquímedes aproximada con muchos puntos.
const espiral = (() => {
  let d = '';
  for (let i = 0; i <= 720; i++) {
    const a = (i / 720) * Math.PI * 2 * 9;
    const r = 14 + (i / 720) * 92;
    const x = 200 + Math.cos(a) * r;
    const y = 200 + Math.sin(a) * r;
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
})();

function Volante() {
  return (
    <svg viewBox="0 0 400 400" className="size-full" aria-hidden="true">
      <g data-volante style={{ transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="168" fill="none" stroke="currentColor" strokeWidth="14" />
        <circle cx="200" cy="200" r="156" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {[0, 120, 240].map((angulo) => (
          <g key={angulo} transform={`rotate(${angulo} 200 200)`}>
            <rect x="196" y="38" width="8" height="150" rx="4" fill="currentColor" />
            <circle cx="200" cy="40" r="11" fill="currentColor" />
            <circle cx="200" cy="40" r="5" className="fill-[#7a1f3d]" />
          </g>
        ))}
      </g>
      <path data-espiral d={espiral} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" pathLength={1} />
      <circle cx="200" cy="200" r="26" fill="currentColor" />
      <circle cx="200" cy="200" r="11" className="fill-[#9b2448]" />
    </svg>
  );
}

export default function Cifras() {
  return (
    <section data-bg="#140e08" data-cifras aria-labelledby="cifras-titulo" className="relative overflow-hidden px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[520px] text-laton">
          <div className="absolute inset-0 rounded-full bg-laton/10 blur-3xl" />
          <Volante />
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-laton uppercase">Kaliber F-01</p>
          <h2 id="cifras-titulo" data-split className="mt-4 text-5xl leading-[0.95] md:text-7xl">
            Ein Herz, das <em className="text-laton">nie ruht</em>
          </h2>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12">
            {cifras.map((cifra) => (
              <div key={cifra.texto} data-reveal className="flex flex-col-reverse gap-2 border-t border-nieve/15 pt-5">
                <dt className="text-sm text-nieve/60">{cifra.texto}</dt>
                <dd className="font-mono text-4xl font-light tracking-tight tabular-nums md:text-6xl">
                  <span data-contador={cifra.valor}>0</span>
                  {cifra.sufijo}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
