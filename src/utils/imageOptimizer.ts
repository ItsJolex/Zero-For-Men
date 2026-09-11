/**
 * Utilidad de optimización y conversión de imágenes en el cliente (Browser Canvas).
 * Convierte formatos PNG, JPG, JPEG, WEBP a WebP optimizado (< 50 KB típico),
 * redimensionando a un tamaño máximo manteniendo la relación de aspecto.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  originalSizeKB: number;
  optimizedSizeKB: number;
  savedPercent: number;
  originalFormat: string;
  width: number;
  height: number;
}

export async function optimizeImageToWebP(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.82
): Promise<OptimizedImageResult> {
  const originalSizeKB = Math.max(1, Math.round(file.size / 1024));
  const originalFormat = file.type.replace('image/', '').toUpperCase() || 'UNKNOWN';

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Mantener relación de aspecto calculando nueva dimensión máxima
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el contexto de Canvas 2D'));
          return;
        }

        // Renderizado nítido
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar a WebP
        const dataUrl = canvas.toDataURL('image/webp', quality);

        // Calcular tamaño aproximado del Data URI base64
        // Cada 4 caracteres base64 representan 3 bytes
        const base64Length = dataUrl.length - 'data:image/webp;base64,'.length;
        const optimizedSizeBytes = Math.round((base64Length * 3) / 4);
        const optimizedSizeKB = Math.max(1, Math.round(optimizedSizeBytes / 1024));

        const savedPercent = originalSizeKB > optimizedSizeKB 
          ? Math.round(((originalSizeKB - optimizedSizeKB) / originalSizeKB) * 100)
          : 0;

        resolve({
          dataUrl,
          originalSizeKB,
          optimizedSizeKB,
          savedPercent,
          originalFormat,
          width,
          height
        });
      };

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen en memoria'));
      };

      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error('Error al leer el archivo'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo en el navegador'));
    };

    reader.readAsDataURL(file);
  });
}
