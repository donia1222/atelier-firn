// Prepara las escenas: recorta la cuadrícula de 4 viñetas, iguala tamaños a 1672×941 y exporta a WebP.
// Fuentes en media/originales (imágenes generadas con ChatGPT).
import sharp from 'sharp';

const SRC = 'media/originales';
const OUT = 'public/escenas';
const W = 1672;
const H = 941;

// Viñetas que solo existen en la cuadrícula (las otras dos se regeneraron a tamaño completo).
const panels = [
  { name: '4-volante', left: 838, top: 0 },
];

const save = (img, name) =>
  img
    .resize(W, H, { fit: 'cover', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 84 })
    .toFile(`${OUT}/${name}.webp`);

await save(sharp(`${SRC}/1-exterior.png`), '1-exterior');
await save(sharp(`${SRC}/2-banco.png`), '2-banco');
await save(sharp(`${SRC}/3-mecanismo.png`), '3-mecanismo');
await save(sharp(`${SRC}/5-cielo-en-el-volante.png`), '5-cielo-en-el-volante');
await save(sharp(`${SRC}/6-montanas.png`), '6-montanas');
await save(sharp(`${SRC}/7-ciudad.png`), '7-ciudad');
for (const p of panels) {
  const buf = await sharp(`${SRC}/3-cuadricula.png`).extract({ left: p.left, top: p.top, width: 833, height: 468 }).toBuffer();
  await save(sharp(buf), p.name);
}
console.log('escenas listas');
