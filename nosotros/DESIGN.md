---
name: Artesano Heritage
colors:
  surface: "#f8f9fc"
  surface-dim: "#d8dadd"
  surface-bright: "#f8f9fc"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f2f4f6"
  surface-container: "#eceef0"
  surface-container-high: "#e7e8eb"
  surface-container-highest: "#e1e2e5"
  on-surface: "#191c1e"
  on-surface-variant: "#444650"
  inverse-surface: "#2e3133"
  inverse-on-surface: "#eff1f3"
  outline: "#757781"
  outline-variant: "#c4c6d1"
  surface-tint: "#455d96"
  primary: "#001b4a"
  on-primary: "#ffffff"
  primary-container: "#143067"
  on-primary-container: "#8299d7"
  inverse-primary: "#b1c5ff"
  secondary: "#b02d22"
  on-secondary: "#ffffff"
  secondary-container: "#fc6452"
  on-secondary-container: "#650001"
  tertiary: "#141d32"
  on-tertiary: "#ffffff"
  tertiary-container: "#2a3248"
  on-tertiary-container: "#929ab5"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#d9e2ff"
  primary-fixed-dim: "#b1c5ff"
  on-primary-fixed: "#001946"
  on-primary-fixed-variant: "#2c457d"
  secondary-fixed: "#ffdad5"
  secondary-fixed-dim: "#ffb4a9"
  on-secondary-fixed: "#410000"
  on-secondary-fixed-variant: "#8e130c"
  tertiary-fixed: "#dae2ff"
  tertiary-fixed-dim: "#bec6e2"
  on-tertiary-fixed: "#121b30"
  on-tertiary-fixed-variant: "#3e465d"
  background: "#f8f9fc"
  on-background: "#191c1e"
  surface-variant: "#e1e2e5"
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 36px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system reflects a balance between industrial manufacturing precision and the warmth of Salvadoran artisanal craftsmanship. The brand personality is rooted in "Confianza Familiar" (Family Trust)—positioning the product not just as a factory, but as a legacy partner for clients.

The visual style follows a **Modern Corporate** approach with **Tactile** accents. It utilizes high-quality typography and generous white space to signal professionalism, while integrating subtle textures and organic curves to maintain an approachable, human-centric feel. The aesthetic should evoke the stability of a long-standing institution and the meticulous detail of a master tailor.

## Colors

The palette is anchored by "Patriot Navy," symbolizing stability and the professional heritage of San Miguel. The "Terracotta Red" accent is used sparingly to draw attention to craftsmanship, heritage, and calls to action, drawing inspiration from traditional Salvadoran clay and textile dyes.

- **Primary (#143067):** Used for headers, primary buttons, and brand-heavy backgrounds.
- **Accent (#b43024):** Used for highlight states, specific semantic actions, and artisanal flourishes.
- **Surface & Background:** A crisp off-white background keeps the UI feeling airy, while pure white surfaces are used to define distinct content areas.
- **Light Container (#d7dffc):** A soft tint used for subtle grouping of information without the visual weight of a full border.

## Typography

The typographic scale creates a clear hierarchy between "The Authority" (Noto Serif) and "The Utility" (Manrope).

- **Headlines:** Noto Serif should be used for all editorial titles and section headings. It conveys the "Artisan" aspect of the brand.
- **Body & UI:** Manrope provides a clean, technical contrast that ensures legibility in catalogs, order forms, and manufacturing specs.
- **Letter Spacing:** Headlines use slightly tighter tracking to feel more cohesive, while labels use expanded tracking for better scannability at small sizes.

## Layout & Spacing

The layout philosophy uses a **Fixed Grid** for desktop (12-columns, 1200px max-width) and a **Fluid Grid** for mobile devices.

- **Rhythm:** An 8px linear scale governs all padding and margins.
- **White Space:** Use generous `lg` and `xl` spacing between major sections to evoke a premium, "boutique" manufacturing feel.
- **Grid Usage:** Components should align to the grid, but internal content (like cards) should use `md` (24px) padding to ensure the UI feels open and breathable.

## Elevation & Depth

Depth is achieved through a combination of **Tonal Layers** and **Ambient Shadows**.

1. **Flat Layer:** The background (#f8f9fb) serves as the canvas.
2. **Raised Layer:** White surfaces (#ffffff) use a very soft, diffused shadow (0px 4px 20px rgba(20, 48, 103, 0.06)) to appear gently lifted.
3. **Interactive Layer:** Upon hover, elements should increase their shadow spread slightly and introduce a 1px border using the "Light Container" color to simulate a physical edge.

To evoke textile textures, use a subtle SVG "weave" pattern (opacity 3%) as a background fill on primary-colored sections or large footers.

## Shapes

The design system uses **Rounded** corners to soften the industrial nature of manufacturing.

- **Standard Radius:** 8px for small components like inputs and buttons.
- **Large Radius (rounded-lg):** 16px for primary containers and product cards.
- **Textile Detail:** In specific decorative instances, a "dashed" stroke can be used on borders to mimic a stitching effect, particularly for secondary buttons or image frames.

## Components

- **Buttons:** Primary buttons are solid Navy (#143067) with white text and 8px corners. Secondary buttons use a Navy outline or the Terracotta Red (#b43024) for high-emphasis marketing actions.
- **Cards:** Product and service cards must use white backgrounds with the standard 16px radius and ambient shadow. Images within cards should have a subtle 4px radius.
- **Input Fields:** Use a 1px border of "Secondary Text" (#444650) at 20% opacity. Focus states transition to a 2px Navy border.
- **Chips/Badges:** Use the Light Container (#d7dffc) with Navy text for status indicators (e.g., "In Production," "Handmade").
- **Lists:** Use custom icons for list bullets—ideally a stylized "needle and thread" or a simple geometric square in Terracotta Red to reinforce the artisan theme.
- **Textile Overlays:** For image headers, use a subtle gradient overlay that transitions from a semi-transparent Navy to clear to ensure white text remains legible while maintaining the brand's color presence.
