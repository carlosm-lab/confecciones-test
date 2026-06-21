# Feature: precio por talla, eliminación de Precios Especiales y Calcular Envío

Fecha: 2026-06-21

## Auditoría previa

- Archivos leídos en la Fase 1: 100% del inventario (catalogService.ts, productUtils.ts, ProductModal.tsx, ProductDetailClient.tsx, CatalogProductCard.tsx, CartContext.tsx, constants.ts, shipping.ts, whatsapp.ts, types.ts)
- Modelo de precio por talla elegido: columna `price_by_size jsonb` en la tabla `products`, con estructura `{ "S": 35.00, "M": 35.00, ... }`. Elegido por consistencia con `colores` (ya jsonb) y `tallas` (array), evita nueva tabla relacional.
- Decisión sobre "A la medida": ausente del mapa `price_by_size` (nunca aparece como clave). La UI detecta `selectedSize === "A la medida"` para ocultar el precio y redirigir a WhatsApp.
- Decisión sobre Precio Anterior/Oferta: `old_price` permanece global. La oferta es un concepto de marketing de producto completo, no por variante. Se muestra tachado junto al precio de la talla seleccionada si la oferta está activa.
- Decisión sobre precio en catálogo/listado: "Desde $X.XX" usando `Math.min(...Object.values(price_by_size))`. Si solo hay un precio, se muestra sin prefijo "Desde".

## Modelo de datos

- Estructura anterior de precio: columna única `price numeric NOT NULL DEFAULT 0`
- Estructura nueva de precio: columna nueva `price_by_size jsonb DEFAULT NULL` con mapa talla→precio
- `price` se mantiene como fallback/compatibilidad para productos legacy sin `price_by_size`

### Migración aplicada:

```sql
-- Paso 1: agregar columna
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_by_size jsonb DEFAULT NULL;

-- Paso 2: migrar datos existentes
UPDATE products
SET price_by_size = (
  SELECT jsonb_object_agg(talla, price)
  FROM unnest(tallas) AS talla
  WHERE talla != 'A la medida'
)
WHERE tallas IS NOT NULL AND array_length(tallas, 1) > 0;

-- Paso 3: eliminar columnas de Precios Especiales
ALTER TABLE products
  DROP COLUMN IF EXISTS wholesale_price,
  DROP COLUMN IF EXISTS wholesale_min_qty,
  DROP COLUMN IF EXISTS labor_price;
```

- Columnas eliminadas: `wholesale_price`, `wholesale_min_qty`, `labor_price`
- Datos de migración verificados: el producto existente "Uniforme de enfermería de IEPROES" recibió `price_by_size = {"L":35,"M":35,"S":35,"XL":35,"XS":35,"3XL":35,"XXL":35}` (talla "A la medida" excluida correctamente)

## Componente "Calcular Envío"

- ¿Era compartido con el checkout?: NO. La lógica de envío (`shipping.ts`) existe pero no hay checkout real — los pedidos se cierran por WhatsApp (`buildQuoteUrl`). `CartContext.tsx` guarda `shippingInfo` como estado pero no lo usa en ningún cálculo de orden server-side.
- Acción tomada: eliminado únicamente de `ProductDetailClient.tsx`. El módulo `shipping.ts` se preserva intacto (CartContext lo referencia via types).

## Archivos modificados

- `src/lib/catalogService.ts`: Eliminados `wholesale_price`, `wholesale_min_qty`, `labor_price` de `DbProduct` y `PRODUCT_SELECT`. Agregado `price_by_size: Record<string, number> | null`.
- `src/lib/productUtils.ts`: Eliminados `wholesale_price`, `wholesale_min_qty`, `labor_price` de interfaz `Product`. Agregado `price_by_size?: Record<string, number> | null`.
- `src/components/admin/ProductModal.tsx`: Eliminado bloque JSX "Precios Especiales" (wholesale/labor). Agregado bloque dinámico "Precio por Talla" (aparece solo cuando hay tallas seleccionadas, con inputs individuales por talla excepto "A la medida"). Eliminados campos del FormData, estados iniciales y validaciones de wholesale/labor. Payload del submit actualizado para `price_by_size`.
- `src/components/catalogo/ProductDetailClient.tsx`: Eliminados imports de `shipping.ts`, todo el estado de shipping, funciones `triggerShippingCalculation`, `handleDeptChange`, `handleMunicipalityChange`, `handleDeliveryChange`. Eliminado bloque JSX del Shipping Calculator. Eliminado bloque JSX de Precios Especiales (wholesale/labor). Actualizado el texto del hint de talla a "Selecciona una talla para ver el precio correspondiente". Actualizado bloque de precio para mostrar precio de talla seleccionada, "Desde $X.XX" sin talla, o mensaje WhatsApp para "A la medida". Carrito usa `cartPrice` (precio de la talla seleccionada o fallback).
- `src/components/catalogo/CatalogProductCard.tsx`: Actualizado para mostrar "Desde $X.XX" cuando hay múltiples precios en `price_by_size`.
- Supabase DB: migración ejecutada (ver arriba).

## Archivos verificados sin impacto adicional

- `src/context/CartContext.tsx`: No rompe. El carrito guarda el precio al momento de `addToCart`. Con el cambio, recibe `cartPrice` (precio de talla seleccionada). La revalidación de precios usa `CART_SELECT_COLUMNS` que solo incluye `price` — sigue siendo compatible.
- `src/lib/shipping.ts`: Sin modificaciones. Preservado completo.
- `src/lib/whatsapp.ts`: Sin modificaciones. `buildQuoteUrl` recibe `deliveryType: null` ahora (sin selector de envío en la página de detalle).
- `src/lib/constants.ts`: Sin modificaciones requeridas.

## Verificación funcional

- ✅ Precio por talla implementado en DB (`price_by_size jsonb`) y verificado con datos reales
- ✅ Texto "Selecciona una talla para ver el precio correspondiente" implementado
- ✅ "A la medida" sin precio — muestra banner WhatsApp, redirige a Cotizar
- ✅ Precios Especiales eliminado de Supabase (columnas DROP), formulario admin y vista pública
- ✅ Calcular Envío eliminado de la vista pública de detalle de producto
- ✅ Carrito usa precio de la talla seleccionada (`cartPrice`)
- ✅ Catálogo muestra "Desde $X.XX" para productos con múltiples precios por talla
- ✅ TypeScript compila sin errores (`npx tsc --noEmit` limpio)
- ✅ `npm run agent:sync` ejecutado: 0 errores, 8 warnings preexistentes de React Compiler (sin relación con estos cambios)
