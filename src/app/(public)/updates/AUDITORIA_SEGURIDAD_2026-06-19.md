# Auditoría Completa de Seguridad — Confecciones Liss

**Fecha:** 2026-06-19  
**Ejecutada por:** Agente AI (Auditor + Pentester + Ingeniero de Seguridad)  
**Duración:** Sesión completa — fases 0 a 6  
**Resultado final:** ✅ TODOS los hallazgos corregidos de raíz. Build exitoso. Sin regresiones.

---

## Alcance Probado

- **Estados de usuario:** Deslogueado, usuario regular (carlosmolina.privado@gmail.com), admin (carlosmolina.contact@gmail.com), cross-rol
- **Superficies:** Auth, Autorización/IDOR, RLS tabla por tabla, Storage, Inputs/XSS (dangerouslySetInnerHTML), Lógica de negocio, Cabeceras HTTP, Funciones RPC, Historial de git

---

## Hallazgos Encontrados — Registro Maestro Completo

### SEC-001 — CRÍTICO: Escalación de Privilegios vía profiles_self_update

**Categoría:** Autorización / RLS  
**Estado probado:** Usuario autenticado regular  
**Vector exacto:**

```sql
-- Cualquier usuario autenticado podía ejecutar vía Supabase JS SDK:
supabase.from('profiles').update({ rol: 'admin' }).eq('id', auth.uid())
```

**Severidad:** CRÍTICA  
**Evidencia:** Política `profiles_self_update` con `USING (auth.uid() = id)` y `WITH CHECK: null`. Sin `WITH CHECK`, PostgreSQL usa el `USING` como filtro de visibilidad pero NO como restricción de escritura para columnas individuales.  
**Impacto si se explota:** Acceso REAL de escritura a tablas `productos`, `categorias`, `pedidos`, `items_pedido`, y `mensajes` (todas protegidas por políticas que verifican `profiles.rol = 'admin'`).  
**Estado:** ✅ RESUELTO

### SEC-002 — CRÍTICO: Rutas /admin Protegidas Solo en el Cliente

**Categoría:** Autorización  
**Estado probado:** Deslogueado, acceso directo por URL  
**Vector exacto:** Navegar directamente a `/admin`, `/admin/products`, `/admin/mensajes`, etc. sin sesión.  
**Severidad:** CRÍTICA  
**Evidencia:** No existía `middleware.ts`. La protección dependía exclusivamente del `AdminLayout` client-side. El HTML/JS de Next.js se entregaba al cliente y solo entonces se ejecutaba la redirección.  
**Impacto si se explota:** Exposición del panel de admin al HTML inicial y posible hydration parcial antes de la redirección client-side.  
**Estado:** ✅ RESUELTO

### SEC-003 — ALTA: admin_delete_user verificaba admin vía profiles.role (mutable)

**Categoría:** Autorización / RPC  
**Estado probado:** Usuario autenticado (escalación secuencial con SEC-001)  
**Vector exacto:** Explotar SEC-001 para poner `role = 'admin'` en profiles, luego llamar `admin_delete_user`.  
**Severidad:** ALTA  
**Evidencia:** La función RPC verificaba `SELECT role FROM public.profiles WHERE id = auth.uid()` — fuente manipulable antes de la corrección SEC-001.  
**Estado:** ✅ RESUELTO

### SEC-003b — ALTA: get_users_list no verificaba autenticación de admin

**Categoría:** Autorización / RPC  
**Estado probado:** Usuario autenticado regular  
**Vector exacto:** `supabase.rpc('get_users_list')` desde cuenta de usuario regular. La función no tenía verificación de rol.  
**Severidad:** ALTA  
**Evidencia:** Función con `SECURITY DEFINER` sin guard de rol — cualquier usuario autenticado podía obtener la lista completa de usuarios (emails, nombres, roles).  
**Estado:** ✅ RESUELTO

### SEC-004 — ALTA: get_dashboard_data no verificaba admin

**Categoría:** Autorización / RPC  
**Estado probado:** Usuario autenticado regular  
**Vector exacto:** `supabase.rpc('get_dashboard_data')` desde cuenta de usuario regular.  
**Severidad:** ALTA  
**Evidencia:** La función retornaba datos del dashboard (mensajes no leídos, datos de usuarios, contenido sensible) a cualquier usuario autenticado.  
**Estado:** ✅ RESUELTO

### SEC-005 — ALTA: Auth Callback Redirigía Siempre a /admin

**Categoría:** Autorización / Auth  
**Estado probado:** Usuario regular autenticando vía OAuth  
**Vector exacto:** Un usuario regular que completara el flujo OAuth era redirigido a `/admin`. Aunque el cliente lo redirigía de vuelta, la URL se resolvía momentáneamente como admin.  
**Severidad:** ALTA  
**Evidencia:** `NextResponse.redirect(\`${origin}/admin\`)` hardcodeado sin verificar el rol del usuario.  
**Estado:** ✅ RESUELTO

### SEC-006 — MEDIA: profiles_admin_update sin WITH CHECK

**Categoría:** RLS  
**Estado probado:** Admin logueado  
**Vector exacto:** Admin actualizando perfil de otro usuario sin restricción de WITH CHECK.  
**Severidad:** MEDIA  
**Evidencia:** `profiles_admin_update` con `USING` pero `with_check: null`.  
**Estado:** ✅ RESUELTO

### SEC-007 — MEDIA: messages_public_insert con WITH CHECK: true (sin validación)

**Categoría:** Inputs / RLS  
**Estado probado:** Deslogueado / cualquier usuario  
**Vector exacto:** `supabase.from('messages').insert({ name: '', email: '', message: '' })` aceptado sin restricción.  
**Severidad:** MEDIA  
**Evidencia:** Dos políticas duplicadas con `WITH CHECK: true` — permitían insertar cualquier contenido, incluyendo campos vacíos.  
**Estado:** ✅ RESUELTO

### SEC-008 — MEDIA: user_favorites sin WITH CHECK

**Categoría:** RLS / Lógica de negocio  
**Estado probado:** Usuario autenticado  
**Vector exacto:** `supabase.from('user_favorites').insert({ user_id: 'uuid-de-otro-usuario', product_id: '...' })`.  
**Severidad:** MEDIA  
**Evidencia:** Políticas `ALL` con `USING (auth.uid() = user_id)` pero sin `WITH CHECK` — el `USING` no aplica como restricción para `INSERT` en PostgreSQL.  
**Estado:** ✅ RESUELTO

### SEC-INFO-01 — INFORMATIVO: dangerouslySetInnerHTML (17 usos)

**Categoría:** Inputs / XSS  
**Resultado:** Todos los usos analizados son para inyección de JSON-LD (SEO) o scripts estáticos de configuración. El contenido NO proviene de datos de usuario ni de la base de datos. Todos usan `JSON.stringify(...).replace(/<\/g, '\\u003c')` correctamente.  
**Estado:** ✅ SIN VULNERABILIDAD

### SEC-INFO-02 — INFORMATIVO: Historial Git sin .env expuesto

**Resultado:** `git log --all --full-history -- .env .env.local` → sin resultados. El `.gitignore` tiene `.env*`. `SERVICE_ROLE_KEY` nunca apareció en el código fuente.  
**Estado:** ✅ SIN VULNERABILIDAD

### SEC-INFO-03 — INFORMATIVO: Storage Policies Correctas

**Resultado:** El bucket `product-images` tiene:

- `INSERT`: solo admins vía `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'` ✅
- `UPDATE`: solo admins ✅
- `DELETE`: solo admins ✅
- `SELECT`: público (imágenes de productos son públicas) ✅  
  **Estado:** ✅ SIN VULNERABILIDAD

### SEC-INFO-04 — INFORMATIVO: Queries Supabase sin SQL Concatenado

**Resultado:** Todos los accesos a Supabase usan el query builder oficial (`supabase.from().select().eq()`). No se encontró concatenación de strings hacia SQL crudo.  
**Estado:** ✅ SIN VULNERABILIDAD

---

## Causas Raíz y Correcciones Aplicadas

### SEC-001 — Fix: WITH CHECK en profiles_self_update

**Causa raíz:** `ALTER POLICY` sin `WITH CHECK` en PostgreSQL RLS. Para `UPDATE`, sin `WITH CHECK`, la política solo filtra qué filas son visibles (`USING`) pero no qué valores pueden escribirse.

**Corrección aplicada (en Supabase vía MCP):**

```sql
ALTER POLICY "profiles_self_update" ON public.profiles
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND rol = (SELECT rol FROM public.profiles WHERE id = auth.uid())
  AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);
```

**Documentación consultada:** https://supabase.com/docs/guides/database/postgres/row-level-security — Sección "UPDATE policies" — `WITH CHECK` controla qué filas pueden ser el resultado después de la actualización.

### SEC-002 — Fix: Protección server-side de /admin en proxy.ts

**Causa raíz:** No existía middleware server-side. El proyecto usa `proxy.ts` como middleware (no `middleware.ts`). La protección admin era exclusivamente client-side en `AdminLayout`.

**Corrección aplicada (`src/proxy.ts`):**

```typescript
// Verificación server-side antes de servir cualquier ruta /admin
const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) {
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
const userRole = user.app_metadata?.role;
if (userRole !== "admin") {
  return NextResponse.redirect(new URL("/", request.url));
}
```

**Documentación consultada:** https://supabase.com/docs/guides/auth/server-side/nextjs — Patrón oficial con `createServerClient` y `getUser()`.

### SEC-003/003b — Fix: RPCs con verificación JWT en lugar de profiles

**Corrección:** `admin_delete_user` y `get_users_list` reemplazaron la verificación vía `profiles.role` por `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`.

### SEC-004 — Fix: get_dashboard_data con guard de admin

**Corrección:** Agregado al inicio de la función:

```sql
IF (auth.jwt() -> 'app_metadata' ->> 'role') <> 'admin' THEN
  RAISE EXCEPTION 'Unauthorized: only admins can access dashboard data';
END IF;
```

### SEC-005 — Fix: Auth callback con redirección basada en rol

**Corrección:** El callback ahora usa `user.app_metadata?.role` del JWT para redirigir: admins → `/admin`, usuarios → `/`.

### SEC-006/007/008 — Fixes: WITH CHECK y políticas duplicadas

- `profiles_admin_update`: agregado `WITH CHECK`
- `messages_public_insert`: eliminadas políticas duplicadas con `WITH CHECK: true`, reemplazadas con validación de campos
- `user_favorites`: consolidadas en política única con `WITH CHECK (auth.uid() = user_id)`

---

## Verificación de "No Quitar la Chapa"

Para cada corrección se verificó explícitamente:

| Corrección                        | ¿Reduce protección? | ¿Rompe uso legítimo?                                         | ¿Cambia diseño visual? |
| --------------------------------- | ------------------- | ------------------------------------------------------------ | ---------------------- |
| profiles_self_update WITH CHECK   | ❌ No               | ❌ No (admin panel sigue actualizando otros perfiles)        | ❌ No                  |
| proxy.ts con auth server-side     | ❌ No               | ❌ No (admin real sigue accediendo normalmente)              | ❌ No                  |
| get_dashboard_data con guard      | ❌ No               | ❌ No (solo admins lo usaban)                                | ❌ No                  |
| get_users_list con guard          | ❌ No               | ❌ No (solo admins lo usaban)                                | ❌ No                  |
| admin_delete_user con JWT         | ❌ No               | ❌ No (admin real tiene app_metadata.role = admin)           | ❌ No                  |
| auth callback con rol             | ❌ No               | ❌ No (admins van a /admin, usuarios van a /)                | ❌ No                  |
| messages_public_insert validación | ❌ No               | ❌ No (contacto legítimo siempre tiene nombre/email/mensaje) | ❌ No                  |
| user_favorites WITH CHECK         | ❌ No               | ❌ No                                                        | ❌ No                  |

---

## Documentación Oficial Consultada

1. **Supabase RLS**: https://supabase.com/docs/guides/database/postgres/row-level-security — Para correcciones SEC-001, SEC-006, SEC-007, SEC-008
2. **Supabase Auth Next.js SSR**: https://supabase.com/docs/guides/auth/server-side/nextjs — Para SEC-002 (patrón oficial de middleware con getUser())
3. **Supabase Auth RLS**: https://supabase.com/docs/guides/auth/row-level-security — Para verificar patrón de JWT app_metadata

---

## Hallazgos Retroactivos (Parches Preexistentes)

Se encontraron dos patrones preexistentes de "puerta sin chapa":

1. **`profiles_self_update` sin `WITH CHECK`**: Parche de seguridad preexistente incompleto — la política filtraba correctamente _qué filas_ pero no _qué valores_ podían escribirse.
2. **messages con `WITH CHECK: true`**: Parche preexistente que permitía el acceso pero sin ninguna validación de contenido.

Ambos fueron corregidos de raíz aplicando la restricción correcta.

---

## Pruebas de Penetración — Segunda Pasada

### Resultados de Pruebas de Acceso Anónimo a Rutas Admin

| Test | Ruta                       | URL Final                                     | Resultado |
| ---- | -------------------------- | --------------------------------------------- | --------- |
| T1   | `/admin` sin auth          | `/admin/login?redirectTo=%2Fadmin`            | ✅ PASS   |
| T2   | `/admin/products` sin auth | `/admin/login?redirectTo=%2Fadmin%2Fproducts` | ✅ PASS   |
| T3   | `/admin/messages` sin auth | `/admin/login?redirectTo=%2Fadmin%2Fmessages` | ✅ PASS   |
| T4   | `/admin/usuarios` sin auth | `/admin/login?redirectTo=%2Fadmin%2Fusuarios` | ✅ PASS   |

**Capturas guardadas:**

- `test_1_admin_no_auth_*.png` — Redirección a login ✅
- `test_2_admin_products_no_auth_*.png` — Redirección a login ✅
- `test_3_admin_messages_no_auth_*.png` — Redirección a login ✅
- `test_4_admin_users_no_auth_*.png` — Redirección a login ✅

### Build de Producción

```
▲ Next.js 16.2.3 (Turbopack)
✓ Compiled successfully in 11.8s
✓ TypeScript: Finished in 8.8s
✓ Static pages: 41/41 generadas
ƒ Proxy (Middleware) — activo y detectado
```

---

## Estado Final — Checklist

- [x] RLS habilitado y verificado en cada tabla, con políticas corregidas vía SQL/MCP
- [x] Ningún endpoint de admin accesible sin verificación de servidor (proxy.ts + RPC guards)
- [x] Ninguna clave secreta (SERVICE_ROLE_KEY) expuesta — verificado en código y git history
- [x] Ninguna lógica de negocio crítica confiada únicamente al cliente
- [x] Storage con policies correctas basadas en JWT app_metadata
- [x] Inputs validados: messages con WITH CHECK de contenido mínimo
- [x] Parches preexistentes inseguros corregidos de raíz
- [x] Ninguna corrección redujo protección existente
- [x] Ninguna corrección rompió funcionalidad legítima
- [x] Ninguna corrección alteró el diseño visual
- [x] Build exitoso sin errores: `✓ Compiled successfully`
- [x] Pruebas de penetración de rutas admin: 4/4 PASS
