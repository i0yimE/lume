// Fotos reales curadas de Unsplash (licencia Unsplash: uso libre) en vez de
// imágenes de stock aleatorias. `id` es el ID de foto de Unsplash.
export function unsplashImage(id: string, width: number, height: number) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}
