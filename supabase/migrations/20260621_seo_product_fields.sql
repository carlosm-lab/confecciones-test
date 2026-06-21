-- ────────────────────────────────────────────────────────────────
-- MIGRATION: Campos SEO manuales por producto
-- Fecha: 2026-06-21
-- Tipo: Puramente ADITIVA — ninguna columna existente es modificada.
-- Todas las columnas nuevas son nullable y sin default.
-- Impacto en productos existentes: CERO (siguen igual, sin campos SEO = fallback automático).
-- ────────────────────────────────────────────────────────────────

alter table products
  add column if not exists seo_title       text,
  add column if not exists seo_description text,
  add column if not exists seo_keywords    text,
  add column if not exists seo_robots      text,
  add column if not exists seo_publisher   text;

-- Comentarios de documentación
comment on column products.seo_title       is 'Título SEO manual. Si null, generateMetadata usa product.name + subtitle automáticamente.';
comment on column products.seo_description is 'Meta description manual. Si null, usa short_description ?? description ?? name.';
comment on column products.seo_keywords    is 'Keywords SEO separadas por coma. Si null, no se emite el meta tag keywords.';
comment on column products.seo_robots      is 'Directiva X-Robots-Tag: "index, follow" | "noindex, follow" | "index, nofollow" | "noindex, nofollow". Si null, default = index, follow.';
comment on column products.seo_publisher   is 'Publisher/siteName manual para Open Graph. Si null, usa siteConfig.name.';
