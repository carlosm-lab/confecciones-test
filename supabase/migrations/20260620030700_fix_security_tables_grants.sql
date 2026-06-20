-- ================================================================
-- Migration: 20260620030700_fix_security_tables_grants
-- Problema: Las tablas site_config y security_events tenían RLS
-- activo pero no tenían table-level GRANT para los roles anon/
-- authenticated. PostgreSQL evalúa los privileges de tabla ANTES
-- de evaluar las políticas RLS. Sin GRANT, el cliente recibe
-- "permission denied" (42501) antes de que RLS pueda intervenir.
--
-- Las RLS policies ya existentes siguen siendo la capa de control
-- de acceso real — estos GRANTs solo permiten que Postgres llegue
-- a evaluarlas.
-- ================================================================

-- ── site_config ────────────────────────────────────────────────
-- anon: solo SELECT (para el proxy SSR que verifica killswitch
--       sin usuario autenticado — incluso en rutas server-side)
GRANT SELECT ON public.site_config TO anon;

-- authenticated: lectura + escritura completa
-- RLS policy 'site_config_admin_write' (cmd=ALL) restringe
-- INSERT/UPDATE/DELETE exclusivamente a users con app_metadata.role='admin'
-- RLS policy 'site_config_public_read' (cmd=SELECT, qual=true)
-- permite lectura a cualquier usuario autenticado.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_config TO authenticated;

-- ── security_events ────────────────────────────────────────────
-- anon: solo INSERT (para el endpoint /api/csp-report que recibe
--       violations CSP de visitantes no autenticados)
-- RLS policy 'security_events_public_insert' restringe el INSERT
-- solo a event_type='csp_violation' con payload no nulo.
GRANT INSERT ON public.security_events TO anon;

-- authenticated: lectura (admin) + inserción (para events del killswitch)
-- RLS policy 'security_events_admin_read' (cmd=SELECT) restringe
-- SELECT solo a users con app_metadata.role='admin'
GRANT SELECT, INSERT ON public.security_events TO authenticated;

-- ── toggle_killswitch RPC ──────────────────────────────────────
-- La función es SECURITY DEFINER (corre como postgres) pero necesita
-- EXECUTE grant para que el cliente autenticado pueda llamarla.
GRANT EXECUTE ON FUNCTION public.toggle_killswitch(boolean) TO authenticated;
