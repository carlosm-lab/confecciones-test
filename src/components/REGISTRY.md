# Catálogo de Componentes (Registry)

Este archivo documenta los componentes UI disponibles en el proyecto, sus props y ejemplos de uso.

## Layout Components

### Navbar

- **Ruta:** `src/components/layout/Navbar.tsx`
- **Descripción:** Barra de navegación principal con logo, enlaces de catálogo (Salud, Universitario, Escolar, Corporativo), búsqueda y menú hamburguesa para mobile.
- **Props:** No recibe props.

### Footer

- **Ruta:** `src/components/layout/Footer.tsx`
- **Descripción:** Pie de página principal que incluye información de contacto, logo optimizado, y enlaces a recursos legales.
- **Props:** No recibe props.

### WhatsAppButton

- **Ruta:** `src/components/layout/WhatsAppButton.tsx`
- **Descripción:** Botón flotante persistente con el logo de WhatsApp (usando `react-icons`) que dirige a los clientes a la página de contacto de WhatsApp.
- **Props:** No recibe props.

## UI Components

### Breadcrumb

- **Ruta:** `src/components/ui/Breadcrumb.tsx`
- **Descripción:** Navegación jerárquica reutilizable con soporte para ítems dinámicos. Cada ítem puede ser un enlace o el elemento activo actual.
- **Props:**
  - `items: { label: string; href?: string }[]` — Lista de ítems del breadcrumb.
  - `className?: string` — Clases CSS adicionales.
- **Ejemplo:** `<Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Catálogo" }]} />`

### Badge

- **Ruta:** `src/components/ui/Badge.tsx`
- **Descripción:** Insignia con variantes visuales para indicar estados de productos (nuevo, popular, oferta, etc.).
- **Props:**
  - `children: ReactNode` — Contenido del badge.
  - `variant?: "primary" | "accent" | "success" | "warning" | "neutral" | "outline"` — Variante visual.
  - `className?: string` — Clases CSS adicionales.
- **Ejemplo:** `<Badge variant="accent">Nuevo</Badge>`

### CategoryChip

- **Ruta:** `src/components/ui/CategoryChip.tsx`
- **Descripción:** Chip de filtro de categoría con estado activo y soporte para íconos Lucide.
- **Props:**
  - `label: string` — Texto del chip.
  - `icon?: LucideIcon` — Ícono de Lucide React.
  - `isActive?: boolean` — Estado activo.
  - `onClick?: () => void` — Callback al hacer clic.
  - `className?: string` — Clases CSS adicionales.
- **Ejemplo:** `<CategoryChip label="Scrubs" isActive={true} onClick={() => {}} />`

### ProductCard

- **Ruta:** `src/components/ui/ProductCard.tsx`
- **Descripción:** Tarjeta de producto reutilizable con imagen, badge, precio (con prefijo/sufijo), tallas, botón de favorito y botón agregar al carrito.
- **Props:**
  - `id: string` — Identificador único del producto.
  - `nombre: string` — Nombre del producto.
  - `precio: number` — Precio del producto.
  - `precioAnterior?: number | null` — Precio anterior (tachado).
  - `categoria: string` — Categoría del producto.
  - `imagen?: string | null` — URL de la imagen.
  - `imageAlt?: string` — Texto alternativo de la imagen.
  - `tallas?: string[]` — Lista de tallas disponibles.
  - `showBadge?: boolean` — Mostrar badge.
  - `badgeText?: string` — Texto del badge.
  - `showFavorite?: boolean` — Mostrar botón de favorito.
  - `pricePrefix?: string` — Prefijo del precio.
  - `priceSuffix?: string` — Sufijo del precio (ej: "/unid.").
  - `onAddToCart?: () => void` — Callback agregar al carrito.
  - `onToggleFavorite?: () => void` — Callback favorito.
  - `className?: string` — Clases CSS adicionales.

### Pagination

- **Ruta:** `src/components/ui/Pagination.tsx`
- **Descripción:** Componente de paginación accesible con soporte para elipsis y aria labels.
- **Props:**
  - `currentPage: number` — Página actual.
  - `totalPages: number` — Total de páginas.
  - `onPageChange?: (page: number) => void` — Callback de cambio de página.
  - `className?: string` — Clases CSS adicionales.

## Catálogo Components

### CatalogHero

- **Ruta:** `src/components/catalogo/CatalogHero.tsx`
- **Descripción:** Hero section reutilizable para las categorías del catálogo con título, subtítulo, descripción e ícono.
- **Props:**
  - `title: string` — Título principal.
  - `subtitle?: string` — Subtítulo con badge.
  - `description: string` — Descripción.
  - `icon?: string` — Ícono Material Symbols.
  - `bgClassName?: string` — Clase de fondo CSS.
  - `children?: ReactNode` — Contenido adicional.

### FilterSidebar

- **Ruta:** `src/components/catalogo/FilterSidebar.tsx`
- **Descripción:** Sidebar de filtros colapsable con checkboxes agrupados por categoría.
- **Props:**
  - `groups: FilterGroup[]` — Grupos de filtros con opciones.
  - `onFilterChange?: (group: string, values: string[]) => void` — Callback de cambio.
  - `className?: string` — Clases CSS adicionales.

### VolumePricingCard

- **Ruta:** `src/components/catalogo/VolumePricingCard.tsx`
- **Descripción:** Tabla de precios por volumen con soporte para highlight de mejor tier.
- **Props:**
  - `title?: string` — Título de la tabla.
  - `description?: string` — Descripción.
  - `tiers: { range: string; discount: string; highlight?: boolean }[]` — Niveles de precio.
  - `className?: string` — Clases CSS adicionales.

### ProcessSteps

- **Ruta:** `src/components/catalogo/ProcessSteps.tsx`
- **Descripción:** Timeline visual del proceso de pedido con pasos numerados y conectores.
- **Props:**
  - `title?: string` — Título de la sección.
  - `steps: { number: number; title: string; description: string; icon?: string }[]` — Pasos.
  - `className?: string` — Clases CSS adicionales.

### QuoteForm

- **Ruta:** `src/components/catalogo/QuoteForm.tsx`
- **Descripción:** Formulario de cotización corporativa con campos de nombre, empresa, email, teléfono, cantidad y mensaje.
- **Props:**
  - `className?: string` — Clases CSS adicionales.

## SEO Components

### ServiciosPrincipales

- **Ruta:** `src/components/seo/ServiciosPrincipales.tsx`
- **Descripción:** Componente que expone los servicios clave mediante Schema.org validado para SEO. Utiliza `isomorphic-dompurify` para inyectar JSON-LD de manera segura previniendo XSS.
- **Props:** No recibe props.
