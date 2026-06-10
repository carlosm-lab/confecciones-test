# Architecture Decision Records (ADR)

This document tracks important architectural decisions made during the project lifecycle.
**CRITICAL RULE:** Whenever you (the AI agent) decide on a significant technical approach (e.g., state management structure, API integration pattern, routing changes), you MUST document it here.

## Template for new decisions:

### Format

**Date:** YYYY-MM-DD
**Decision:** [What was decided?]
**Context:** [Why was this decided? What problem does it solve?]
**Consequences:** [What are the trade-offs or things to keep in mind moving forward?]

---

## Logged Decisions

_ (Add new decisions below this line)_

**Date:** 2026-04-23
**Decision:** Patrón Server Actions con Zod y next-safe-action
**Context:** Se usa `next-safe-action` combinado con esquemas `Zod` estrictos ubicados en `src/schemas/` para validar toda la información que entra al sistema (Auth, Profiles, Products, Orders).
**Consequences:** Las mutaciones son Type-Safe de extremo a extremo y seguras. Los esquemas Zod también se pueden reutilizar en Client Components con `react-hook-form`.

---

**Date:** 2026-05-12
**Decision:** Category Hub + Búsqueda Inteligente para `/catalogo`
**Context:** El catálogo mostraba todos los productos con filtros excesivos (UnifiedCatalogClient), generando fricción cognitiva. Se adoptó el patrón "Category Hub" (inspirado en Nike, Apple, Amazon) donde `/catalogo` es una landing visual con 6 tarjetas de categoría que dirigen al usuario a su departamento específico. Se complementó con un buscador inteligente con dropdown de resultados en tiempo real (categorías + productos) integrado en el Navbar global.
**Consequences:** (1) El componente UnifiedCatalogClient queda huérfano — puede eliminarse o reutilizarse. (2) Las sub-páginas `/catalogo/[slug]` siguen funcionando sin cambios. (3) La búsqueda inteligente requiere importar ALL_PRODUCTS en el bundle del Navbar (impacto menor dado el inventario actual ~30 productos). (4) Se extendió CategoryConfig con `hubImage` y `hubTagline` en types.ts/categories.ts.

---

**Date:** 2026-05-12
**Decision:** SearchModal fullscreen reemplaza SearchDropdown inline
**Context:** El buscador inline (SearchDropdown dentro del Navbar) generaba problemas de usabilidad en mobile y limitaba el espacio para mostrar resultados. Se migró a un modal fullscreen (`SearchModal.tsx`) que se abre al hacer clic en la barra de búsqueda (que conserva su apariencia y animación typewriter). El modal incluye chips de categoría como estado inicial, filtrado de productos en tiempo real, y navegación a productos/catálogo.
**Consequences:** (1) `SearchDropdown.tsx` queda huérfano — puede eliminarse. (2) `TypewriterSearch` se reemplazó por `TypewriterPlaceholder` (solo visual, sin input real). (3) La lógica de búsqueda se movió de Navbar a SearchModal. (4) Body scroll se bloquea mientras el modal está activo.

---

**Date:** 2026-06-09
**Decision:** Reintegración de `/links` en `(public)` y remoción de `target="_blank"`
**Context:** La página `/links` (tipo Linktree) sufría crasheos recurrentes del renderizador de pestañas ("¡Oh, no!") en Google Chrome y otros navegadores Chromium en Android al presionar los enlaces a redes sociales. La causa raíz fue identificada como la combinación del atributo `target="_blank"` abriendo procesos renderer adicionales en combinación con la escasez de memoria RAM del dispositivo móvil, que gatillaba el Out-Of-Memory (OOM) Killer del sistema. Adicionalmente, el usuario requirió que `/links` formara parte de la navegación del sitio (Navbar, Footer, WhatsAppButton), en lugar de renderizarse aislada o como un archivo HTML estático.
**Consequences:** (1) La ruta se reubicó en `src/app/(public)/links/` para heredar el layout global. (2) Se removió por completo el atributo `target="_blank"` y `rel="noopener noreferrer"` de todos los enlaces de redes sociales dentro de `LinksPageClient.tsx`. (3) El sistema operativo móvil intercepta y abre las apps nativas (Instagram, Facebook, etc.) de forma directa mediante App Links / Intent, previniendo el crasheo y optimizando la experiencia del usuario. (4) El archivo estático de respaldo `public/links.html` fue eliminado.
