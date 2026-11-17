### A11Y-06: Inacción de la Tecla Escape en Menús Móviles y Drawers de Filtro

- **Categoría:** Accesibilidad (Navegación por Teclado / WCAG 2.1.2 Sin Trampas de Teclado)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/layout/Navbar.tsx:217-230`, `src/components/catalogo/MobileFilterDrawer.tsx:78-90`
- **Diagnóstico y Escenario de Fallo:**
  Los componentes `Navbar.tsx` y `MobileFilterDrawer.tsx` gestionan los eventos de clic exterior mediante escuchadores de `mousedown`, pero omiten registrar un escuchador `keydown` para capturar la pulsación de la tecla `Escape`. Los usuarios dependientes de tecnologías de asistencia o de navegación exclusiva por teclado no pueden cerrar menús ni paneles superpuestos mediante el mecanismo estándar de escape, quedando atrapados u obligados a tabular secuencialmente a través de todo el árbol del DOM hasta alcanzar controles explícitos de cierre, lo cual contraviene directamente el criterio de conformidad WCAG 2.1.2.
- **Código de Remediación Exacto:**
  ```typescript
  // Archivo: src/components/layout/Navbar.tsx (líneas 217-230)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen]);
  ```

---

### A11Y-07: Controles de Formulario Sin Etiquetar en Notas de Personalización de Producto

- **Categoría:** Accesibilidad (Formularios y Lectores de Pantalla / WCAG 3.3.2, 4.1.2)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/catalogo/ProductDetailClient.tsx:920-932`
- **Diagnóstico y Escenario de Fallo:**
  El área de texto (`textarea`) destinada a las notas de personalización del producto carece de un elemento `<label htmlFor="custom-note">` asociado. Los lectores de pantalla anuncian únicamente "Edición de texto, en blanco", sin proporcionar ninguna indicación de su propósito, contexto ni instrucciones al usuario.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/catalogo/ProductDetailClient.tsx (líneas 920-932)
  <label htmlFor="custom-note" className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
    <Icon name="edit_note" className="text-[1.125rem]" aria-hidden="true" />
    <span>¿Necesitas personalizar tu pedido?</span>
  </label>
  <textarea
    id="custom-note"
    value={customNote}
    onChange={(e) => setCustomNote(e.target.value)}
    placeholder="Escribe nombres, bordados especiales o indicaciones..."
    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus-visible:ring-2 focus-visible:ring-[#143067]"
  />
  ```

---

### A11Y-08: Ausencia de Semántica de Radio Group en Modal de Formulario de Entrega

- **Categoría:** Accesibilidad (Formularios y Semántica / WCAG 1.3.1, 4.1.2)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/cart/DeliveryFormModal.tsx:295-340`
- **Diagnóstico y Escenario de Fallo:**
  Las opciones del método de entrega ("Retiro en Taller", "Punto Medio", "A Domicilio") se renderizan como simples elementos `<button>` sin `role="radiogroup"` en el contenedor ni `role="radio"` y `aria-checked` en cada una de las opciones. Los lectores de pantalla no anuncian la relación de grupo ni el estado de selección de la opción activa.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/cart/DeliveryFormModal.tsx (líneas 295-340)
  <div
    role="radiogroup"
    aria-label="Método de entrega"
    className="grid grid-cols-3 gap-3"
  >
    {DELIVERY_METHODS.map((method) => {
      const isSelected = selectedMethod === method.id;
      return (
        <button
          key={method.id}
          type="button"
          role="radio"
          aria-checked={isSelected}
          onClick={() => setSelectedMethod(method.id)}
          className={cn(
            "rounded-xl border p-3 text-center transition",
            isSelected
              ? "border-[#143067] bg-[#143067]/5 font-semibold text-[#143067]"
              : "border-gray-200 text-gray-600"
          )}
        >
          {method.label}
        </button>
      );
    })}
  </div>
  ```

---

### A11Y-09: Enlaces Anidados Dentro de `<label>` y Omisión de Atributos `required`

- **Categoría:** Accesibilidad (Formularios y Semántica / WCAG 1.3.1, 3.3.2)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/cart/DeliveryFormModal.tsx:408, 664-703`
- **Diagnóstico y Escenario de Fallo:**
  El elemento `<label htmlFor="delivery-terms">` envuelve dos elementos `<Link>`, violando el modelo de contenido HTML para etiquetas y desorientando a los lectores de pantalla al calcular el nombre accesible. Además, los campos de entrada obligatorios muestran un asterisco visual (`*`), pero omiten los atributos obligatorios `required` o `aria-required="true"`.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/cart/DeliveryFormModal.tsx
  // Separar los elementos label y link:
  <div className="flex items-start gap-2">
    <input
      type="checkbox"
      id="delivery-terms"
      required
      aria-required="true"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#143067] focus:ring-[#143067]"
    />
    <label htmlFor="delivery-terms" className="text-xs text-gray-600">
      Acepto las políticas de entrega. Consulta los{" "}
    </label>
    <Link
      href="/legal/terminos-y-condiciones"
      target="_blank"
      className="text-xs text-[#143067] underline"
    >
      Términos y Condiciones
    </Link>
  </div>
  ```

---

### A11Y-10: Supresión de Outlines Sin Indicador de Foco Accesible en Acordeones de FAQ

- **Categoría:** Accesibilidad (Foco Visible / WCAG 2.4.7)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/servicios/ServicioFAQ.tsx:23`
- **Diagnóstico y Escenario de Fallo:**
  Los botones del acordeón declaran la clase `focus:outline-none` sin suministrar `focus-visible:ring-2`, dejando el foco de navegación por teclado completamente invisible en pantalla.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/servicios/ServicioFAQ.tsx (línea 23)
  className =
    "flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143067] focus-visible:ring-offset-2";
  ```

---

### A11Y-11: Omisión de Preferencia de Movimiento Reducido en Proveedor de Framer Motion

- **Categoría:** Accesibilidad (Movimiento / WCAG 2.2.2, 2.3.3)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/providers/index.tsx:69-80`
- **Diagnóstico y Escenario de Fallo:**
  La aplicación utiliza ampliamente la librería Framer Motion, pero no configura `<MotionConfig reducedMotion="user">` en el proveedor raíz. Los usuarios con trastornos vestibulares del movimiento que han establecido la preferencia de sistema `prefers-reduced-motion` a nivel del sistema operativo continúan siendo expuestos a animaciones forzadas de layout y transformaciones visuales.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/providers/index.tsx
  import { MotionConfig } from "framer-motion";

  export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MotionConfig>
    );
  }
  ```

---

### ARCH-03: Condiciones de Carrera y Actualizaciones de Estado en Componentes Desmontados en Búsqueda Debounced

- **Categoría:** Calidad de Código / Concurrencia y Condiciones de Carrera
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/layout/SearchModal.tsx:132-173`, `src/app/(admin)/admin/products/page.tsx:81-152`
- **Diagnóstico y Escenario de Fallo:**
  En `SearchModal.tsx:132-173`, las consultas de búsqueda con debouncing se disparan sin banderas de cancelación ni `AbortController`. Si una consulta lenta previa se resuelve después de una consulta más reciente, los resultados obsoletos sobrescriben los resultados frescos. Si el modal se cierra mientras las solicitudes de red están en tránsito, los setters de estado se ejecutan sobre componentes ya desmontados.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/components/layout/SearchModal.tsx (líneas 132-173)
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("products")
          .select(
            "id, name, price, old_price, image_path, slug, sector, category"
          )
          .eq("is_active", true)
          .ilike("name", `%${query}%`)
          .limit(8)
          .abortSignal(controller.signal);

        if (!isCancelled) {
          if (!error && data) setResults(data as unknown as DbProduct[]);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled && (err as { name?: string })?.name !== "AbortError") {
          logger.error("[SearchModal] Query failed:", err);
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      isCancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);
  ```

---

### ARCH-04: Condición de Carrera en Inicialización Asíncrona y Fuga de Memoria en Suscripción de Auth

- **Categoría:** Calidad de Código / Concurrencia y Fugas de Memoria
- **Severidad:** Alta
- **Ubicación Exacta:** `src/context/AuthContext.tsx:353-398`, `src/context/NotificationContext.tsx:413-501`
- **Diagnóstico y Escenario de Fallo:**
  En `AuthContext.tsx:245-399`, `initSession` es una función asíncrona (`async`) dentro de `useEffect`. Dado que `subscription` se asigna _después_ de `await supabase.auth.getSession()`, si el componente se desmonta durante la espera de la promesa (`await`), la función de limpieza se ejecuta mientras `subscription` todavía es `null`. Cuando `onAuthStateChange` se registra posteriormente, nunca se desuscribe y permanece fugando memoria de forma indefinida.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/context/AuthContext.tsx (líneas 245-399)
  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      const { getSupabaseClient } = await import("@/lib/supabaseClient");
      const supabase = getSupabaseClient();
      if (!mounted) return;

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, currentSession) => {
        if (!mounted) return;
        if (
          event === "SIGNED_OUT" ||
          (event === "TOKEN_REFRESHED" && !currentSession)
        ) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          setLoading(false);
        }
      });

      if (!mounted) subscription.unsubscribe();
      else authSubscription = subscription;
    };

    setupAuth();

    return () => {
      mounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);
  ```

---

### ARCH-05: Incumplimiento Total de la Directiva de Zustand Causando Sobrecarga de Re-renderizado por Contextos

- **Categoría:** Límites Arquitectónicos / Rendimiento y Mantenibilidad
- **Severidad:** Alta
- **Ubicación Exacta:** `src/context/CartContext.tsx:1-717`, `AGENTS.md:Regla 6`
- **Diagnóstico y Escenario de Fallo:**
  La Regla 6 de `AGENTS.md` ordena estrictamente:
  _"- `src/context/` es solo para estados globales con Zustand."_
  El archivo `package.json` instala `"zustand": "^5.0.12"`, sin embargo, Zustand **nunca se importa en ningún archivo de `src/`**. En su lugar, `src/context/` contiene 5 proveedores monolíticos de React Context (más de 700 líneas cada uno), provocando una amplia sobrecarga y cascada de re-renderizados innecesarios a través de toda la aplicación.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/context/useCartStore.ts
  import { create } from "zustand";
  import { persist, createJSONStorage } from "zustand/middleware";
  import type { CartItem, CartProduct } from "@/data/types";
  import { STORAGE_CART_KEY } from "@/lib/constants";

  interface CartState {
    items: CartItem[];
    isCartOpen: boolean;
    addItem: (
      product: CartProduct,
      quantity?: number,
      color?: string | null,
      note?: string
    ) => void;
    removeItem: (productId: string, color?: string | null) => void;
    updateQuantity: (
      productId: string,
      quantity: number,
      color?: string | null
    ) => void;
    setCartOpen: (open: boolean) => void;
    clearCart: () => void;
  }

  export const useCartStore = create<CartState>()(
    persist(
      (set) => ({
        items: [],
        isCartOpen: false,
        addItem: (product, quantity = 1, color = null, note = "") =>
          set((state) => {
            const existing = state.items.find(
              (i) =>
                i.product.id === product.id &&
                i.color === color &&
                i.note === note
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i === existing ? { ...i, quantity: i.quantity + quantity } : i
                ),
              };
            }
            return {
              items: [...state.items, { product, quantity, color, note }],
            };
          }),
        removeItem: (productId, color = null) =>
          set((state) => ({
            items: state.items.filter(
              (i) => !(i.product.id === productId && i.color === color)
            ),
          })),
        updateQuantity: (productId, quantity, color = null) =>
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === productId && i.color === color
                ? { ...i, quantity }
                : i
            ),
          })),
        setCartOpen: (open) => set({ isCartOpen: open }),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: STORAGE_CART_KEY,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
  ```

---

### ARCH-06: Invocaciones Directas de `console.log` / `console.error` en Archivos de Producción

- **Categoría:** Calidad de Código / Divulgación de Información
- **Severidad:** Alta
- **Ubicación Exacta:** `src/actions/contact.ts:101`, `src/actions/catalog.ts:65`, `src/actions/featuredProducts.ts:136`, `src/app/auth/callback/route.ts:64`
- **Diagnóstico y Escenario de Fallo:**
  El código de producción invoca directamente `console.error` y `console.warn` en lugar de utilizar el módulo centralizado `src/lib/logger.ts`. En `src/actions/contact.ts:101`, la instrucción `console.error("[sendContactMessage] Supabase error:", error.message)` expone detalles internos de la base de datos en registros no administrados.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/actions/contact.ts (línea 101)
  import { logger } from "@/lib/logger";

  if (error) {
    logger.error("[sendContactMessage] Supabase error:", error.message);
    return {
      success: false,
      error: "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
    };
  }
  ```

---

### ARCH-07: Bloques `catch {}` Vacíos y Silenciosos que Tragan el Registro de Auditoría de Seguridad

- **Categoría:** Calidad de Código / Integridad de Auditoría
- **Severidad:** Alta
- **Ubicación Exacta:** `src/actions/contact.ts:61, 115`, `src/context/NotificationContext.tsx:500`
- **Diagnóstico y Escenario de Fallo:**
  En `src/actions/contact.ts:55-61, 109-115`, las inserciones de registros de auditoría en la tabla `security_events` están encerradas en bloques `catch {}` vacíos. Si violaciones de restricciones de esquema o errores de permisos rechazan el registro, el fallo se descarta silenciosamente sin generar alertas.
- **Código de Remediación Exacto:**
  ```typescript
  // Archivo: src/actions/contact.ts (líneas 55-62)
  try {
    await supabase.from("security_events").insert({
      event_type: "contact_rate_limit_exceeded",
      payload: { email: emailKey, count: rateRecord.count },
      url: "/contacto",
    });
  } catch (auditError) {
    logger.error(
      "[sendContactMessage] Failed to record security event:",
      auditError
    );
  }
  ```

---

### ARCH-08: Ausencia Total de Tipos Generados de Base de Datos Supabase y Uso Generalizado de `any`

- **Categoría:** Tipado Estricto
- **Severidad:** Alta
- **Ubicación Exacta:** `src/lib/catalogService.ts:113, 119, 147`, `src/lib/productUtils.ts:123`, `src/app/(admin)/admin/messages/page.tsx:41`
- **Diagnóstico y Escenario de Fallo:**
  El repositorio carece por completo de tipos generados para la base de datos. Como consecuencia, `productUtils.ts:123` exporta `export const applyActiveOfferFilter = (query: any): any => { ... }`, y `catalogService.ts` recurre a dobles aserciones de tipo reiteradas `(data as unknown as DbProduct[])`. Los errores tipográficos o discrepancias en los esquemas no pueden ser detectados en tiempo de compilación.
- **Código de Remediación Exacto:**
  Generar `src/types/database.types.ts` y tipar estrictamente las consultas de utilidad:

  ```typescript
  // Archivo: src/lib/productUtils.ts (líneas 123-130)
  import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
  import type { Database } from "@/types/database.types";

  export const applyActiveOfferFilter = <
    T extends PostgrestFilterBuilder<
      Database["public"],
      Database["public"]["Tables"]["products"]["Row"],
      unknown
    >,
  >(
    query: T
  ): T => {
    const now = new Date().toISOString();
    return query
      .not("old_price", "is", null)
      .or(`offer_starts_at.is.null,offer_starts_at.lte.${now}`)
      .or(`offer_ends_at.is.null,offer_ends_at.gt.${now}`) as T;
  };
  ```
