// Las seis escenas del recorrido. Imágenes generadas con ChatGPT (originales en media/originales,
// preparadas con scripts/escenas.mjs).
//
// Coordenadas en fracciones de la imagen 16:9: `x` del ancho, `y` del alto y los radios en fracciones del ancho.
// `portal` es la abertura por la que se entra a la escena siguiente; `llegada` es el punto de la escena siguiente
// que queda dentro de ese portal, y `zoom` cuánto se acerca la cámara en el tramo.

export type Punto = { x: number; y: number };

export type Escena = {
  id: string;
  src: string;
  alt: string;
  lugar: string;
  nota: string;
};

export type Tramo = {
  portal: Punto & { r: number };
  llegada: Punto;
  zoom: number;
  /** Radio del círculo por el que se ve la escena siguiente al empezar, en su propio marco. Por defecto, el del
   *  portal limitado a la mitad del alto del marco; más grande solo si las dos imágenes se parecen en el borde. */
  apertura?: number;
};

export const escenas: Escena[] = [
  {
    id: 'taller',
    src: '/escenas/1-exterior.webp',
    alt: 'Steinerne Uhrmacherwerkstatt in einem verschneiten Alpendorf, mit einem grossen, beleuchteten Rundfenster',
    lugar: 'Die Werkstatt',
    nota: 'Eine Werkstatt aus Stein am Fuss des Gletschers, das Licht brennt.',
  },
  {
    id: 'banco',
    src: '/escenas/2-banco.webp',
    alt: 'Uhrmacher-Werkbank unter einer Messinglampe, eine Lupe in der Mitte, dahinter der verschneite See',
    lugar: 'Die Werkbank',
    nota: 'Vierhundert Arbeitsstunden unter derselben Lampe.',
  },
  {
    id: 'calibre',
    src: '/escenas/3-mecanismo.webp',
    alt: 'Uhrwerk durch die Lupe gesehen: gravierte Brücken, Zahnräder und Rubine',
    lugar: 'Das Kaliber',
    nota: 'Zweihundertzwölf Teile, durch die Lupe gesehen.',
  },
  {
    id: 'volante',
    src: '/escenas/4-volante.webp',
    alt: 'Goldene Unruh mit Spirale, ganz nah',
    lugar: 'Die Unruh',
    nota: "Das Herz der Uhr: 28'800 Halbschwingungen pro Stunde.",
  },
  {
    id: 'cielo',
    src: '/escenas/5-cielo-en-el-volante.webp',
    alt: 'Der Reif der Unruh rahmt einen Sternenhimmel über verschneiten Bergen',
    lugar: 'Der Himmel',
    nota: 'In der Unruh: der Himmel über den Alpen.',
  },
  {
    id: 'nocturne',
    src: '/escenas/6-montanas.webp',
    alt: 'Milchstrasse über den verschneiten Alpen und ein beleuchteter See im Tal',
    lugar: 'Nocturne',
    nota: 'Das Zifferblatt Nocturne: Berge, Wolken und Sterne.',
  },
  {
    id: 'pueblo',
    src: '/escenas/7-ciudad.webp',
    alt: 'Das Dorf am See in der Dämmerung, mit beleuchtetem Kirchturm und Lichtern, die sich im Wasser spiegeln',
    lugar: 'Das Dorf',
    nota: 'Zurück am Seeufer, wo alles begann.',
  },
];

// tramos[i] lleva de escenas[i] a escenas[i + 1].
export const tramos: Tramo[] = [
  // Por la ventana redonda, al banco de trabajo.
  { portal: { x: 0.496, y: 0.494, r: 0.145 }, llegada: { x: 0.5, y: 0.52 }, zoom: 3.2 },
  // Por la lente de la lupa, al mecanismo.
  { portal: { x: 0.4995, y: 0.6, r: 0.05 }, llegada: { x: 0.5, y: 0.5 }, zoom: 7 },
  // Del volante pequeño al mismo volante de cerca.
  { portal: { x: 0.495, y: 0.436, r: 0.174 }, llegada: { x: 0.475, y: 0.522 }, zoom: 1.67 },
  // Dentro del volante aparece el cielo.
  { portal: { x: 0.475, y: 0.522, r: 0.29 }, llegada: { x: 0.496, y: 0.47 }, zoom: 1.08, apertura: 0.32 },
  // A través del aro, a las montañas: el horizonte del aro coincide con el de la imagen final.
  { portal: { x: 0.496, y: 0.47, r: 0.28 }, llegada: { x: 0.55, y: 0.26 }, zoom: 1.8, apertura: 0.42 },
  // Bajando a las luces del lago, de vuelta al pueblo del principio.
  { portal: { x: 0.52, y: 0.715, r: 0.07 }, llegada: { x: 0.508, y: 0.6 }, zoom: 5 },
];
