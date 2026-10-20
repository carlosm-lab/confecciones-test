# Reglas de Git, Entornos y Despliegue para Confecciones Liss

## 1. Política Estricta de Repositorios (Desarrollo vs. Producción)

- **Repositorio de Desarrollo Obligatorio (`confecciones-test`)**:
  - URL: `https://github.com/carlosm-lab/confecciones-test.git` (alias: `desarrollo`).
  - **DESTINO EXCLUSIVO POR DEFECTO**: Todo commit y todo `git push` realizado durante el ciclo de desarrollo debe enviarse ÚNICA Y EXCLUSIVAMENTE a este repositorio (`git push desarrollo <rama>`).
- **Prohibición Absoluta de Tocar Producción (`confeccionesliss`)**:
  - URL: `https://github.com/carlosm-lab/confeccionesliss.git` (alias: `origin` y `produccion`).
  - **BAJO NINGUNA CIRCUNSTANCIA** los agentes de IA tienen permitido realizar `git push`, merge o despliegue hacia los remotes `origin` o `produccion`.
  - **PROTOCOLO DE DOBLE CONFIRMACIÓN OBLIGATORIO**: Producción NUNCA se tocará de forma automática. Solo podrá modificarse o recibir un push si se cumplen dos condiciones simultáneas: (1) El usuario solicita explícitamente enviar cambios a producción, Y (2) El agente solicita una segunda confirmación directa y el usuario la aprueba formalmente antes de ejecutar la acción.
- **Rama de Trabajo Principal**: La rama estándar de trabajo y versiones es `master`.
- **Prohibición de `main`**: Está prohibido realizar commits o push a la rama `main`, a menos que el usuario lo solicite explícitamente.
- **Verificación Previa a Push**: Antes de ejecutar cualquier comando de push, el agente debe verificar que el comando apunte explícitamente al remoto `desarrollo`.

## # Directiva Inviolable de Preservación de Diseño, Interfaz y Seguridad

- **CERO CAMBIOS VISUALES O DE COMPORTAMIENTO**: Bajo NINGUNA circunstancia los agentes de IA pueden alterar la interfaz visual, el diseño, los colores, fuentes, espaciados, bordes, elementos gráficos o animaciones que el usuario ve en pantalla.
- **PROHIBIDO MODIFICAR SEGURIDAD**: Las directivas de seguridad (CSP, encabezados de respuesta, etc.) deben respetarse al máximo y no se deben desactivar o vulnerar bajo pretexto de optimización de rendimiento o velocidad.
- **PRESERVACIÓN DE FUNCIONALIDAD**: Toda animación, interacción, efecto de transición visual o lógica funcional existente (como menús desplegables, carruseles, carga de iconos, sliders, etc.) se debe mantener exactamente idéntica y prístina en su comportamiento original.
- **LIBERTAD DE IMPLEMENTACIÓN TÉCNICA**: Los agentes pueden cambiar la tecnología de fondo, la arquitectura del estado, proxies, optimizar recursos (ej. convertir imágenes de PNG a WebP manteniendo dimensiones y proporciones originales), usar SSR/SSG dinámico, modularizar componentes React/Next.js, etc. Pero el render final resultante de cara al usuario debe ser **pixel-perfect y funcionalmente idéntico**.
- **CERO ALTERACIÓN DE PIXELES/ANIMACIONES**: No se permite remover animaciones (ej. fade-ins), modificar comportamientos de scroll, o quitar interactividades para mejorar puntajes en análisis automáticos como Lighthouse / PageSpeed. La estética y la experiencia de usuario originales son prioritarias e inalterables.
