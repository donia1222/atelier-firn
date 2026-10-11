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
    alt: 'Taller de relojería de piedra en un pueblo alpino nevado, con una gran ventana redonda iluminada',
    lugar: 'El taller',
    nota: 'Un taller de piedra al pie del glaciar, con la luz encendida.',
  },
  {
    id: 'banco',
    src: '/escenas/2-banco.webp',
    alt: 'Banco de relojero bajo una lámpara de latón, con una lupa en el centro y el lago nevado al fondo',
    lugar: 'El banco',
    nota: 'Cuatrocientas horas de trabajo bajo la misma lámpara.',
  },
  {
    id: 'calibre',
    src: '/escenas/3-mecanismo.webp',
    alt: 'Mecanismo de reloj visto a través de la lupa: puentes grabados, engranajes y rubíes',
    lugar: 'El calibre',
    nota: 'Doscientas doce piezas vistas a través de la lupa.',
  },
  {
    id: 'volante',
    src: '/escenas/4-volante.webp',
    alt: 'Volante dorado del reloj con su espiral, muy de cerca',
    lugar: 'El volante',
    nota: 'El corazón del reloj: 28.800 alternancias por hora.',
  },
  {
    id: 'cielo',
    src: '/escenas/5-cielo-en-el-volante.webp',
    alt: 'El aro del volante enmarca un cielo estrellado sobre montañas nevadas',
    lugar: 'El cielo',
    nota: 'Dentro del volante, el cielo de los Alpes.',
  },
  {
    id: 'nocturne',
    src: '/escenas/6-montanas.webp',
    alt: 'Vía Láctea sobre los Alpes nevados y un lago iluminado en el valle',
    lugar: 'Nocturne',
    nota: 'La esfera Nocturne: montañas, nubes y estrellas.',
  },
  {
    id: 'pueblo',
    src: '/escenas/7-ciudad.webp',
    alt: 'El pueblo junto al lago al anochecer, con la torre de la iglesia iluminada y las luces reflejadas en el agua',
    lugar: 'El pueblo',
    nota: 'De vuelta a la orilla del lago, donde empezó todo.',
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
