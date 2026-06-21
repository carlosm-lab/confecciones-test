-- =============================================================
-- Migración: Sistema de Notificaciones
-- Fecha: 2026-06-20
-- Descripción: Tablas para el sistema unificado de notificaciones
--              (in-app + Web Push) para guests y usuarios logueados.
-- =============================================================

-- ── 1. notifications — tabla global de notificaciones ─────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  type          TEXT        NOT NULL CHECK (
    type IN (
      'manual',           -- enviada manualmente por el admin
      'new_product',      -- nuevo producto publicado
      'new_offer',        -- nueva oferta activada
      'push_permission',  -- invitación a activar notificaciones push
      'auth_hint',        -- invitación a iniciar sesión (favoritos/carrito)
      'info'              -- genérica
    )
  ),
  title         TEXT        NOT NULL,
  message       TEXT        NOT NULL,
  image_url     TEXT,                -- imagen del producto/oferta (opcional)
  target_url    TEXT,                -- URL a la que navega al hacer click
  product_id    UUID        REFERENCES public.products(id) ON DELETE SET NULL,
  -- si es false: solo in-app. Si es true: se envió Web Push también
  push_sent     BOOLEAN     NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at    TIMESTAMPTZ          -- si NULL: no expira
);

-- índices de consulta frecuente
CREATE INDEX IF NOT EXISTS idx_notifications_type_created
  ON public.notifications (type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_created_desc
  ON public.notifications (created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante puede leer notificaciones (in-app para guests)
CREATE POLICY "notifications_public_read" ON public.notifications
  FOR SELECT TO public USING (true);

-- Solo admins pueden insertar / actualizar / eliminar
CREATE POLICY "notifications_admin_write" ON public.notifications
  FOR ALL TO authenticated
  USING     (((auth.jwt() -> 'app_metadata') ->> 'role') = 'admin')
  WITH CHECK (((auth.jwt() -> 'app_metadata') ->> 'role') = 'admin');

-- ── 2. user_notification_reads — leídas por usuario logueado ──
CREATE TABLE IF NOT EXISTS public.user_notification_reads (
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_id UUID        NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  read_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, notification_id)
);

CREATE INDEX IF NOT EXISTS idx_unr_user_id
  ON public.user_notification_reads (user_id);

ALTER TABLE public.user_notification_reads ENABLE ROW LEVEL SECURITY;

-- El usuario logueado gestiona sus propias lecturas
CREATE POLICY "unr_own_read" ON public.user_notification_reads
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "unr_own_insert" ON public.user_notification_reads
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "unr_own_delete" ON public.user_notification_reads
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Admins pueden leer todas (para analytics)
CREATE POLICY "unr_admin_read" ON public.user_notification_reads
  FOR SELECT TO authenticated
  USING (((auth.jwt() -> 'app_metadata') ->> 'role') = 'admin');

-- ── 3. push_subscriptions — suscriptores Web Push ─────────────
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint    TEXT        NOT NULL UNIQUE,
  p256dh      TEXT        NOT NULL,
  auth        TEXT        NOT NULL,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_push_sub_user
  ON public.push_subscriptions (user_id);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante puede insertar su propia suscripción
CREATE POLICY "push_sub_public_insert" ON public.push_subscriptions
  FOR INSERT TO public
  WITH CHECK (true);

-- Cada usuario solo ve su suscripción; anónimos no pueden leer
CREATE POLICY "push_sub_own_select" ON public.push_subscriptions
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Pueden eliminar su propia suscripción
CREATE POLICY "push_sub_own_delete" ON public.push_subscriptions
  FOR DELETE TO public
  USING (true);

-- Admins ven todas
CREATE POLICY "push_sub_admin_all" ON public.push_subscriptions
  FOR ALL TO authenticated
  USING     (((auth.jwt() -> 'app_metadata') ->> 'role') = 'admin')
  WITH CHECK (((auth.jwt() -> 'app_metadata') ->> 'role') = 'admin');

-- ── 4. Habilitar Realtime en notifications ────────────────────
-- Permite que los clientes reciban INSERTs en tiempo real vía SSE
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
