-- ================================================================
-- Migration: 20260620033000_proxy_killswitch_public_rpc
--
-- PROBLEMA: proxy.ts hacía SELECT directo a site_config con anon key.
-- Después de eliminar los grants inseguros, este SELECT fallaba
-- silenciosamente (la función isKillswitchActive retornaba false
-- en el catch, dejando el killswitch sin efecto en producción).
--
-- CORRECCIÓN: Función SECURITY DEFINER de acceso público restringido
-- que expone únicamente el estado boolean del killswitch.
-- No expone datos sensibles. No requiere autenticación.
-- Justificación: el proxy SSR necesita saber si el sitio está
-- en modo down para redirigir visitantes anónimos.
-- La respuesta (true/false) no constituye un dato sensible.
-- ================================================================

CREATE OR REPLACE FUNCTION public.get_killswitch_public()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_value TEXT;
BEGIN
  SELECT value INTO v_value
  FROM public.site_config
  WHERE key = 'killswitch_active'
  LIMIT 1;

  RETURN COALESCE(v_value, 'false') = 'true';
END;
$$;

-- REVOKE PUBLIC (default en nuevas funciones) y GRANT explícito
REVOKE EXECUTE ON FUNCTION public.get_killswitch_public() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_killswitch_public() TO anon;
GRANT EXECUTE ON FUNCTION public.get_killswitch_public() TO authenticated;
