# Estado de Open Graph Images

> Imágenes OG generadas como capturas reales de pantalla (1200×630 px).
> Carpeta fuente: `/OG/`
> Implementación: archivos estáticos `opengraph-image.png` en cada directorio de ruta.
> Next.js App Router los sirve automáticamente sin código adicional.

---

## ✅ Páginas con OG implementada

| Ruta         | Archivo fuente     | Directorio de implementación                     |
| ------------ | ------------------ | ------------------------------------------------ |
| `/` (Home)   | `OG/home.png`      | `src/app/(public)/opengraph-image.png`           |
| `/catalogo`  | `OG/catalogo.png`  | `src/app/(public)/catalogo/opengraph-image.png`  |
| `/contacto`  | `OG/contacto.png`  | `src/app/(public)/contacto/opengraph-image.png`  |
| `/links`     | `OG/enlaces.png`   | `src/app/(public)/links/opengraph-image.png`     |
| `/servicios` | `OG/servicios.png` | `src/app/(public)/servicios/opengraph-image.png` |
| `/updates`   | `OG/updates.png`   | `src/app/(public)/updates/opengraph-image.png`   |

---

## ❌ Páginas sin OG (pendientes)

| Ruta                      | Motivo                                  | Cómo agregar                                                                     |
| ------------------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| `/catalogo/[sector]`      | Ruta dinámica — una imagen por sector   | Captura cada sector, nombrar `OG/sector-[nombre].png` e implementar              |
| `/catalogo/[sector]/[id]` | Ruta dinámica — una imagen por producto | Captura cada producto, implementar en `src/app/(public)/catalogo/[sector]/[id]/` |
| `/carrito`                | Página sin captura                      | Capturar y agregar como `OG/carrito.png`                                         |
| `/mi-cuenta`              | Página sin captura                      | Capturar y agregar como `OG/mi-cuenta.png`                                       |

---

## Instrucciones para agregar una OG nueva

1. Tomar captura del navegador a **1200 × 630 px**
2. Guardar el archivo en `/OG/` con nombre descriptivo (ej. `sector-scrubs.png`)
3. Copiar al directorio de la ruta como `opengraph-image.png`:
   ```
   # Ejemplo para /catalogo/scrubs
   cp OG/sector-scrubs.png src/app/(public)/catalogo/scrubs/opengraph-image.png
   ```
4. Para rutas dinámicas (`[sector]`, `[id]`), crear la subcarpeta correspondiente
5. Commit: `feat(og): add opengraph image for [ruta]`
6. Actualizar este documento

---

## Notas técnicas

- **Formato aceptado:** `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`
- **Dimensión óptima:** `1200 × 630 px` (ratio 1.91:1)
- **Dimensión actual de capturas:** ~1900 × 1077 px (ratio ≈ 1.77:1) — funciona pero no es el estándar exacto
- **Twitter/X:** usa `opengraph-image.png` como fallback automático si no existe `twitter-image.png`
- **Las rutas dinámicas** (`[sector]`, `[id]`) requieren un archivo por cada variante o un generador `.tsx`
