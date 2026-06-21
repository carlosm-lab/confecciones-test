# Feature: Campos SEO Manuales por Producto

**Fecha:** 2026-06-21
**Branch:** desarrollo
**Tipo:** Feature — puramente aditiva, sin regresiones

---

## Auditoría Previa

- **Archivos leídos en la Fase 1:** 100% del inventario del proyecto auditado
  - `src/data/types.ts` — tipo deprecated `Product` (inglés), no toca DB real
  - `src/lib/catalogService.ts` — `DbProduct` (tipo real) + PRODUCT_SELECT + todas las queries
  - `src/lib/productUtils.ts` — `Product` interface usada en admin modal
  - `src/lib/schemas.ts` — solo JSON-LD helpers, sin schema Zod de producto
  - `src/components/admin/ProductModal.tsx` — formulario ÚNICO de crear y editar (1222 líneas)
  - `src/components/admin/ProductTable.tsx` — tabla admin, accede a campos básicos solo
  - `src/components/catalogo/ProductDetailClient.tsx` — vista pública de detalle
  - `src/app/(public)/catalogo/[sector]/[id]/page.tsx` — `generateMetadata` + JSON-LD
  - `src/app/layout.tsx` — metadata global + fallbacks globales
  - `src/app/robots.ts` — solo reglas por userAgent global, sin conflicto
  - `src/app/sitemap.ts` — solo exporta slug + sector + updated_at, sin impacto
  - `src/context/FavoritesContext.tsx`, `CartContext.tsx`, `AuthContext.tsx` — no consumen campos SEO
  - `src/components/layout/SearchModal.tsx` — usa DbProduct para búsqueda, accede a name/slug/price/category, sin `Object.keys()` dinámico
  - `src/components/catalogo/CatalogPageClient.tsx` — fieldMap tipado con `keyof DbProduct`, ahora incluye los nuevos campos SEO en el tipo
  - Todos los demás archivos del inventario — ninguno itera `Object.keys(product)` ni consume el modelo de forma dinámica problemática

- **Conflicto con SEO automático existente:**
  - SÍ existe `generateMetadata` en `/catalogo/[sector]/[id]/page.tsx` que genera title/description/OG/Twitter automáticamente
  - Resuelto con **regla de precedencia**: `seo_title?.trim() || autoTitle`, etc.
  - Si el campo manual es null o vacío → fallback automático exactamente igual al comportamiento pre-existente
  - Zero cambio de comportamiento para productos sin campos SEO completados

- **Regla de precedencia implementada:** valor manual > fallback automático existente

---

## Modelo de Datos

**Columnas agregadas a la tabla `products`** (todas `text`, `is_nullable: YES`, `column_default: null`):

| Columna           | Tipo | Propósito                                                                     |
| ----------------- | ---- | ----------------------------------------------------------------------------- |
| `seo_title`       | text | Título SEO manual — si null: `product.name \| config.subtitle`                |
| `seo_description` | text | Meta description manual — si null: `short_description ?? description ?? name` |
| `seo_keywords`    | text | Keywords separadas por coma — si null: no se emite meta tag                   |
| `seo_robots`      | text | Directiva de indexación — si null: `index: true, follow: true`                |
| `seo_publisher`   | text | Publisher/siteName Open Graph — si null: `siteConfig.name`                    |

**Convención seguida:** `snake_case` idéntico al resto de columnas existentes (`badge_text`, `price_suffix`, `wholesale_price`, etc.)

**Patrón de keywords:** `text` separado por comas (igual que `tags` string visual), coherente con la UX de campo de texto. Los tags de la DB son arrays pero la representación SEO de keywords es string plano — estándar de facto.

**Migración aplicada:**

```sql
alter table products
  add column if not exists seo_title       text,
  add column if not exists seo_description text,
  add column if not exists seo_keywords    text,
  add column if not exists seo_robots      text,
  add column if not exists seo_publisher   text;
```

Archivo: `supabase/migrations/20260621_seo_product_fields.sql`

---

## Archivos Modificados

| Archivo                                               | Cambio                                                                                                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/catalogService.ts`                           | `DbProduct` interface + 5 campos SEO opcionales. `PRODUCT_SELECT` + campos SEO en el SELECT de todas las queries                                        |
| `src/lib/productUtils.ts`                             | `Product` interface (admin modal) + 5 campos SEO opcionales                                                                                             |
| `src/components/admin/ProductModal.tsx`               | `FormData` interface + estado inicial + efecto edición + payload de guardado + sección JSX "SEO del Producto" (verde esmeralda, tras "Producto Activo") |
| `src/app/(public)/catalogo/[sector]/[id]/page.tsx`    | `generateMetadata` actualizado con lógica de precedencia: manual → automático                                                                           |
| `supabase/migrations/20260621_seo_product_fields.sql` | Archivo de migración registrado                                                                                                                         |

---

## Archivos Verificados Sin Impacto (Fase 1, Bloque E)

| Archivo                                          | Confirmación                                                                                                                                                                             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/admin/ProductTable.tsx`          | Solo accede a `name`, `description`, `price`, `old_price`, `image_path`, `tags`, `is_active`, `id`, `categories` — SEO fields ignorados, sin ajuste necesario                            |
| `src/components/catalogo/CatalogPageClient.tsx`  | `fieldMap: Record<string, keyof DbProduct>` mapea solo `tipo`, `tallas`, `categoria`, `sector` — los nuevos campos SEO no interfieren, TypeScript los incluye automáticamente en el tipo |
| `src/components/catalogo/CatalogProductCard.tsx` | Solo renderiza `name`, `price`, `images`, `badge_text`, `tallas`, `slug` — sin impacto                                                                                                   |
| `src/components/layout/SearchModal.tsx`          | Usa `DbProduct` para resultados de búsqueda, accede a `name`, `slug`, `sector`, `category`, `price`, `images` — sin impacto                                                              |
| `src/context/FavoritesContext.tsx`               | Solo maneja arrays de product IDs — sin impacto                                                                                                                                          |
| `src/context/CartContext.tsx`                    | Usa un subset mínimo del producto (id, name, price, image_path, slug) — sin impacto                                                                                                      |
| `src/app/robots.ts`                              | Solo reglas globales por userAgent — no entra en conflicto con `seo_robots` por producto (que opera vía `generateMetadata.robots`)                                                       |
| `src/app/sitemap.ts`                             | Solo exporta slug + sector + updated_at — sin impacto                                                                                                                                    |
| `src/lib/schemas.ts`                             | Sin schema Zod de producto — no requería actualización                                                                                                                                   |
| `src/schemas/contactSchema.ts`                   | Schema de contacto, sin relación con productos                                                                                                                                           |

---

## Diseño Visual de la Sección SEO

- **Posición:** Después de "Producto Activo" (última sección existente), antes del footer del modal
- **Estilo:** Caja verde esmeralda con borde `border-emerald-200 bg-emerald-50` — coherente con el patrón de la caja azul "Precios Especiales" (`border-blue-200 bg-blue-50`) y la caja ámbar "Configuración de Oferta" — sin CSS nuevo
- **Icono:** `manage_search` (Material Symbols) — igual patrón que `payments` en Precios Especiales
- **Label "Opcional":** mismo patrón que la caja Precios Especiales
- **X-Robots-Tag:** botones seleccionables (mismo patrón visual que "Tallas Disponibles")
- **Contadores de caracteres:** título (70 chars), descripción (160 chars)
- **Placeholders explicativos:** todos informan sobre el fallback automático

---

## Verificación de Diseño Preservado

- Captura de referencia (`screencapture-localhost-3000-admin-products-2026-06-20-23_18_14.png`) comparada
- Secciones existentes intactas: Nombre, URL/Slug, Descripción, Precio, Precio Anterior, Configuración de Oferta, Precios Especiales, Catálogo, Categoría, Imágenes, Datos del Catálogo Público, Etiquetas, Producto Activo
- Sin alteración de estilos, orden ni comportamiento de ninguna sección existente

---

## Verificación Funcional

- Producto sin SEO manual: `seo_*` = null → `generateMetadata` produce exactamente el mismo output que antes de esta feature ✓
- Producto con SEO manual completo: metadata pública refleja los valores manuales ✓
- Producto con SEO manual parcial: cada campo individual respeta su propio fallback ✓
- Formulario de edición: mismo componente que creación (`ProductModal`) — actualizado consistentemente ✓
- Payload guardado con `null` para campos vacíos (misma lógica que `labor_price`, `badge_text`, etc.) ✓
- TypeScript: `npx tsc --noEmit` → 0 errores ✓

---

## Consolas

- TypeScript: 0 errores ✓
- Next.js terminal: verificado post-build ✓
- Supabase: migración aplicada con `add column if not exists` — sin triggers, sin constraints, sin RLS que interfiera (`products_admin_all` aplica ALL = acepta nuevas columnas sin cambios) ✓
