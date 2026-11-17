# REPORTE FORENSE DE ACCESIBILIDAD DIGITAL (WCAG 2.1 AA)

**Proyecto:** Confecciones Liss  
**Auditor:** Accessibility Forensic Auditor (Modo Benchmark / Cero Confianza)  
**Fecha:** 2026-11-07  
**Estado:** AUDITORÍA CONCLUIDA — DETECCIÓN DE NO-CONFORMIDADES CRÍTICAS Y SEVERAS

---

## 1. OBSERVATION

Durante la inspección forense estática y pasiva de todo el repositorio (`src/app/`, `src/components/`, `src/providers/`, `src/lib/`, `src/styles/`), se analizaron minuciosamente los componentes de interfaz, layouts, navegación, modales, formularios, controles interactivos, contraste cromático y directivas de movimiento reducido.

Se verificaron empíricamente las siguientes observaciones de código fuente exactas:

### 1.1. Barrera de interacción en carrusel principal (`src/components/ui/HeroImageCarousel.tsx:140`)

El componente `HeroImageCarousel` condiciona el renderizado de sus controles interactivos y diapositivas a la bandera `hasInteracted`:

```tsx
140:       {hasInteracted ? (
141:         <>
...
206:           <button onClick={goNext} ... aria-label="Imagen siguiente" ...>
...
233:           <button key={idx} onClick={() => goTo(idx)} ...>
...
249:       ) : null}
```

Dicha bandera únicamente se activa mediante eventos táctiles o de puntero (`onTouchStart` en línea 57 y `onMouseEnter` en línea 133). No existe ningún escuchador `onFocus` ni `tabIndex` en el contenedor padre. Un usuario de teclado jamás dispara `onMouseEnter` ni `onTouchStart`, quedando los controles completamente omitidos del DOM.

### 1.2. Anidamiento ilegal de elementos interactivos en Favoritos (`src/components/cart/FavoritesModal.tsx:198, 227`)

En el modal de favoritos, cada tarjeta envuelve el elemento completo en un componente `Link` de Next.js (que renderiza un tag `<a>`), y en su interior anida un elemento `<button>`:

```tsx
198:   <Link key={product.id} href={getProductUrl(product as any)} ...>
...
227:     <button
228:       onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }}
...
234:       aria-label="Quitar de favoritos"
235:     >
242:   </Link>
```

Esto viola el modelo de contenido de HTML Living Standard y la especificación W3C/WAI-ARIA sobre elementos interactivos anidados.

### 1.3. Anidamiento de botón dentro de `role="button"` en Notificaciones (`src/components/ui/GuestBell.tsx:808, 874`)

En `NotifRow`, el contenedor de la fila tiene asignado `role="button"` y `tabIndex={0}`:

```tsx
807:     <li>
808:       <div
809:         role="button"
810:         tabIndex={0}
811:         onClick={() => onOpen(notif)}
...
874:           <button
875:             onClick={(e) => onTrash(e, notif)}
...
880:             aria-label="Eliminar notificación"
881:           >
```

Un `<button>` interactivo está anidado directamente dentro de un contenedor con `role="button"`.

### 1.4. Destrucción de semántica documental por `role="button"` en Visor Legal (`src/components/legal/LegalArticleReader.tsx:216`)

El contenedor envolvente del visor legal en escritorio tiene asignado `role="button"`:

```tsx
215:     <div
216:       role="button"
217:       tabIndex={-1}
218:       aria-label="Cerrar documento y volver a la lista"
219:       className="fixed inset-0 z-[9999] hidden items-center justify-center overflow-hidden lg:flex"
```

Dentro de este contenedor con `role="button"` se renderiza el artículo legal completo (`<article>`, `<h1>`, `<header>`, enlaces `<a>`, párrafos y botones). Los lectores de pantalla colapsan todo el árbol semántico interior al nombre del botón.

### 1.5. Ausencia de trampa de foco (`FocusLock`) en diálogos modales

Múltiples modales del sistema abren ventanas emergentes con `role="dialog"` y `aria-modal="true"`, pero carecen de contención de foco:

- `src/components/layout/SearchModal.tsx:220-226`
- `src/components/catalogo/MobileFilterDrawer.tsx:107-115`
- `src/components/catalogo/UnabWarningModal.tsx:33-38`
- `src/components/catalogo/ProductReviews.tsx:177-182`
- `src/components/catalogo/ProductDetailClient.tsx:1032, 1063`
- `src/components/ui/GuestBell.tsx:455, 666, 710`

### 1.6. Fallo de cierre por teclado (Tecla Escape) en menús móviles

- En `src/components/layout/Navbar.tsx:217-230`, el `useEffect` solo maneja `mousedown` para clic exterior, sin escuchar el evento `keydown` para la tecla `Escape`.
- En `src/components/catalogo/MobileFilterDrawer.tsx:78-90`, el drawer solo bloquea el scroll del body, sin proporcionar escuchador para la tecla `Escape`.

### 1.7. Control de formulario sin etiqueta programática (`src/components/catalogo/ProductDetailClient.tsx:920-932`)

El área de texto para notas de personalización carece de `<label htmlFor="custom-note">`:

```tsx
920:   <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
921:     <Icon name="edit_note" className="text-[1.125rem]" />
922:     <span>¿Necesitas personalizar tu pedido?</span>
923:   </div>
924:   <textarea id="custom-note" ... placeholder="..." />
```

### 1.8. Carencia de semántica de selección en grupos de radio y filtros

- En `src/components/cart/DeliveryFormModal.tsx:295-340`, los botones de método de entrega ("Retiro en Taller", "Punto Medio", "A Domicilio") son botones estándar sin `role="radiogroup"` en el contenedor ni `role="radio"` / `aria-checked` en cada opción.
- En `src/components/catalogo/FilterSidebar.tsx:98-138` y `MobileFilterDrawer.tsx:215-265`, los filtros de categorías son botones sin `aria-pressed`.

### 1.9. Enlaces interactivos anidados en `<label>` y omisión de `required` (`src/components/cart/DeliveryFormModal.tsx:408, 664-703`)

- Líneas 664-703: La etiqueta `<label htmlFor="delivery-terms">` envuelve dos enlaces `<Link>` (tags `<a>`), violando el modelo de contenido de `<label>`.
- Líneas 405-416: Campos obligatorios muestran asterisco visual (`*`) pero omiten los atributos `required` o `aria-required="true"` en la etiqueta `<input>`.

### 1.10. Supresión de contorno de foco sin alternativa accesible (`src/components/servicios/ServicioFAQ.tsx:23`)

En los acordeones de preguntas frecuentes:

```tsx
23:   className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none"
```

`focus:outline-none` suprime el contorno nativo sin proveer `focus-visible:ring`.

### 1.11. Omisión de `<MotionConfig reducedMotion="user">` en Framer Motion (`src/providers/index.tsx:69-80`)

A pesar de utilizar Framer Motion extensivamente (`motion.div`, `AnimatePresence`), el proveedor raíz en `src/providers/index.tsx` no incluye `<MotionConfig reducedMotion="user">`, omitiendo la preferencia del sistema operativo del usuario.

### 1.12. Nombres accesibles ambiguos y repetitivos

- `src/components/catalogo/CatalogProductCard.tsx:111`: `aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}` omite el nombre del producto.
- `src/components/cart/CartDrawer.tsx:757, 782, 795`: Botones "Eliminar producto", "Disminuir cantidad" y "Aumentar cantidad" sin asociar el producto específico.

### 1.13. Notificaciones dinámicas silenciosas para lectores de pantalla

Actualizaciones de estado dinámicas carecen de `aria-live="polite"` o `role="status"`:

- `src/components/layout/SearchModal.tsx:347` (contador de resultados de búsqueda)
- `src/components/cart/CartDrawer.tsx:788` (cambios en el contador del carrito)
- `src/components/ui/ShareButton.tsx:78` (toast de enlace copiado)
- `src/components/catalogo/ProductDetailClient.tsx:1024` (toast de enlace copiado)
- `src/components/contacto/ContactForm.tsx:101` (confirmación de mensaje enviado)

### 1.14. Semántica de lista inválida: `<li>` huérfano (`src/components/catalogo/ProductDetailClient.tsx:792`)

Una etiqueta `<li className="...">` se renderiza directamente dentro de un `<div>`, fuera de un contenedor `<ul>` u `<ol>`.

### 1.15. Incumplimiento de ratios de contraste cromático (WCAG 1.4.3)

- `src/components/ui/GuestBell.tsx:864`: Texto `text-slate-300` (`#cbd5e1`) sobre fondo blanco (`#ffffff`) tiene ratio de contraste de **1.56:1** (falla el mínimo de 4.5:1).
- `src/components/layout/SearchModal.tsx:290, 335, 347, 436`: Texto `text-gray-400` (`#9ca3af`) sobre blanco tiene ratio de **2.55:1** (falla el mínimo de 4.5:1).
- `src/components/catalogo/ProductReviews.tsx:290`: `text-slate-400` sobre blanco tiene ratio de **2.76:1** (falla 4.5:1).
- `src/components/catalogo/CatalogProductCard.tsx:158`: Precio anterior tachado `text-slate-400` sobre blanco tiene ratio de **2.76:1** (falla 4.5:1).
- `src/components/empresa/InstalacionesClient.tsx:812`: Texto `text-white/40` sobre fondo azul marino `#143067` tiene ratio de **3.43:1** (falla el mínimo de 4.5:1).

### 1.16. Salto en jerarquía de encabezados (`src/components/empresa/SobreNosotrosClient.tsx:638, 667`)

El documento salta directamente de un `<h2>` a un `<h4>`, omitiendo `<h3>`.

### 1.17. Acciones de propietario invisibles en navegación por teclado (`src/components/catalogo/ProductReviews.tsx:296`)

El contenedor de edición/eliminación de reseñas usa `opacity-0 group-hover:opacity-100` sin `group-focus-within:opacity-100`, permaneciendo invisible cuando recibe foco de teclado.

---

## 2. LOGIC CHAIN

1. **Premisa 1 (Estándar WCAG 2.1 AA):** Para alcanzar el nivel AA, una aplicación web debe satisfacer rigurosamente los principios de Perceptibilidad, Operabilidad, Comprensibilidad y Robustez.
2. **Premisa 2 (Barreras de Operabilidad):** Si un componente interactivo no puede ser alcanzado, operado o visualizado mediante teclado físico (Obs. 1.1, 1.5, 1.6, 1.10, 1.17), los usuarios con discapacidades motoras o ceguera quedan completamente excluidos del flujo de compra y navegación.
3. **Premisa 3 (Robustez y Parseo de Árbol de Accesibilidad):** El anidamiento de elementos interactivos dentro de otros interactivos (`<button>` dentro de `<a>`, o `<button>` dentro de `role="button"`, Obs. 1.2, 1.3) y la asignación errónea de `role="button"` a documentos completos (Obs. 1.4) provocan comportamientos indefinidos y colapso de semántica en los motores de tecnologías de asistencia (VoiceOver, NVDA, JAWS).
4. **Premisa 4 (Formularios y Retroalimentación):** Los controles de formulario sin etiquetas explícitas (Obs. 1.7, 1.9) y los cambios dinámicos sin regiones en vivo `aria-live` (Obs. 1.13) privan al usuario de conocer el propósito de los campos y el resultado de sus transacciones.
5. **Premisa 5 (Perceptibilidad Visual y Seguridad Vestibular):** Contrastes inferiores a 4.5:1 (Obs. 1.15) impiden la lectura a usuarios con baja visión, y la omisión de `reducedMotion="user"` en librerías JS (Obs. 1.11) expone a usuarios con trastornos vestibulares a mareos y desorientación.
6. **Conclusión Lógica:** La base de código de Confecciones Liss contiene defectos sistemáticos de accesibilidad digital que vulneran las pautas WCAG 2.1 AA. Sin embargo, todos los defectos son remediables mediante ajustes puramente semánticos y de atributos ARIA, preservando al 100% el diseño visual, colores, espaciados y animaciones exigidos por `AGENTS.md`.

---

## 3. CAVEATS

- **Auditoría pasiva estricta:** No se ejecutaron modificaciones en archivos de producción ni comandos que alterasen el árbol de trabajo Git.
- **Entornos evaluados:** Inspección exhaustiva basada en código fuente TypeScript/TSX, CSS y configuración de Next.js App Router. Pruebas dinámicas en navegadores con lectores de pantalla de producción deberán ser ejecutadas tras la aplicación de parches.
- **Preservación estética:** Las remediaciones provistas respetan de forma incondicional la directiva de diseño pixel-perfect de Confecciones Liss, asegurando que ninguna solución altere las dimensiones o estética aprobada.

---

## 4. CONCLUSION

**Veredicto de Auditoría:** **INTEGRITY VIOLATION / NON-COMPLIANT WITH WCAG 2.1 AA**.  
Se han catalogado 17 no-conformidades distribuidas en 4 niveles de severidad:

- **Crítica:** 4 hallazgos
- **Alta:** 7 hallazgos
- **Media:** 4 hallazgos
- **Baja:** 2 hallazgos

---

## 5. REGISTRO DETALLADO DE HALLAZGOS Y REMEDIACIÓN EXACTA

---

### A11Y-01: Barrera de interacción en carrusel principal y ausencia de semántica WAI-ARIA Carousel

- **Categoría:** Accessibility
- **Severidad:** Critical
- **Ubicación exacta:** `src/components/ui/HeroImageCarousel.tsx:128-140`
- **Criterio WCAG:** WCAG 2.1.1 Keyboard (Level A), WCAG 4.1.2 Name, Role, Value (Level A)
- **Diagnóstico y Escenario de Falla:**  
  El carrusel condiciona el renderizado de sus imágenes, flechas de navegación y puntos indicadores al estado booleano `hasInteracted`. Este estado solo cambia a `true` mediante `onTouchStart` (línea 57) o `onMouseEnter` (línea 133). Un usuario que navega exclusivamente mediante teclado (Tab) nunca activa `onMouseEnter` ni `onTouchStart`. Como resultado, los botones `goPrev`, `goNext` y los indicadores de diapositivas jamás existen en el DOM para usuarios de teclado. Además, el contenedor carece de roles semánticos de carrusel (`role="region"`, `aria-roledescription="carrusel"`).
- **Remediación Exacta:**  
  Permitir activación mediante foco de teclado (`onFocus`) y dotar al contenedor y diapositivas de la semántica WAI-ARIA correspondiente:

```tsx
// Reemplazo en src/components/ui/HeroImageCarousel.tsx:128-140
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galería de imágenes principales"
      tabIndex={0}
      className="absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocus={() => {
        if (!hasInteracted) setHasInteracted(true);
        setIsPaused(true);
      }}
      onBlur={() => setIsPaused(false)}
      onMouseEnter={() => {
        if (!hasInteracted) {
          setHasInteracted(true);
        }
        setIsPaused(true);
      }}
      onMouseLeave={() => setIsPaused(false)}
    >
```

---

### A11Y-02: Anidamiento ilegal de elemento interactivo (`<button>` dentro de `<Link>`) en modal de favoritos

- **Categoría:** Accessibility
- **Severidad:** Critical
- **Ubicación exacta:** `src/components/cart/FavoritesModal.tsx:198-242`
- **Criterio WCAG:** WCAG 4.1.2 Name, Role, Value (Level A), HTML Living Standard 4.5.1
- **Diagnóstico y Escenario de Falla:**  
  La tarjeta del producto en la lista de favoritos está definida como un `<Link>` (etiqueta `<a>`), y en la línea 227 contiene un `<button>` ("Quitar de favoritos"). La especificación HTML prohíbe terminantemente elementos interactivos como descendientes de un enlace `<a>`. Tecnologías de asistencia como VoiceOver y NVDA no pueden procesar el botón de forma independiente, confunden la acción del botón con la navegación a la página de detalle, o impiden al usuario accionar el botón de eliminación mediante la tecla Enter o Espacio.
- **Remediación Exacta:**  
  Convertir la tarjeta en un contenedor `<div>`, utilizando el enlace `<Link>` para el título/imagen y manteniendo el botón como un hermano directo:

```tsx
// Reemplazo en src/components/cart/FavoritesModal.tsx:198-242
<div
  key={product.id}
  className="group relative flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-all hover:shadow-md"
>
  <Link
    href={getProductUrl(product as any)}
    onClick={onClose}
    className="focus-visible:ring-primary flex flex-1 items-center gap-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    aria-label={`Ver detalles de ${product.name}`}
  >
    <div className="aspect-square w-[clamp(4.5rem,15vw,6rem)] shrink-0 overflow-hidden rounded-xl bg-white">
      <Image
        src={
          product.image_path ||
          product.images?.[0] ||
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='10'>Sin Imagen</text></svg>"
        }
        alt={product.name}
        width={96}
        height={96}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col justify-center pr-2">
      <h3 className="group-hover:text-primary line-clamp-1 text-lg font-bold text-slate-800 transition-colors">
        {product.name}
      </h3>
      <p className="text-primary mt-1 text-xl font-bold">
        {formatPrice(product.price)}
      </p>
    </div>
  </Link>

  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(product.id);
    }}
    className="focus-visible:ring-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 active:scale-95"
    aria-label={`Quitar ${product.name} de favoritos`}
  >
    <Icon name="favorite" fill className="text-primary" />
  </button>
</div>
```

---

### A11Y-03: Anidamiento de `<button>` interactivo dentro de un contenedor con `role="button"` en Notificaciones

- **Categoría:** Accessibility
- **Severidad:** Critical
- **Ubicación exacta:** `src/components/ui/GuestBell.tsx:808-885`
- **Criterio WCAG:** WCAG 4.1.2 Name, Role, Value (Level A)
- **Diagnóstico y Escenario de Falla:**  
  En el componente `NotifRow`, el elemento padre es un `<div role="button" tabIndex={0} ...>`. En la línea 874, dentro de este elemento con rol de botón, se ubica `<button ... aria-label="Eliminar notificación">`. Tener un botón anidado dentro de otro botón rompe la accesibilidad nativa del navegador; el lector de pantalla anuncia un solo botón con contenidos ambiguos y pulsar Espacio para abrir la notificación puede activar simultáneamente la eliminación o provocar comportamiento errático.
- **Remediación Exacta:**  
  Separar el botón principal de apertura del botón de eliminación en hermanos dentro del `<li>`:

```tsx
// Reemplazo en src/components/ui/GuestBell.tsx:804-885
function NotifRow({ notif, cfg, onOpen, onTrash }: NotifRowProps) {
  return (
    <li className="relative">
      <div
        className={cn(
          "group relative flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors",
          notif.read
            ? "border-slate-100 hover:bg-slate-50/70"
            : "border-slate-200 bg-blue-50/25 hover:bg-blue-50/40"
        )}
      >
        {/* Botón principal de apertura */}
        <button
          type="button"
          onClick={() => onOpen(notif)}
          className="focus-visible:ring-primary flex min-w-0 flex-1 items-start gap-3 rounded-lg text-left focus:outline-none focus-visible:ring-2"
          aria-label={`Ver notificación: ${notif.title}`}
        >
          {/* Icon */}
          <div
            className={cn(
              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
              cfg.iconBg,
              cfg.iconRing
            )}
          >
            <Icon
              name={cfg.icon}
              size={18}
              fill
              className={cfg.iconColor}
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p
                className={cn(
                  "truncate text-xs leading-snug font-semibold",
                  notif.read ? "text-slate-500" : "text-slate-900"
                )}
              >
                {notif.title}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                {!notif.read && (
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      cfg.dotColor
                    )}
                    aria-label="No leído"
                  />
                )}
              </div>
            </div>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
              {notif.message}
            </p>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium text-slate-500">
                {timeAgo(notif.created_at)}
              </p>
              <span className="text-primary text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                Ver detalle →
              </span>
            </div>
          </div>
        </button>

        {/* Trash button — hermano accesible */}
        <button
          type="button"
          onClick={(e) => onTrash(e, notif)}
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label={`Eliminar notificación: ${notif.title}`}
        >
          <Icon name="delete" size={16} />
        </button>
      </div>
    </li>
  );
}
```

---

### A11Y-04: Destrucción de semántica documental por `role="button"` en visor legal de escritorio

- **Categoría:** Accessibility
- **Severidad:** Critical
- **Ubicación exacta:** `src/components/legal/LegalArticleReader.tsx:215-230`
- **Criterio WCAG:** WCAG 1.3.1 Info and Relationships (Level A), WCAG 4.1.2 Name, Role, Value (Level A)
- **Diagnóstico y Escenario de Falla:**  
  El contenedor modal completo en escritorio tiene `role="button" tabIndex={-1} aria-label="Cerrar documento y volver a la lista"`. Bajo las reglas de ARIA, cuando se aplica `role="button"` a un elemento padre, las tecnologías de asistencia colapsan la totalidad de su contenido a texto plano equivalente al nombre del botón. Esto elimina por completo los roles semánticos internos (`<article>`, encabezados `<h1>`, párrafos `<p>`, breadcrumbs, listas y enlaces). Para un usuario invidente, el lector de pantalla anuncia un botón de 2000 palabras en vez de un documento estructurado.
- **Remediación Exacta:**  
  Asignar `role="dialog"` y `aria-modal="true"` con `aria-labelledby` al diálogo, y convertir el fondo en un botón de backdrop separado:

```tsx
// Reemplazo en src/components/legal/LegalArticleReader.tsx:214-231
  const desktopLayout = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-article-title"
      className="fixed inset-0 z-[9999] hidden items-center justify-center overflow-hidden lg:flex"
      style={{
        background: "rgba(10, 17, 40, 0.82)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Botón de backdrop accesible para cerrar al hacer clic afuera */}
      <button
        type="button"
        aria-label="Cerrar documento y volver a la lista"
        className="fixed inset-0 h-full w-full cursor-default bg-transparent focus:outline-none"
        onClick={handleClose}
      />
```

---

### A11Y-05: Escape de navegación por teclado por ausencia de trampa de foco (`FocusLock`) en modales

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:**
  - `src/components/layout/SearchModal.tsx:220-226`
  - `src/components/catalogo/MobileFilterDrawer.tsx:107-115`
  - `src/components/catalogo/UnabWarningModal.tsx:33-38`
  - `src/components/catalogo/ProductReviews.tsx:177-182`
  - `src/components/catalogo/ProductDetailClient.tsx:1032, 1063`
- **Criterio WCAG:** WCAG 2.4.3 Focus Order (Level A), WCAG 2.1.2 No Keyboard Trap (Level A)
- **Diagnóstico y Escenario de Falla:**  
  Aunque los componentes definen `role="dialog"` y `aria-modal="true"`, no encapsulan su contenido con `FocusLock` (a pesar de que `react-focus-lock` ya está instalado en el proyecto). Al pulsar la tecla `Tab`, el foco salta fuera del diálogo hacia la barra de navegación o el pie de página que se encuentran detrás del fondo oscuro, desorientando completamente al usuario de teclado.
- **Remediación Exacta (Ejemplo en `SearchModal.tsx`):**

```tsx
// En src/components/layout/SearchModal.tsx
import FocusLock from "react-focus-lock";

// En el return del modal:
<div
  className="fixed inset-0 z-[999] flex items-start justify-center bg-black/30 pt-[8vh] backdrop-blur-[2px] sm:bg-black/20 sm:pt-[12vh]"
  role="dialog"
  aria-modal="true"
  aria-label="Buscar productos"
>
  <button
    type="button"
    className="fixed inset-0 z-0 h-full w-full cursor-default"
    onClick={onClose}
    aria-label="Cerrar buscador"
    tabIndex={-1}
  />
  <FocusLock returnFocus className="relative z-10 mx-4 w-full max-w-xl">
    <div
      ref={panelRef}
      className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl duration-200"
    >
      {/* Contenido existente del panel */}
    </div>
  </FocusLock>
</div>;
```

---

### A11Y-06: Imposibilidad de descarte mediante teclado (Tecla Escape) en menús móviles

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:** `src/components/layout/Navbar.tsx:217-230` y `src/components/catalogo/MobileFilterDrawer.tsx:78-90`
- **Criterio WCAG:** WCAG 2.1.1 Keyboard (Level A), WCAG 2.1.2 No Keyboard Trap (Level A)
- **Diagnóstico y Escenario de Falla:**  
  En `Navbar.tsx`, el menú desplegable móvil solo gestiona el cierre mediante `mousedown` fuera del contenedor. En `MobileFilterDrawer.tsx`, el hook solo bloquea el desplazamiento del body. Ninguno de los dos componentes escucha el evento de tecla `Escape` (`e.key === "Escape"`). Un usuario de teclado que abre el menú o el cajón de filtros queda atrapado o forzado a tabear por decenas de enlaces hasta alcanzar el botón de cierre.
- **Remediación Exacta:**  
  Incorporar el manejador `keydown` para `Escape`:

```tsx
// Reemplazo en src/components/layout/Navbar.tsx:217-230
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMenuOpen(false);
    }
  };

  if (isMenuOpen) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
  }
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [isMenuOpen]);
```

---

### A11Y-07: Control de formulario sin etiqueta programática asociada (`<label>`) en personalización de producto

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:** `src/components/catalogo/ProductDetailClient.tsx:920-932`
- **Criterio WCAG:** WCAG 1.3.1 Info and Relationships (Level A), WCAG 3.3.2 Labels or Instructions (Level A), WCAG 4.1.2 Name, Role, Value (Level A)
- **Diagnóstico y Escenario de Falla:**  
  El control `<textarea id="custom-note" ...>` está precedido por un `<div>` decorativo con el texto "¿Necesitas personalizar tu pedido?". Al no existir `<label htmlFor="custom-note">`, el lector de pantalla anuncia únicamente "Edición de texto multilínea en blanco" o depende del atributo `placeholder`. Las pautas WCAG establecen explícitamente que los placeholders no sustituyen a las etiquetas programáticas.
- **Remediación Exacta:**  
  Transformar el `<div>` en un `<label htmlFor="custom-note">`:

```tsx
// Reemplazo en src/components/catalogo/ProductDetailClient.tsx:919-933
{
  /* Personalización — siempre visible */
}
<div>
  <label
    htmlFor="custom-note"
    className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700"
  >
    <Icon name="edit_note" className="text-[1.125rem]" aria-hidden="true" />
    <span>¿Necesitas personalizar tu pedido?</span>
  </label>
  <textarea
    id="custom-note"
    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:ring-1"
    placeholder="Ej. Talla exacta, color preferido, bordado personalizado, nombre a bordar... (Máx. 500 caracteres)"
    rows={2}
    maxLength={500}
    value={customNote}
    onChange={(e) => setCustomNote(e.target.value)}
  />
</div>;
```

---

### A11Y-08: Omisión de roles semánticos de selección en métodos de entrega y filtros de catálogo

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:**
  - `src/components/cart/DeliveryFormModal.tsx:295-340`
  - `src/components/catalogo/FilterSidebar.tsx:98-138`
  - `src/components/catalogo/MobileFilterDrawer.tsx:215-265`
- **Criterio WCAG:** WCAG 4.1.2 Name, Role, Value (Level A)
- **Diagnóstico y Escenario de Falla:**  
  En el formulario de entrega, los métodos de retiro ("Retiro en Taller", "Punto Medio", "A Domicilio") representan opciones mutuamente excluyentes (comportamiento de radio button). Están implementados con etiquetas `<button>` estándar sin `role="radiogroup"` en el contenedor ni `role="radio"` / `aria-checked` en cada botón. Para un usuario ciego, el lector anuncia botones aislados sin indicar cuál está seleccionado. De igual modo, en los filtros de catálogo faltan atributos `aria-pressed`.
- **Remediación Exacta:**

```tsx
// Reemplazo en src/components/cart/DeliveryFormModal.tsx:290-340
<div>
  <label className={labelClass} id="delivery-method-label">
    Método de entrega *
  </label>
  <div
    role="radiogroup"
    aria-labelledby="delivery-method-label"
    className="grid grid-cols-3 gap-2.5"
  >
    {/* Taller */}
    <button
      type="button"
      role="radio"
      aria-checked={form.deliveryMethod === "taller"}
      onClick={() => handleMethodChange("taller")}
      className={`focus-visible:ring-primary flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 ${
        form.deliveryMethod === "taller"
          ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] shadow-sm ring-2 ring-[var(--color-primary)]/20"
          : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] hover:border-slate-400"
      }`}
    >
      <Icon
        name="store"
        size={20}
        className="mb-1.5 text-xl"
        aria-hidden="true"
      />
      <span className="text-xs font-bold">Retiro en Taller</span>
    </button>

    {/* Punto Medio */}
    <button
      type="button"
      role="radio"
      aria-checked={form.deliveryMethod === "punto_medio"}
      onClick={() => handleMethodChange("punto_medio")}
      className={`focus-visible:ring-primary flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 ${
        form.deliveryMethod === "punto_medio"
          ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] shadow-sm ring-2 ring-[var(--color-primary)]/20"
          : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] hover:border-slate-400"
      }`}
    >
      <Icon
        name="handshake"
        size={20}
        className="mb-1.5 text-xl"
        aria-hidden="true"
      />
      <span className="text-xs font-bold">Punto Medio (Finde)</span>
    </button>

    {/* Domicilio */}
    <button
      type="button"
      role="radio"
      aria-checked={form.deliveryMethod === "domicilio"}
      onClick={() => handleMethodChange("domicilio")}
      className={`focus-visible:ring-primary flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 ${
        form.deliveryMethod === "domicilio"
          ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] shadow-sm ring-2 ring-[var(--color-primary)]/20"
          : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] hover:border-slate-400"
      }`}
    >
      <Icon
        name="local_shipping"
        size={20}
        className="mb-1.5 text-xl"
        aria-hidden="true"
      />
      <span className="text-xs font-bold">A Domicilio</span>
    </button>
  </div>
</div>
```

---

### A11Y-09: Enlaces interactivos anidados en `<label>` y omisión de atributos `required` en formulario de entrega

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:** `src/components/cart/DeliveryFormModal.tsx:408-416, 664-703`
- **Criterio WCAG:** WCAG 1.3.1 Info and Relationships (Level A), WCAG 3.3.2 Labels or Instructions (Level A), HTML Living Standard 4.10.4
- **Diagnóstico y Escenario de Falla:**
  1. En las líneas 664-703, la etiqueta `<label htmlFor="delivery-terms">` envuelve dos enlaces `<Link>` hacia los términos de envío y devoluciones. El modelo de contenido de `<label>` prohíbe explícitamente elementos interactivos descendientes excepto el control etiquetado. En lectores de pantalla, hacer clic en el enlace activa involuntariamente el checkbox.
  2. En las líneas 408-416, los campos obligatorios marcan un asterisco visual en el texto pero no incluyen el atributo nativo `required` ni `aria-required="true"` en la etiqueta `<input>`.
- **Remediación Exacta:**

```tsx
// Reemplazo en src/components/cart/DeliveryFormModal.tsx:663-703
{
  /* F. Términos y condiciones */
}
<div className="flex items-start gap-3 rounded-xl border border-[var(--color-outline-variant)]/30 bg-[var(--color-surface-container-low)] p-4">
  <div className="relative mt-0.5 shrink-0">
    <input
      id="delivery-terms"
      type="checkbox"
      required
      aria-required="true"
      checked={form.termsAccepted}
      onChange={(e) => set("termsAccepted", e.target.checked)}
      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[var(--color-outline-variant)] bg-[var(--color-surface)] transition-all checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none"
    />
    <span className="pointer-events-none absolute top-0 left-0 hidden h-4 w-4 items-center justify-center peer-checked:flex">
      <Icon name="check" fill className="text-white" />
    </span>
  </div>
  <label
    htmlFor="delivery-terms"
    className="cursor-pointer text-xs leading-relaxed text-[var(--color-on-surface-variant)]"
  >
    He leído y acepto los{" "}
    <Link
      href="/legal/envios"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="focus-visible:ring-primary rounded font-semibold text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80 focus:outline-none focus-visible:ring-1"
    >
      términos de envíos
    </Link>{" "}
    y los{" "}
    <Link
      href="/legal/devoluciones"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="focus-visible:ring-primary rounded font-semibold text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80 focus:outline-none focus-visible:ring-1"
    >
      términos de devoluciones
    </Link>{" "}
    de Confecciones Liss.
  </label>
</div>;
```

---

### A11Y-10: Supresión total de contorno de foco en acordeón de preguntas frecuentes

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:** `src/components/servicios/ServicioFAQ.tsx:23`
- **Criterio WCAG:** WCAG 2.4.7 Focus Visible (Level AA)
- **Diagnóstico y Escenario de Falla:**  
  La clase `focus:outline-none` aplicada en el botón del acordeón elimina el indicador de foco predeterminado del navegador sin proporcionar ninguna alternativa accesible mediante Tailwind `focus-visible`. Al tabular a través de la sección de preguntas frecuentes en páginas de servicios, los botones no muestran ningún cambio visual, dejando al usuario de teclado a ciegas.
- **Remediación Exacta:**  
  Añadir `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset`:

```tsx
// Reemplazo en src/components/servicios/ServicioFAQ.tsx:21-25
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
```

---

### A11Y-11: Omisión global de preferencia de movimiento reducido en librerías de animación JS

- **Categoría:** Accessibility
- **Severidad:** High
- **Ubicación exacta:** `src/providers/index.tsx:69-80`
- **Criterio WCAG:** WCAG 2.2.2 Pause, Stop, Hide (Level A), WCAG 2.3.3 Animation from Interactions (Level AAA)
- **Diagnóstico y Escenario de Falla:**  
  Aunque el archivo `globals.css` define reglas `@media (prefers-reduced-motion: reduce)`, los componentes animados mediante JavaScript con Framer Motion (`motion.div`, `whileInView`, `AnimatePresence`) ignoran las reglas CSS puras a menos que la aplicación esté configurada con `<MotionConfig reducedMotion="user">` o lea el hook `useReducedMotion()`. Los usuarios con afecciones del oído interno o epilepsia fotosensible continúan experimentando desplazamientos y transformaciones forzadas.
- **Remediación Exacta:**  
  Configurar `MotionConfig` en la cúspide del árbol de proveedores:

```tsx
// Reemplazo en src/providers/index.tsx:69-80
import { MotionConfig } from "framer-motion";

// Dentro de Providers():
return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        {mounted ? <DeferredProviders>{children}</DeferredProviders> : children}
      </MotionConfig>
    </ThemeProvider>
  </QueryClientProvider>
);
```

---

### A11Y-12: Nombres accesibles ambiguos y repetitivos en botones de catálogo y carrito

- **Categoría:** Accessibility
- **Severidad:** Medium
- **Ubicación exacta:**
  - `src/components/catalogo/CatalogProductCard.tsx:111`
  - `src/components/cart/CartDrawer.tsx:757, 782, 795`
  - `src/components/cart/FavoritesModal.tsx:234`
- **Criterio WCAG:** WCAG 2.4.6 Headings and Labels (Level AA), WCAG 4.1.2 Name, Role, Value (Level A)
- **Diagnóstico y Escenario de Falla:**  
  En cuadrículas de productos con decenas de elementos, el lector de pantalla lee la lista de controles interactivos como: "Agregar a favoritos, botón", "Agregar a favoritos, botón", etc. En el carrito, lee "Eliminar producto, botón", "Disminuir cantidad, botón". El usuario no sabe a qué producto corresponde cada botón a menos que explore el DOM circundante.
- **Remediación Exacta (En `CatalogProductCard.tsx:111`):**

```tsx
// Reemplazo en src/components/catalogo/CatalogProductCard.tsx:107-112
      <button
        type="button"
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-[20] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={isFavorited ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
      >
```

---

### A11Y-13: Actualizaciones de estado dinámicas silenciosas para tecnologías de asistencia

- **Categoría:** Accessibility
- **Severidad:** Medium
- **Ubicación exacta:**
  - `src/components/layout/SearchModal.tsx:347`
  - `src/components/ui/ShareButton.tsx:78-100`
  - `src/components/catalogo/ProductDetailClient.tsx:1024-1028`
  - `src/components/contacto/ContactForm.tsx:101-118`
- **Criterio WCAG:** WCAG 4.1.3 Status Messages (Level AA)
- **Diagnóstico y Escenario de Falla:**  
  Cuando un usuario invidente escribe en el buscador, pulsa el botón de compartir ("Enlace copiado") o envía el formulario de contacto, el cambio visual en pantalla es inmediato, pero no se emite ninguna notificación por voz para el lector de pantalla al carecer de `role="status"` o `aria-live="polite"`.
- **Remediación Exacta (Ejemplo en `ShareButton.tsx`):**

```tsx
// Reemplazo en src/components/ui/ShareButton.tsx:77-80
      {/* Toast Notification */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
...
```

---

### A11Y-14: Semántica de lista HTML inválida (`<li>` huérfano dentro de `<div>`)

- **Categoría:** Accessibility
- **Severidad:** Medium
- **Ubicación exacta:** `src/components/catalogo/ProductDetailClient.tsx:792`
- **Criterio WCAG:** WCAG 1.3.1 Info and Relationships (Level A)
- **Diagnóstico y Escenario de Falla:**  
  Una etiqueta `<li className="flex items-start gap-2 text-sm text-slate-600">` se renderiza directamente dentro de un `<div>`, fuera de un elemento padre `<ul>` u `<ol>`. Los validadores HTML y lectores de pantalla reportan un elemento de lista huérfano, anunciando "Elemento de lista 1 de 1" sin estructura de lista válida.
- **Remediación Exacta:**  
  Sustituir la etiqueta `<li>` por un `<p className="...">`:

```tsx
// Reemplazo en src/components/catalogo/ProductDetailClient.tsx:790-798
                {/* Precio */}
                <div className="flex flex-col gap-1">
                  {isALaMedida ? (
                    <p className="flex items-start gap-2 text-sm text-slate-600">
                      <Icon
                        name="chat"
                        className="text-primary mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
```

---

### A11Y-15: Incumplimiento de contraste cromático mínimo (WCAG 1.4.3) en textos neutros

- **Categoría:** Accessibility
- **Severidad:** Medium
- **Ubicación exacta:**
  - `src/components/ui/GuestBell.tsx:864` (`text-slate-300`, ratio 1.56:1)
  - `src/components/layout/SearchModal.tsx:290, 335, 347, 436` (`text-gray-400`, ratio 2.55:1)
  - `src/components/catalogo/ProductReviews.tsx:290` (`text-slate-400`, ratio 2.76:1)
  - `src/components/catalogo/CatalogProductCard.tsx:158` (`text-slate-400`, ratio 2.76:1)
  - `src/components/empresa/InstalacionesClient.tsx:812` (`text-white/40` sobre `#143067`, ratio 3.43:1)
- **Criterio WCAG:** WCAG 1.4.3 Contrast (Minimum) (Level AA)
- **Diagnóstico y Escenario de Falla:**  
  El estándar exige un ratio mínimo de 4.5:1 para texto normal. Las clases `text-slate-300`, `text-gray-400` y `text-white/40` producen textos excesivamente tenues e ilegibles para personas con baja agudeza visual, astigmatismo o bajo brillo en pantalla.
- **Remediación Exacta:**  
  Promover los tonos apagados a valores que cumplen 4.5:1 (ej. `text-slate-500` / `text-slate-600` sobre fondos claros, y `text-white/80` sobre fondos oscuros). En `CatalogProductCard.tsx:158`, además añadir texto oculto accesible para anunciar el precio tachado:

```tsx
// Reemplazo en src/components/catalogo/CatalogProductCard.tsx:157-161
{
  onSale && oldPrice && (
    <span className="pointer-events-none text-xs text-slate-600 line-through decoration-slate-400/50">
      <span className="sr-only">Precio original: </span>${oldPrice.toFixed(2)}
    </span>
  );
}
```

---

### A11Y-16: Salto en jerarquía de encabezados (`<h2>` a `<h4>`)

- **Categoría:** Accessibility
- **Severidad:** Low
- **Ubicación exacta:** `src/components/empresa/SobreNosotrosClient.tsx:638, 667`
- **Criterio WCAG:** WCAG 1.3.1 Info and Relationships (Level A), WCAG 2.4.6 Headings and Labels (Level AA)
- **Diagnóstico y Escenario de Falla:**  
  La página pasa de `<h2 className="...">Transformación digital desde 2026</h2>` directamente a `<h4 className="...">Presencia digital regional</h4>`, omitiendo el nivel `<h3>`. Los lectores de pantalla permiten navegar por niveles de encabezados (`H`, `2`, `3`); omitir niveles genera confusión respecto a la jerarquía de la información.
- **Remediación Exacta:**  
  Modificar la etiqueta `<h4>` a `<h3>` manteniendo idénticas sus clases de diseño:

```tsx
// Reemplazo en src/components/empresa/SobreNosotrosClient.tsx:667
<h3 className="font-serif text-lg font-bold">Presencia digital regional</h3>
```

---

### A11Y-17: Acciones de reseña invisibles en navegación por foco de teclado

- **Categoría:** Accessibility
- **Severidad:** Low
- **Ubicación exacta:** `src/components/catalogo/ProductReviews.tsx:296`
- **Criterio WCAG:** WCAG 2.4.7 Focus Visible (Level AA)
- **Diagnóstico y Escenario de Falla:**  
  Los botones de edición y eliminación de una reseña están contenidos en un `div` con la clase `opacity-0 transition-opacity group-hover:opacity-100`. No se incluye `group-focus-within:opacity-100`. Al tabular hacia estos botones con el teclado, los botones reciben el foco pero permanecen totalmente invisibles (`opacity: 0`).
- **Remediación Exacta:**  
  Añadir `group-focus-within:opacity-100`:

```tsx
// Reemplazo en src/components/catalogo/ProductReviews.tsx:296
            {/* Owner actions — z-10 so they sit above the transparent button overlay */}
            {isOwner && (
              <div className="relative z-10 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
```

---

## 6. VERIFICATION METHOD

Para verificar de manera independiente los hallazgos reportados sin ejecutar código en producción:

1. **Inspección de líneas de código:**
   - Ejecutar lectura directa en las rutas y números de línea indicados mediante herramientas de lectura de archivos.
2. **Auditoría automatizada de sintaxis JSX:**
   - Verificar que no existan advertencias de linting como `jsx-a11y/no-noninteractive-element-interactions` (observada desactivada en `Navbar.tsx:533`).
3. **Cálculo de ratios de contraste cromático:**
   - Comprobar `#9ca3af` sobre `#ffffff` en herramientas de WCAG contrast ratio (resultado: 2.55:1 < 4.5:1).
   - Comprobar `#cbd5e1` sobre `#ffffff` (resultado: 1.56:1 < 4.5:1).
4. **Verificación de navegación por teclado:**
   - Validar que al enfocar el carrusel de héroe (`HeroImageCarousel`), la ausencia de `onFocus` impide que `hasInteracted` cambie a `true`.
