-- ============================================================
-- MIGRATION: Limpieza categorias universitario + arquitectura correcta
-- Archivo: 20260627_categories_university_column.sql
-- ============================================================
-- Razon: El hub /catalogo/universidades NO es un catalogo con categorias.
-- Cada universidad tiene su propio catalog en la DB:
--   catalog = ''univo''  para carreras de UNIVO
--   catalog = ''ugb''    para carreras de UGB
--   etc.
--
-- Se eliminan las categorias erroneas con catalog=''universitario''.
-- ============================================================

-- Eliminar categorias mal asignadas al hub universitario
DELETE FROM categories WHERE catalog = ''universitario'';

-- Verificar
SELECT COUNT(*) as debe_ser_cero FROM categories WHERE catalog = ''universitario'';
