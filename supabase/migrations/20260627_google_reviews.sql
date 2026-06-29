-- ────────────────────────────────────────────────────────────────
-- MIGRATION: Creación de tabla google_reviews e inserción de datos reales
-- Fecha: 2026-06-27
-- ────────────────────────────────────────────────────────────────

create table if not exists google_reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  comment text,
  rating integer not null check (rating >= 1 and rating <= 5),
  author_avatar text,
  created_at timestamptz not null default now()
);

-- Habilitar RLS
alter table google_reviews enable row level security;

-- Política de lectura pública (cualquier usuario anónimo puede leer)
create policy "Permitir lectura pública de reseñas de Google" 
  on google_reviews 
  for select 
  using (true);

-- Insertar las 3 reseñas reales de Google Maps
insert into google_reviews (author_name, comment, rating, created_at)
values 
  ('Iris M.', 'Uniformes confeccionados a la perfección', 5, '2026-05-15 10:00:00-06'),
  ('RUTH MEJIA', 'Excelente calidad, me encanta su trabajo y sobre todo la responsabilisad', 5, '2026-06-10 14:30:00-06'),
  ('Erick Salvador', 'Excelente atención y calidad en la confección de uniformes.', 5, '2026-06-20 09:15:00-06')
on conflict do nothing;
