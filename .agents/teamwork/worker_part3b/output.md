### A11Y-12: Nombres Accesibles Ambiguos y Repetitivos en Botones Interactivos

- **Categoría:** Accesibilidad (Lectores de Pantalla / WCAG 2.4.4 Enlace en Contexto, WCAG 2.4.6 Encabezados y Etiquetas, WCAG 4.1.2 Nombre, Rol, Valor)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/catalogo/CatalogProductCard.tsx:111`
  - `src/components/cart/CartDrawer.tsx:757, 782, 795`
  - `src/components/cart/FavoritesModal.tsx:234`
- **Diagnóstico y Escenario de Fallo:**
  En las cuadrículas del catálogo de productos y dentro del panel deslizante del carrito de compras (`CartDrawer.tsx`), múltiples botones de acción utilizan etiquetas accesibles estáticas y genéricas que no contextualizan el elemento específico sobre el cual operan.
  En `CatalogProductCard.tsx:111`, el botón de favoritos declara:
  ```tsx
  aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
  ```
  En una página con 20 productos visibles, una persona invidente que utilice la lista de botones de un lector de pantalla (como NVDA con `Insert + F7` o VoiceOver con el rotor de navegación) escucha una secuencia de 20 botones idénticos: _"Agregar a favoritos, botón"_, _"Agregar a favoritos, botón"_, etc., sin ninguna asociación con el nombre o la categoría de la prenda.
  De manera idéntica, en `CartDrawer.tsx`, los botones de control de cantidad declaran únicamente `aria-label="Disminuir cantidad"` (línea 782), `aria-label="Aumentar cantidad"` (línea 795) y el botón de borrado declara `aria-label="Eliminar producto"` (línea 757). Si el carrito contiene cuatro artículos distintos, el árbol de accesibilidad presenta cuatro botones idénticos con el nombre "Eliminar producto", forzando al usuario asistido a navegar minuciosamente el DOM circundante para adivinar qué prenda se verá afectada antes de ejecutar la acción.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/catalogo/CatalogProductCard.tsx (líneas 107-113)
{
  /* Favorito — idéntico a la vista de detalle */
}
<button
  type="button"
  onClick={handleToggleFavorite}
  className="focus-visible:ring-primary absolute top-2 right-2 z-[20] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 focus:outline-none focus-visible:ring-2 active:scale-95"
  aria-label={
    isFavorited
      ? `Quitar ${product.name} de favoritos`
      : `Agregar ${product.name} a favoritos`
  }
>
  <Icon
    name={isFavorited ? "favorite" : "favorite_border"}
    size={17}
    fill={isFavorited}
    className={isFavorited ? "text-red-500" : "text-slate-400"}
  />
</button>;
```

```tsx
// Archivo: src/components/cart/CartDrawer.tsx (líneas 755-801)
                              <button
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Eliminar ${item.product.name} del carrito`}
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-outline)] transition-all duration-200 hover:bg-[var(--color-tertiary)]/8 hover:text-[var(--color-tertiary)] active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <Icon name="delete" />
                              </button>
                            </div>
                            {(item.color || item.note) && (
                              <div className="mt-1 space-y-0.5 text-[11px] text-[var(--color-on-surface-variant)]">
                                {item.color && <p>Color: {item.color}</p>}
                                {item.note && (
                                  <p className="line-clamp-1 italic">
                                    {item.note}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mt-2 flex items-end justify-between">
                            {/* Quantity stepper — pill */}
                            <div className="flex items-center rounded-full bg-[var(--color-surface-container)] ring-1 ring-[var(--color-outline-variant)]/20">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label={`Disminuir cantidad de ${item.product.name}`}
                                disabled={item.quantity <= 1}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)] active:scale-90 disabled:opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <Icon name="remove" />
                              </button>
                              <span className="w-7 text-center text-sm font-bold text-[var(--color-on-surface)] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label={`Aumentar cantidad de ${item.product.name}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)] active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <Icon name="add" />
                              </button>
                            </div>
```

---

### A11Y-13: Cambios Dinámicos de Estado Invisibles para Lectores de Pantalla (Falta de Regiones ARIA Live)

- **Categoría:** Accesibilidad (Mensajes de Estado / WCAG 4.1.3 Mensajes de Estado)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/layout/SearchModal.tsx:347-351`
  - `src/components/ui/ShareButton.tsx:78-105`
  - `src/components/catalogo/ProductDetailClient.tsx:1024-1028`
  - `src/components/contacto/ContactForm.tsx:101-118`
- **Diagnóstico y Escenario de Fallo:**
  Las mutaciones asíncronas de interfaz y las retroalimentaciones transitorias de éxito o error se reflejan visualmente en pantalla, pero carecen de contenedores con regiones en vivo ARIA (`role="status"`, `aria-live="polite"` o `role="alert"`).
  1. En el modal de búsqueda `SearchModal.tsx:347`, a medida que el usuario escribe un término, el recuento de coincidencias se actualiza en el elemento `<p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">{results.length} resultados</p>`. Al no poseer atributos de región en vivo, el sintetizador de voz del lector de pantalla permanece en absoluto silencio; el usuario no tiene ninguna confirmación de si la búsqueda devolvió resultados o si la lista quedó vacía sin mover deliberadamente el foco fuera del input de búsqueda.
  2. En `ShareButton.tsx:78-105`, al presionar el botón de compartir, la URL se copia al portapapeles y se renderiza un toast flotante con el texto `"Enlace copiado"`. Al carecer de `role="status"` y `aria-live="polite"`, la notificación se desvanece tras 2.5 segundos sin haber sido vocalizada por el lector de pantalla, dejando al usuario con discapacidad visual en incertidumbre respecto a si la acción se ejecutó con éxito.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/layout/SearchModal.tsx (líneas 345-353)
{
  /* Results header con región ARIA Live */
}
<div className="mb-3 flex items-center justify-between">
  <p
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="text-xs font-semibold tracking-widest text-slate-600 uppercase"
  >
    {results.length}{" "}
    {results.length === 1 ? "resultado encontrado" : "resultados encontrados"}
    {hasMoreResults && " (mostrando 6)"}
  </p>
</div>;
```

```tsx
// Archivo: src/components/ui/ShareButton.tsx (líneas 77-105)
{
  /* Toast Notification accesible */
}
{
  showToast && (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1e1e24",
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "9999px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        fontSize: "0.875rem",
        fontWeight: 600,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        whiteSpace: "nowrap",
        animation: "toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <Icon
        name="check_circle"
        size={20}
        className="text-emerald-500"
        aria-hidden="true"
      />
      <span>Enlace copiado al portapapeles</span>
    </div>
  );
}
```

---

### A11Y-14: Elemento `<li>` Huérfano Renderizado Fuera de un Contenedor de Lista

- **Categoría:** Accesibilidad (Estructura Semántica / WCAG 1.3.1 Información y Relaciones)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/catalogo/ProductDetailClient.tsx:792`
- **Diagnóstico y Escenario de Fallo:**
  En la vista detallada de producto (`ProductDetailClient.tsx`), dentro del bloque condicional correspondiente a productos que se comercializan bajo confección a la medida (`isALaMedida`), se renderiza un elemento `<li className="flex items-start gap-2 text-sm text-slate-600">` directamente dentro de un contenedor `<div>`, sin ningún elemento padre `<ul>` u `<ol>`.
  De acuerdo con la especificación de HTML5 del W3C y el criterio de conformidad WCAG 1.3.1, un elemento `<li>` debe estar obligatoriamente contenido de forma directa dentro de un elemento padre de lista (`<ul>`, `<ol>` o `<menu>`).
  Escenario de falla: Motores de renderizado y tecnologías asistivas (VoiceOver, JAWS, NVDA) reportan un elemento de lista desvinculado, anunciando de forma anómala _"Elemento de lista 1 de 1"_ dentro de un bloque que en realidad corresponde a una nota explicativa de cotizaciones, corrompiendo el árbol de accesibilidad y generando una falla automática en analizadores sintácticos como axe-core y Lighthouse.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/catalogo/ProductDetailClient.tsx (líneas 788-808)
                {/* Precio */}
                <div className="flex flex-col gap-1">
                  {isALaMedida ? (
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <Icon
                        name="chat"
                        className="text-primary mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        Los precios por servicio a la medida se cotizan por
                        WhatsApp. Pero tranquil@ 🥰 los uniformes confeccionados
                        a la medida tienen el mismo precio que las tallas
                        estándar y se cobran según la equivalencia de tus
                        medidas; por ejemplo, si estas corresponden a una talla
                        M, se aplicará el precio de la talla M.
                      </span>
                    </div>
                  ) : (
                    <>
```

---

### A11Y-15: No Conformidades en Ratios de Contraste de Color (Incumplimiento de WCAG 1.4.3 Mínimo 4.5:1)

- **Categoría:** Accesibilidad (Contraste Visual / WCAG 1.4.3 Contraste Mínimo Nivel AA)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/ui/GuestBell.tsx:864, 867` (`text-slate-300` sobre blanco: 1.56:1)
  - `src/components/layout/SearchModal.tsx:290, 335, 347, 436` (`text-gray-400` sobre blanco: 2.55:1)
  - `src/components/catalogo/ProductReviews.tsx:290` (`text-slate-400` sobre blanco: 2.76:1)
  - `src/components/catalogo/CatalogProductCard.tsx:158` (`text-slate-400` sobre blanco: 2.76:1)
  - `src/components/empresa/InstalacionesClient.tsx:812` (`text-white/40` sobre `#143067`: 3.43:1)
- **Diagnóstico y Escenario de Fallo:**
  El criterio WCAG 1.4.3 exige un ratio de contraste cromático mínimo de **4.5:1** para todo texto de cuerpo normal frente a su color de fondo adyacente (y 3:1 para texto grande o elementos gráficos esenciales). En múltiples áreas de la plataforma se detectaron clases de Tailwind CSS con grises excesivamente tenues que no alcanzan este umbral:
  1. En `GuestBell.tsx:864, 867`, el uso de `text-slate-300` (`#cbd5e1`) sobre fondo blanco puro (`#ffffff`) arroja un contraste de **1.56:1**, haciendo casi invisible la fecha relativa de las notificaciones (`timeAgo`) y el texto de acción `"Ver detalle →"`.
  2. En `SearchModal.tsx`, las indicaciones de ayuda y estados vacíos utilizan `text-gray-400` (`#9ca3af`), produciendo un contraste de **2.55:1**. Los usuarios con visión disminuida, daltonismo o que utilicen dispositivos con brillo reducido no logran discernir los textos secundarios.
  3. En `CatalogProductCard.tsx:158`, el precio tachado de rebaja (`oldPrice`) utiliza `text-slate-400` (**2.76:1**), careciendo además de una indicación textual oculta para lectores de pantalla que distinga el precio anterior del precio final actual.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/catalogo/CatalogProductCard.tsx (líneas 152-163)
{
  /* Precio: final a la izquierda, tachado a la derecha */
}
<div className="mt-auto flex items-center justify-between gap-1 pt-0.5 select-none">
  <span className="text-primary pointer-events-none text-base font-bold">
    {hasMultiplePrices ? "Desde " : ""}${price.toFixed(2)}
  </span>
  {onSale && oldPrice && (
    <span className="pointer-events-none text-xs text-slate-600 line-through decoration-slate-400/50">
      <span className="sr-only">Precio regular antes del descuento: </span>$
      {oldPrice.toFixed(2)}
    </span>
  )}
</div>;
```

```tsx
// Archivo: src/components/ui/GuestBell.tsx (líneas 863-871)
<div className="mt-1.5 flex items-center justify-between gap-2">
  <p className="text-[10px] font-medium text-slate-600">
    {timeAgo(notif.created_at)}
  </p>
  <span className="text-[10px] font-medium text-slate-600 opacity-0 transition-opacity group-hover:opacity-100">
    Ver detalle →
  </span>
</div>
```

```tsx
// Archivo: src/components/layout/SearchModal.tsx (líneas 334-340)
<div className="py-12 text-center">
  <Icon name="search_off" size={40} className="mx-auto mb-2 text-slate-500" />
  <p className="text-sm font-medium text-slate-700">
    No encontramos productos con &quot;{query}&quot;
  </p>
  <p className="mt-1 text-xs text-slate-600">
    Prueba con otro término como &quot;scrub&quot;, &quot;UNIVO&quot; o
    &quot;bordados&quot;.
  </p>
</div>
```

---

### ARCH-09: Importaciones Fantasma de Web Components Lit (`@aejkatappaja/phantom-ui`) en Más de 40 Skeletons

- **Categoría:** Código Muerto / Límites Arquitectónicos (Next.js App Router Architecture)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/app/(public)/ayuda/loading.tsx:1-16`
  - `src/app/(public)/catalogo/loading.tsx:1-35`
  - `src/app/(public)/empresa/loading.tsx:1-16`
  - Más de 40 archivos `loading.tsx` en `src/app/`
  - `src/phantom-ui.d.ts:1-15`
  - `src/app/layout.tsx:3`
  - `package.json:18`
- **Diagnóstico y Escenario de Fallo:**
  En toda la estructura de rutas de Next.js App Router, más de 40 archivos de skeleton de carga diferida (`loading.tsx`) contienen obligatoriamente la directiva `"use client"` para ejecutar la siguiente importación dinámica dentro de un hook `useEffect`:
  ```tsx
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);
  ```
  Sin embargo, un análisis estático exhaustivo del DOM confirma que la etiqueta personalizada `<phantom-ui>` **jamás se utiliza ni se renderiza** en ningún componente JSX del sistema. Todos los esqueletos visuales están implementados con elementos nativos `<div>` de React estilizados con clases Tailwind CSS (`animate-pulse rounded-md bg-gray-200`).
  Impactos técnicos negativos identificados:
  1. **Anulación de Streaming Server-Side de Skeletons**: Next.js App Router está diseñado para transmitir (`stream`) los fallbacks de `loading.tsx` como HTML estático puro desde el servidor antes de que el bundle de JavaScript del cliente se descargue. Al marcar más de 40 skeletons con `"use client"`, se bloquea el renderizado puramente estático del skeleton en servidor, forzando la hidratación innecesaria en el cliente.
  2. **Sobrecarga de Paquetes y Tiempos de Bloqueo (TBT)**: En cada transición de ruta, el navegador descarga e inicializa innecesariamente el motor de Lit (`@lit/reactive-element`, `lit-html` y `@aejkatappaja/phantom-ui`), emitiendo advertencias en la consola del desarrollador (`"Lit is in dev mode. Not recommended for production!"`).
  3. **Deuda Técnica en Tooling**: La presencia de este paquete obligó a mantener un archivo de tipados suprimidos (`src/phantom-ui.d.ts`) y configuraciones de resolución en Turbopack para un componente no funcional.
- **Código de Remediación Exacto:**

1. Convertir todos los archivos `loading.tsx` a **Server Components puros** eliminando la directiva `"use client"`, el hook `useEffect` y la importación de `@aejkatappaja/phantom-ui`:

```tsx
// Archivo: src/app/(public)/ayuda/loading.tsx
// Server Component puro: sin "use client" ni sobrecarga de tiempo de ejecución de Lit

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function AyudaLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando centro de ayuda..."
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <Shimmer className="h-12 w-64 md:h-16" />
        <Shimmer className="h-6 w-full max-w-lg" />
        <Shimmer className="h-12 w-full max-w-md rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <Shimmer className="h-10 w-10 rounded-full" />
            <Shimmer className="h-6 w-3/4" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

2. Ejecutar la desinstalación del paquete obsoleto en la raíz del proyecto:

```bash
npm uninstall @aejkatappaja/phantom-ui
```

3. Eliminar el archivo de tipos huérfano `src/phantom-ui.d.ts`.

---

### ARCH-10: 21 Importaciones Profundas Frágiles con `@ts-ignore` en `legalOgHelper.tsx`

- **Categoría:** Tipado Estricto / Encapsulamiento de Dependencias
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/lib/legalOgHelper.tsx:6-47`
- **Diagnóstico y Escenario de Fallo:**
  El módulo `src/lib/legalOgHelper.tsx` es responsable de la generación dinâmica de imágenes de OpenGraph (`ImageResponse`) para las páginas legales y normativas. En dicho archivo se utilizan **21 directivas consecutivas `// @ts-ignore`** para suprimir errores de compilación de TypeScript e importar rutas ESM privadas internas del paquete `lucide-react`:
  ```tsx
  // @ts-ignore
  import { __iconNode as shieldNode } from "lucide-react/dist/esm/icons/shield.js";
  // @ts-ignore
  import { __iconNode as fileTextNode } from "lucide-react/dist/esm/icons/file-text.js";
  // ... hasta 21 importaciones idénticas
  ```
  La importación profunda de archivos situados dentro de subdirectorios `/dist/esm/icons/*.js` rompe el encapsulamiento del paquete npm. La propiedad interna `__iconNode` es un artefacto no contractual de empaquetado de Lucide y carece de soporte semántico garantizado. Cualquier actualización de versiones menores o parches de `lucide-react`, o cambios en los módulos ESM de Turbopack/Next.js, romperá estas resoluciones de ruta al compilar (`Module not found`), provocando el colapso con error 500 en tiempo de ejecución del generador de imágenes OpenGraph en todas las páginas de políticas legales.
- **Código de Remediación Exacto:**
  Sustituir la extracción privada por los componentes oficiales exportados públicamente por `lucide-react` compatibles de forma nativa con el motor Satori de Next.js `ImageResponse`:

```tsx
// Archivo: src/lib/legalOgHelper.tsx (líneas 1-52)
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";
import {
  Shield,
  FileText,
  DollarSign,
  Truck,
  RefreshCw,
  Ruler,
  Tags,
  UserPlus,
  Brain,
  CheckCircle2,
  BadgeCheck,
  Landmark,
  Cookie,
  MessageCircle,
  Megaphone,
  Accessibility,
  Users,
  Camera,
  Scale,
  Sparkles,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mapeo seguro y tipado de iconos sin @ts-ignore ni dependencias internas de dist
const LEGAL_OG_ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  description: FileText,
  attach_money: DollarSign,
  local_shipping: Truck,
  replay: RefreshCw,
  straighten: Ruler,
  sell: Tags,
  group_add: UserPlus,
  psychology: Brain,
  task_alt: CheckCircle2,
  verified_user: BadgeCheck,
  account_balance: Landmark,
  cookie: Cookie,
  forum: MessageCircle,
  campaign: Megaphone,
  accessibility_new: Accessibility,
  groups: Users,
  photo_camera: Camera,
  gavel: Scale,
  workspace_premium: Sparkles,
  handshake: Handshake,
};

export function renderLegalOgIcon(
  iconName: string,
  color: string = "#ffffff",
  size: number = 48
) {
  const IconComponent = LEGAL_OG_ICONS[iconName] ?? Shield;
  return <IconComponent size={size} color={color} strokeWidth={2} />;
}
```

---

### ARCH-11: Omisión de Esquemas Zod de Formularios y Mutaciones Directas a Base de Datos en Vistas UI

- **Categoría:** Límites Arquitectónicos / Cumplimiento de Regla 9 de `AGENTS.md`
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/cart/DeliveryFormModal.tsx:155-210`
  - `src/components/admin/ProductModal.tsx:415-560`
  - `src/schemas/` (únicamente existen `contactSchema.ts` y `reviewSchema.ts`)
- **Diagnóstico y Escenario de Fallo:**
  La Regla 9 de `AGENTS.md` ("Estándar de App Router: Mutaciones y Esquemas") impone:

  > _"Prohibido crear Server Actions (use server) al vuelo dentro del archivo de los Client Components o de las vistas. Todo Server Action debe estar exclusivamente dentro de `src/actions/` y ser envuelto mediante `next-safe-action`. La validación de los datos que le llegan a una Actions o las validaciones de Forms, no deben ir directamente en las vistas, se deben definir como esquemas con Zod en `src/schemas/`."_

  La auditoría técnica constató que:
  1. En `DeliveryFormModal.tsx:155-210`, la función `handleConfirm` implementa más de 50 líneas de validación manual procedural (`if (!form.recipientName.trim())`, `if (!form.recipientPhone.trim())`, etc.), acoplando la lógica de validación del formulario directamente en la vista React en lugar de validar contra un esquema declarativo Zod en `src/schemas/`.
  2. En `ProductModal.tsx:415-560`, dentro de un componente de cliente masivo de 2063 líneas, se realizan llamadas directas de mutación a la base de datos con el cliente Supabase (`supabase.from("products").select(...)`, `supabase.from("products").insert(...)` y `supabase.from("products").update(...)`). Esto vulnera la arquitectura en capas al eludir Server Actions tipados con `next-safe-action`, impidiendo la auditoría centralizada de transacciones e incrementando el riesgo de mutaciones inconsistentes.

- **Código de Remediación Exacto:**

1. Crear el esquema canónico de validación en `src/schemas/deliverySchema.ts`:

```typescript
// Archivo: src/schemas/deliverySchema.ts
import { z } from "zod";

export const deliverySchema = z.object({
  deliveryMethod: z.enum(["taller", "punto_medio", "domicilio"], {
    required_error: "Debes seleccionar un método de entrega válido",
  }),
  recipientName: z
    .string()
    .trim()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  recipientPhone: z
    .string()
    .trim()
    .regex(
      /^[267][0-9]{7}$/,
      "Ingresa un número salvadoreño válido de 8 dígitos (ej: 71234567)"
    ),
  recipientEmail: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido")
    .optional()
    .or(z.literal("")),
  alternatePhone: z
    .string()
    .trim()
    .regex(/^[267][0-9]{7}$/, "Ingresa un número de contacto secundario válido")
    .optional()
    .or(z.literal("")),
  department: z.string().min(1, "Debes seleccionar un departamento"),
  municipality: z.string().min(1, "Debes seleccionar un municipio"),
  addressColonia: z
    .string()
    .trim()
    .min(2, "Ingresa colonia, barrio o residencial"),
  addressStreet: z
    .string()
    .trim()
    .min(2, "Ingresa calle, avenida, block o pasaje"),
  addressPolygon: z.string().trim().optional(),
  addressNumber: z.string().trim().optional(),
  addressReference: z.string().trim().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message:
        "Debes aceptar los términos de envío y devolución de Confecciones Liss",
    }),
  }),
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;
```

2. Refactorizar el manejador de confirmación en `src/components/cart/DeliveryFormModal.tsx`:

```tsx
// Archivo: src/components/cart/DeliveryFormModal.tsx (líneas 155-195)
const handleConfirm = () => {
  const validation = deliverySchema.safeParse(form);

  if (!validation.success) {
    const firstError =
      validation.error.errors[0]?.message ??
      "Verifica los datos del formulario.";
    toast.error(firstError);
    return;
  }

  const validData = validation.data;
  const finalInfo = getShippingInfo(
    validData.department,
    validData.municipality,
    validData.deliveryMethod
  );

  finalInfo.recipientName = validData.recipientName;
  finalInfo.recipientEmail = validData.recipientEmail;
  finalInfo.recipientPhone = validData.recipientPhone;
  finalInfo.alternatePhone = validData.alternatePhone;
  finalInfo.termsAccepted = validData.termsAccepted;
  finalInfo.deliveryMethod = validData.deliveryMethod;

  if (validData.deliveryMethod === "domicilio") {
    finalInfo.addressColonia = validData.addressColonia;
    finalInfo.addressStreet = validData.addressStreet;
    finalInfo.addressPolygon = validData.addressPolygon;
    finalInfo.addressNumber = validData.addressNumber;
    finalInfo.addressReference = validData.addressReference;
  }

  onConfirm(finalInfo);
};
```

---

### ARCH-12: Inclusiones de `<svg>` en Crudo en Layouts de React Violando la Regla 10.2 de `AGENTS.md`

- **Categoría:** Límites Arquitectónicos / Modularización de UI
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/cart/LoginModal.tsx:129-150`
  - `src/components/layout/Footer.tsx:127-135`
  - `src/components/ui/HeroImageCarousel.tsx:186, 213`
  - `src/components/catalogo/MobileFilterDrawer.tsx:295`
  - `src/components/legal/LegalArticleReader.tsx:19, 36, 53, 72`
- **Diagnóstico y Escenario de Fallo:**
  La Regla 10.2 de `AGENTS.md` ("Extracción de SVGs") establece de manera taxativa:

  > _"Extracción de SVGs: Nunca, ¡JAMÁS!, dejes archivos SVG enteros inmersos estáticamente dentro del JSX de React layout. Extrae los SVGs del DOM o: a) Los descargas/guardas en archivos en `/public/icons/`. b) Si necesitan prop logic, sepáralos obligatoriamente como `<Icons.IconName />` en el directorio de `src/components/ui/icons/` y reemplaza el JSX para importarlo prolijamente."_

  Múltiples vistas y componentes del sistema infringen esta directriz incluyendo elementos `<svg>` en crudo directamente en el marcado JSX:
  - En `LoginModal.tsx:129-150`, el logotipo de autenticación de Google se encuentra hardcodeado mediante 22 líneas de paths vectoriales inmersos en el botón de login.
  - En `Footer.tsx:127-135`, los iconos sociales se generan insertando elementos `<svg>` inline dinámicos en vez de consumir componentes modulares del directorio `src/components/ui/icons/`.

  Impacto: La duplicación de definiciones vectoriales incrementa innecesariamente el peso del árbol de componentes de React, rompe el encapsulamiento de estilos y elude las propiedades de accesibilidad estandarizadas del sistema de diseño (tales como `aria-hidden="true"`, foco y escalabilidad de color).

- **Código de Remediación Exacto:**

1. Crear el componente modular reutilizable `src/components/ui/icons/GoogleIcon.tsx`:

```tsx
// Archivo: src/components/ui/icons/GoogleIcon.tsx
import React from "react";

interface GoogleIconProps {
  className?: string;
}

export function GoogleIcon({
  className = "h-5 w-5 shrink-0",
}: GoogleIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
```

2. Reemplazar el SVG en crudo en `src/components/cart/LoginModal.tsx`:

```tsx
// Archivo: src/components/cart/LoginModal.tsx (líneas 122-132)
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

// ... dentro del JSX del botón:
<button
  onClick={() => {
    signInWithGoogle();
  }}
  className="focus-visible:ring-primary flex w-full items-center justify-center gap-[var(--space-sm)] rounded-xl border border-gray-200 bg-white px-[var(--space-md)] py-[var(--space-md)] font-medium text-slate-700 shadow-md transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2"
>
  <GoogleIcon />
  <span>Continuar con Google</span>
</button>;
```

---

### ARCH-13: Código Muerto Huérfano, Dependencias Sin Uso y Documentación Fantasma en Registro de Componentes

- **Categoría:** Código Muerto e Integridad Documental (Dead Code & Documentation Drift)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/empresa/PerfilDetalleClient.tsx:1-151`
  - `src/config/mediaKit.ts:1-136`
  - `src/components/REGISTRY.md:60-95` (entradas para `Badge`, `CategoryChip`, `ProductCard`)
  - `package.json:18, 19, 24, 25, 28, 38` (`@aejkatappaja/phantom-ui`, `@base-ui/react`, `class-variance-authority`, `client-only`, `groq-sdk`, `server-only`)
  - `knip.json:3-25`
- **Diagnóstico y Escenario de Fallo:**
  Una inspección forense rigurosa de las herramientas de compilación y control de calidad (`knip`, `eslint`, `package.json`, `REGISTRY.md`) reveló tres anomalías graves de acumulación de código muerto y desincronización arquitectónica:
  1. **Archivos Huérfanos Ignorados**: El componente `src/components/empresa/PerfilDetalleClient.tsx` (151 líneas) y el archivo `src/config/mediaKit.ts` (136 líneas) no son importados, referenciados ni enrutados por ningún punto de entrada del proyecto. Para eludir que la tarea automatizada de CI `npm run dead-code` (`knip`) reporte fallos, ambos archivos fueron agregados manualmente a la lista `"ignore"` de `knip.json` (líneas 20-21).
  2. **Dependencias Inutilizadas en Producción**: `package.json` declara dependencias que no poseen ninguna llamada en el árbol de código fuente:
     - `groq-sdk`: SDK de inteligencia artificial no utilizado.
     - `@base-ui/react`: Librería headless que no se utiliza en ninguna vista.
     - `class-variance-authority`: Paquete redundante frente a la convención unificada de Tailwind y `cn()`.
     - `client-only` y `server-only`: Directivas de límite no importadas en ningún archivo.
       Dichos paquetes fueron silenciados en `knip.json` bajo `ignoreDependencies` para ocultar alertas de dependencias muertas.
  3. **Registro de Componentes Inconsistente y Fantasma**: `src/components/REGISTRY.md` (documento de catálogo estipulado obligatoriamente por la Regla 7 de `AGENTS.md`) documenta en sus líneas 60 a 95 tres componentes: `src/components/ui/Badge.tsx`, `src/components/ui/CategoryChip.tsx` y `src/components/ui/ProductCard.tsx`. **Ninguno de estos archivos existe en el repositorio** (el catálogo utiliza `CatalogProductCard.tsx` en `src/components/catalogo/`). Esta documentación errónea induce a alucinaciones en agentes de IA y confusiones en desarrolladores. Simultáneamente, componentes centrales masivos como `DeliveryFormModal.tsx`, `ProductModal.tsx` o `SearchModal.tsx` se encuentran omitidos del registro.
- **Código de Remediación Exacto:**

1. Eliminar los archivos huérfanos del proyecto mediante la terminal:

```bash
Remove-Item -Path "src\components\empresa\PerfilDetalleClient.tsx" -Force
Remove-Item -Path "src\config\mediaKit.ts" -Force
```

2. Desinstalar las dependencias de producción no utilizadas:

```bash
npm uninstall @aejkatappaja/phantom-ui @base-ui/react class-variance-authority client-only groq-sdk server-only
```

3. Limpiar las reglas artificiales en `knip.json`:

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "ignoreDependencies": [
    "next-safe-action",
    "zustand",
    "@testing-library/react",
    "sharp"
  ],
  "ignore": [
    ".agents/**",
    ".backup/**",
    ".gemini/**",
    "public/sw.js",
    "supabase/**",
    "src/providers/DeferredProviders.tsx",
    "scratch/**",
    "scripts/**"
  ],
  "entry": [
    "src/app/**/*.{ts,tsx}",
    "src/mocks/handlers.ts",
    "src/components/legal/LegalContent.tsx"
  ]
}
```

4. Sincronizar `src/components/REGISTRY.md` eliminando las entradas ficticias (`Badge`, `CategoryChip`, `ProductCard`) y agregando las especificaciones reales de los componentes operativos (`CatalogProductCard`, `DeliveryFormModal`, `ProductModal`, `SearchModal`).
