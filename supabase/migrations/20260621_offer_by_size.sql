-- ────────────────────────────────────────────────────────────────
-- MIGRATION: Oferta independiente por talla (offer_by_size)
-- Fecha: 2026-06-21
-- Tipo: ADITIVA — agrega columna offer_by_size jsonb.
-- NO elimina price ni old_price (se mantienen como campos calculados/legacy).
-- Impacto en productos existentes: CERO (offer_by_size = null = sin oferta).
-- ────────────────────────────────────────────────────────────────

-- Agregar columna offer_by_size: mapa { talla: precio_oferta }
-- Solo aparecen las tallas que tienen oferta activa.
-- Estructura paralela a price_by_size: { "M": 30.00, "XL": 28.00 }
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS offer_by_size jsonb DEFAULT NULL;

-- Comentario de documentación
COMMENT ON COLUMN products.offer_by_size IS
  'Oferta opcional por talla. Mapa { talla: precio_oferta } — solo aparecen las tallas con oferta. Null = sin oferta en ninguna talla. La temporalidad (offer_starts_at, offer_ends_at) sigue siendo el interruptor global de vigencia.';
