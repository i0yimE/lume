// Genera URLs de fotos de stock reales y temáticas (vía LoremFlickr, sin API
// key) en vez de imágenes aleatorias sin relación con el producto. `lock`
// fija siempre la misma foto para un mismo valor, para que no cambie en
// cada build.
export function stockImage(width: number, height: number, keywords: string[], lock: number) {
  return `https://loremflickr.com/${width}/${height}/${keywords.join(",")}?lock=${lock}`;
}
