## REPORTE DE CORRECCIÓN TOTAL DE ERRORES

**Fecha:** 2026-06-17 23:41 CST  
**Proyecto:** Confecciones Liss

---

### ESTADO FINAL: CERO ERRORES — COMPLETADO ✓

---

### RESUMEN

| Métrica                          | Valor |
| -------------------------------- | ----- |
| Errores encontrados inicialmente | 1     |
| Errores corregidos               | 1     |
| Errores pendientes               | 0     |
| Regresiones introducidas         | 0     |
| Regresiones de seguridad         | 0     |

---

### ERRORES CORREGIDOS

#### ERR-001 — Carrito revertía items al agregar con sesión activa → **RESUELTO ✓**

| Campo          | Detalle                                                                                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fuente**     | Chrome Console + comportamiento visual                                                                                                                    |
| **Tipo**       | error / regresión de datos                                                                                                                                |
| **Mensaje**    | `Error syncing cart to DB: { code: "23505", message: "duplicate key value violates unique constraint \"user_carts_user_id_key\"" }` + rollback silencioso |
| **Contexto**   | Al agregar cualquier producto al carrito con usuario autenticado                                                                                          |
| **Frecuencia** | **Siempre** (100% reproducible con sesión iniciada)                                                                                                       |

**Causa raíz:**  
El método `.upsert()` en `CartContext.tsx` no tenía la opción `onConflict`, lo que hacía que PostgREST interpretara cada llamada como un `INSERT`. Al ya existir una fila para ese `user_id` en la tabla `user_carts` (índice `UNIQUE user_carts_user_id_key` confirmado en Supabase), PostgreSQL lanzaba `23505 duplicate key violation`. Este error era considerado "real" por el código, activando el bloque de rollback:

```ts
// ANTES — el rollback borraba el item recién agregado
setCartItems(lastSyncedCartRef.current); // ← REVIERTE
```

**Solución:**  
Dos cambios en `src/context/CartContext.tsx`:

1. **`{ onConflict: "user_id" }`** en el upsert → PostgREST hace `UPDATE` en lugar de `INSERT` cuando ya existe el registro.

2. **Manejo defensivo del código `23505`** → aunque el fix anterior lo previene, como medida de seguridad adicional el error de duplicate key ya no dispara rollback.

```diff
-  .upsert({
-    user_id: user.id,
-    cart_items: debouncedCartItems,
-    updated_at: new Date().toISOString(),
-  })
+  .upsert(
+    {
+      user_id: user.id,
+      cart_items: debouncedCartItems,
+      updated_at: new Date().toISOString(),
+    },
+    { onConflict: "user_id" }
+  )
```

**Archivos modificados:** `src/context/CartContext.tsx`  
**Verificado:** consola limpia en `/catalogo/scrubs`, `/catalogo/universitario`, `/catalogo/universitario/[slug]`

---

### AUDITORÍA DE SUPABASE — Estado

| Tabla                | RLS      | Políticas                             | Estado                               |
| -------------------- | -------- | ------------------------------------- | ------------------------------------ |
| `user_carts`         | ✓ Activo | `ALL: auth.uid() = user_id`           | ✓ Correcto y seguro                  |
| `user_carts.user_id` | —        | UNIQUE index `user_carts_user_id_key` | ✓ Existe (necesario para onConflict) |

---

### ARCHIVOS MODIFICADOS

| Archivo                       | Cambio                                                                     |
| ----------------------------- | -------------------------------------------------------------------------- |
| `src/context/CartContext.tsx` | Agrega `onConflict: "user_id"` al upsert + manejo defensivo de error 23505 |

### CAMBIOS EN SUPABASE

Ninguno. La causa raíz era solo en el código del cliente. La tabla `user_carts` tenía correctamente el índice UNIQUE en `user_id`, solo faltaba que el código lo indicara en el upsert.

---

### VERIFICACIÓN DE CONSOLAS LIMPIAS

| Fuente           | Estado                                                  |
| ---------------- | ------------------------------------------------------- |
| Chrome Console   | **LIMPIA ✓** — sin errors de sync, sin rollback         |
| Chrome Network   | **SIN FALLOS ✓** — requests a user_carts retornan 200   |
| Next.js terminal | **LIMPIA ✓** — sin errores de compilación               |
| Prettier/ESLint  | **SIN ERRORES ✓** — 0 errors, 7 warnings pre-existentes |
| Supabase logs    | **SIN ERRORES ✓** — upserts exitosos confirmados        |

### ESTADO DE SEGURIDAD

| Check                                     | Estado                                                         |
| ----------------------------------------- | -------------------------------------------------------------- |
| RLS activo en todas las tablas sensibles  | ✓ SÍ                                                           |
| Sin regresiones de seguridad introducidas | ✓ CONFIRMADO                                                   |
| Panel admin inaccesible para no-admins    | ✓ CONFIRMADO                                                   |
| `onConflict` no amplía permisos RLS       | ✓ CONFIRMADO — la política `auth.uid() = user_id` sigue activa |

---

### COMMIT

```
[desarrollo f054feb] fix(cart): agregar onConflict en upsert user_carts para
evitar rollback en sesion activa
1 file changed, 41 insertions(+), 26 deletions(-)
```
