-- ==============================================================================
-- Migration: 20261117_security_audit_remediation.sql
-- Description: Remediación forense de seguridad (SEC-01, SEC-09, SEC-14)
-- Confecciones Liss — Database Security Hardening
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SEC-01: Corrección de RLS en push_subscriptions
-- Revoca la eliminación pública arbitraria (USING (true)) y restringe a:
-- a) Usuarios autenticados eliminando únicamente sus propias suscripciones.
-- b) Visitantes anónimos eliminando únicamente mediante coincidencia de endpoint.
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "push_sub_own_delete" ON public.push_subscriptions;
DROP POLICY IF EXISTS "push_sub_authenticated_delete" ON public.push_subscriptions;
DROP POLICY IF EXISTS "push_sub_anon_delete_by_endpoint" ON public.push_subscriptions;

CREATE POLICY "push_sub_authenticated_delete" ON public.push_subscriptions
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "push_sub_anon_delete_by_endpoint" ON public.push_subscriptions
  FOR DELETE TO anon
  USING (
    user_id IS NULL 
    AND endpoint = current_setting('request.headers', true)::json->>'x-push-endpoint'
  );

-- ------------------------------------------------------------------------------
-- 2. SEC-09: Expansión de CHECK constraint en security_events.event_type
-- Permite registrar eventos de contacto y auditoría administrativa sin fallar.
-- ------------------------------------------------------------------------------

ALTER TABLE public.security_events
  DROP CONSTRAINT IF EXISTS security_events_event_type_check;

ALTER TABLE public.security_events
  ADD CONSTRAINT security_events_event_type_check
  CHECK (
    event_type IN (
      'csp_violation',
      'rate_limit_exceeded',
      'killswitch_activated',
      'killswitch_deactivated',
      'anomaly_detected',
      'contact_rate_limit_exceeded',
      'contact_message_sent',
      'admin_featured_product_toggle'
    )
  );

-- ------------------------------------------------------------------------------
-- 3. SEC-14: Trigger en products para garantizar límite atómico de 10 destacados
-- Previene condiciones de carrera TOCTOU en toggleFeaturedProduct.
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.check_max_featured_products()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_featured = true AND (OLD.is_featured IS DISTINCT FROM true) THEN
    IF (SELECT COUNT(*) FROM public.products WHERE is_featured = true) >= 10 THEN
      RAISE EXCEPTION 'Maximum limit of 10 featured products reached.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_limit_featured_products ON public.products;
CREATE TRIGGER trg_limit_featured_products
  BEFORE INSERT OR UPDATE OF is_featured ON public.products
  FOR EACH ROW
  WHEN (NEW.is_featured = true)
  EXECUTE FUNCTION public.check_max_featured_products();
