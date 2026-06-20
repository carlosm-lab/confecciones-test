-- ================================================================
-- Migration: 20260620031500_security_admin_read_functions
--
-- PROBLEMA CORREGIDO:
--   El panel admin hacía SELECT directo a site_config y security_events
--   con el cliente browser (anon key). Las tablas solo tenían GRANTs para
--   el rol 'postgres', causando error 42501.
--
--   La solución incorrecta inicial (REVERTIDA): GRANT a anon/authenticated
--   en las tablas → quitar la chapa (reducía protección).
--
--   La solución correcta: funciones SECURITY DEFINER que:
--     1. Bypasan RLS (ejecutan como postgres)
--     2. Verifican internamente app_metadata.role = 'admin'
--     3. Lanzan RAISE EXCEPTION si no es admin
--     4. Solo authenticated puede ejecutarlas (no PUBLIC, no anon)
--
--   Este patrón es idéntico al ya existente toggle_killswitch().
--   Las tablas site_config y security_events NO reciben ningún GRANT.
-- ================================================================

-- ── get_killswitch_state ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_killswitch_state()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_value TEXT;
BEGIN
  v_role := ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text);
  IF v_role IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: admin role required';
  END IF;

  SELECT value INTO v_value
  FROM public.site_config
  WHERE key = 'killswitch_active';

  RETURN jsonb_build_object(
    'killswitch_active', COALESCE(v_value, 'false') = 'true',
    'raw_value', v_value
  );
END;
$$;

-- ── get_security_events ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_security_events(p_limit INT DEFAULT 50)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_result jsonb;
BEGIN
  v_role := ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text);
  IF v_role IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: admin role required';
  END IF;

  -- Clamp: máximo 100 eventos para prevenir dumping masivo
  p_limit := GREATEST(1, LEAST(p_limit, 100));

  SELECT jsonb_agg(row_to_json(e))
  INTO v_result
  FROM (
    SELECT id, event_type, payload, ip, user_agent, url, created_at
    FROM public.security_events
    ORDER BY created_at DESC
    LIMIT p_limit
  ) e;

  RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- ── GRANTS: solo authenticated, REVOKE PUBLIC ────────────────────
-- PUBLIC incluye anon — nunca debe poder ejecutar estas funciones
REVOKE EXECUTE ON FUNCTION public.toggle_killswitch(boolean) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_killswitch_state() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_security_events(INT) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_killswitch_state() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_security_events(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.toggle_killswitch(boolean) TO authenticated;

-- Las tablas site_config y security_events NO reciben ningún GRANT.
-- Su protección sigue siendo las políticas RLS existentes.
-- El acceso admin a estas tablas ocurre exclusivamente a través
-- de las funciones SECURITY DEFINER documentadas aquí.
