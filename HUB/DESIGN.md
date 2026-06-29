---
name: Heritage Editorial
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
    lineHeight: "1.1"
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: "700"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.3"
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.4"
  title-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: "600"
    lineHeight: "1.5"
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.2"
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

The design system is built for a textile legacy that balances twenty years of craftsmanship with modern industrial precision. The brand personality is **authoritative, sophisticated, and bespoke**, evoking the feeling of a high-end editorial lookbook rather than a standard corporate portal.

The design style is a blend of **Minimalism** and **Modern Corporate**, utilizing expansive white space to allow high-quality textile imagery to breathe. It leverages sharp, intentional typography and a refined color palette to communicate reliability and premium quality. The emotional response should be one of "quiet luxury"—a professional environment that feels established yet forward-thinking.

## Colors

The palette is anchored by **Deep Blue**, representing stability and the company's long-standing history. **Crimson Red** is used sparingly as a high-intent accent for calls to action and critical highlights, reflecting the passion behind the craft.

- **Primary (#143067):** Used for headers, primary buttons, and structural brand elements.
- **Accent (#b43024):** Reserved for interactive highlights and small decorative accents to maintain a premium feel.
- **Neutral / Text:** Primary text uses a "Near Black" for high legibility, while secondary metadata and descriptions use a soft "Dark Gray" to reduce visual noise.
- **Surfaces:** A Soft Gray/Blue background provides a sophisticated canvas, while pure White is used for cards and content containers to create a sense of layering.

## Typography

This design system employs a sophisticated typographic pairing. **Noto Serif** is utilized for headlines and display text to reinforce the brand's tradition and authoritative voice. **Manrope** provides a clean, geometric contrast for functional UI elements, navigation, and body copy, ensuring clarity across digital interfaces.

**Editorial Hierarchy:** Use wide line heights for body copy to improve readability and create a relaxed, premium pace. Labels and small navigation items should use Manrope in medium weights with slight letter spacing to maintain a modern, technical edge.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain an editorial, controlled aesthetic. Content is centered within a 1280px container to ensure visual balance.

- **Grid:** A 12-column grid is used for desktop layouts, transitioning to a 4-column grid for mobile.
- **Rhythm:** Generous vertical spacing (Section Gaps) of 80px or more is encouraged between major content blocks to emphasize the premium nature of the brand.
- **Adaptive Rules:** On mobile, margins reduce significantly, and typography scales down to prevent overflow while maintaining the serif's legibility.

## Elevation & Depth

To maintain a clean and modern appearance, this design system avoids heavy drop shadows. Instead, it utilizes **Tonal Layers** and **Low-contrast Outlines**.

- **Surfaces:** Use white surfaces on the soft gray background to define content areas.
- **Outlines:** Use 1px borders in `Very Light Blue` or a 10% opacity version of `Deep Blue` to separate elements without adding visual weight.
- **Shadows:** When necessary for interactivity (e.g., a hovered card), use a single "Ambient Shadow"—very diffused, with a 15% opacity of the Deep Blue primary color to create a soft, tinted lift.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding removes the harshness of industrial design while maintaining a professional, structured look. It suggests precision without feeling overly "techy" or "playful."

- **Buttons & Inputs:** Use a 4px (0.25rem) corner radius.
- **Large Containers/Cards:** Use an 8px (0.5rem) corner radius for a more substantial feel.
- **Textiles/Images:** Images should maintain sharp or very slightly rounded corners to reflect the "cut" of fabric.

## Components

- **Buttons:** Primary buttons use the Deep Blue background with White text. Secondary buttons use a Deep Blue border with Deep Blue text. Labels are Manrope Medium, uppercase.
- **Cards:** White backgrounds with a subtle 1px border. No shadow in default state; soft blue-tinted shadow on hover.
- **Input Fields:** Minimalist design with a bottom-border focus state in Deep Blue. Labels use the Small Label style in Manrope.
- **Chips/Badges:** Use the "Very Light Blue" container with Deep Blue text for categories, or Crimson Red for "New" or "Sale" alerts.
- **Lists:** Clean, high-contrast rows separated by 1px light blue dividers. Use generous vertical padding (16px+) to maintain the editorial feel.
- **Featured Textiles:** A custom component for high-resolution fabric previews, using large image containers with overlaid Noto Serif typography for a "magazine" feel.
