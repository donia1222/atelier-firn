# Atelier Firn · Recorrido por portales

Experimento de portafolio: un scroll world hecho con **6 imágenes generadas con ChatGPT** y sin un solo vídeo.
Atelier Firn es una marca ficticia.

```bash
npm run dev       # http://localhost:3000
npm run build     # web estática en ./out
npm run escenas   # regenera public/escenas desde media/originales
```

## Cómo funciona

Cada imagen tiene un **portal** redondo (ventana → lupa → volante → aro) y la escena siguiente es lo que hay dentro.
Al hacer scroll, `src/scripts/portal.ts`:

1. Acerca la cámara al portal de la escena actual (zoom exponencial, para que la velocidad se perciba constante).
2. Pinta la escena siguiente dentro del portal con la misma cámara, recortada con una máscara radial difuminada que se
   abre al final. Al terminar el tramo queda exactamente en su sitio, sin escalar.
3. Desenfoca y desvanece la escena actual como algo que pasa junto a la cámara.
4. Añade vida a las imágenes fijas: respiración lenta, parallax con el puntero y nieve en canvas que sale despedida
   al atravesar la ventana.

Los portales, puntos de llegada y zooms de cada tramo están en `src/data/escenas.ts`. Las coordenadas van en
fracciones de la imagen 16:9, así que cambiar una imagen solo exige volver a medir su portal.

## Imágenes

`media/originales` guarda lo que salió de ChatGPT. `4-volante` y `6-montanas` vienen de una cuadrícula de 4 viñetas y
están ampliadas al doble; si se regeneran a tamaño completo, basta con ponerlas en `media/originales` y ajustar
`scripts/escenas.mjs`.
