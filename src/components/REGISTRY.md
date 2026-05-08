# Catálogo de Componentes (Registry)

Este archivo documenta los componentes UI disponibles en el proyecto, sus props y ejemplos de uso.

## Layout Components

### Navbar

- **Ruta:** `src/components/layout/Navbar.tsx`
- **Descripción:** Barra de navegación principal que incluye el logo optimizado, enlaces de navegación responsivos, y un botón decorativo de búsqueda.
- **Props:** No recibe props.

### Footer

- **Ruta:** `src/components/layout/Footer.tsx`
- **Descripción:** Pie de página principal que incluye información de contacto, logo optimizado, y enlaces a recursos legales.
- **Props:** No recibe props.

### WhatsAppButton

- **Ruta:** `src/components/layout/WhatsAppButton.tsx`
- **Descripción:** Botón flotante persistente con el logo de WhatsApp (usando `react-icons`) que dirige a los clientes a la página de contacto de WhatsApp.
- **Props:** No recibe props.

## SEO Components

### ServiciosPrincipales

- **Ruta:** `src/components/seo/ServiciosPrincipales.tsx`
- **Descripción:** Componente que expone los servicios clave mediante Schema.org validado para SEO. Utiliza `isomorphic-dompurify` para inyectar JSON-LD de manera segura previniendo XSS.
- **Props:** No recibe props.
