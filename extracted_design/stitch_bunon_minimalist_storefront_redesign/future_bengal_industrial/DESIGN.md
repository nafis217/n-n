---
name: Future Bengal Industrial
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#605e58'
  on-secondary: '#ffffff'
  secondary-container: '#e6e2da'
  on-secondary-container: '#66645e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410001'
  on-tertiary-container: '#f9362c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e6e2da'
  secondary-fixed-dim: '#c9c6bf'
  on-secondary-fixed: '#1c1c17'
  on-secondary-fixed-variant: '#484741'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4aa'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#930005'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  nav-item:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  price:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1'
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system is built on a "Future Bengal" aesthetic: a synthesis of high-fashion minimalism and industrial precision. It targets a fashion-forward audience that values clarity, structural integrity, and the raw beauty of textile photography over decorative UI.

The style is **Hard-Edge Minimalism**. It utilizes a strictly flat architecture, rejecting the softness of modern consumer web trends (gradients, blurs, and shadows) in favor of a rigid, grid-based layout. The interface serves as a silent frame for the product, evoking a premium, editorial emotional response that feels both authoritative and contemporary.

## Colors
The palette is architectural and high-contrast. 

- **Carbon Black (#111111):** Used for all primary text, icons, and structural boundaries.
- **White (#FFFFFF):** The default canvas, used to create vast whitespace and high-key product presentation.
- **Warm Bone (#F3EFE7):** A sophisticated surface color for secondary sections, providing a subtle textural shift from the stark white background.
- **BUNON Vermilion (#FF3B30):** An aggressive accent used sparingly for functional highlights like "New In," "Sale," or active notification badges.
- **Muted Gray (#747474):** Used for metadata, breadcrumbs, and secondary labels to maintain visual hierarchy without breaking the monochrome theme.
- **Light Divider (#D8D8D8):** 1px hair-thin lines used to delineate sections where whitespace alone is insufficient.

## Typography
The typography utilizes **Geist** for its technical, mono-inspired precision, paired with **Noto Sans Bengali** for local scripts. 

- **Editorial Headlines:** High-contrast sizing with tight letter spacing for a "Vogue" inspired impact.
- **Navigation:** Compact 13px-14px sizes to ensure the interface feels expansive and "top-heavy" like premium editorial sites.
- **Uppercase Utility:** Functional labels, categories, and "Add to Bag" prompts must use `label-caps` to distinguish utility from narrative content.
- **Bangla Integration:** Ensure Noto Sans Bengali line-height is adjusted (+20%) to prevent clipping of ascending/descending characters.

## Elevation & Depth
This design system rejects all depth metaphors.

- **Flat Architecture:** No shadows, no blurs, and no "lifted" states. 
- **Z-Index Layering:** Depth is communicated solely through overlapping elements (e.g., a text block partially covering an image) and high-contrast color shifts (Carbon Black overlaying White).
- **Surface Tiers:** Background is White (#FFFFFF). Secondary "containers" use Warm Bone (#F3EFE7). These are always flush against each other, separated by hair-thin lines if necessary.

## Shapes
The shape language is **Strictly Square**. 

Every interactive element—buttons, input fields, image containers, and tags—must have a 0px border radius. This reinforces the industrial, future-leaning aesthetic and separates the brand from more "friendly" or "consumer-grade" competitors.

## Components

### Buttons
- **Primary:** Solid Carbon Black background, White uppercase text. No border. Square corners.
- **Secondary:** 1px Carbon Black border, White background, Carbon Black text.
- **Ghost:** No background or border. Text only with a 1px underline that appears on hover.

### Commerce Actions
- **Icons:** Use thin-stroke (1px or 1.5px) geometric icons for Bag, Search, and Profile. 
- **Placement:** Icon-only in the header to minimize visual clutter.

### Input Fields
- **Style:** 1px #D8D8D8 bottom-border only for a cleaner, editorial look. 
- **Focus State:** Border color changes to #111111. No glow or shadow.

### Cards & Lists
- **Product Card:** Image-first. Title and price are left-aligned below the image. No container border. Vermilion "Sale" tag is a small, square label in the top-left of the image.
- **Lists:** Separated by 1px horizontal #D8D8D8 lines. No "chevron" icons; use hover-state text bolding instead.

### Chips & Tags
- **Style:** Square-edged, Warm Bone background with Muted Gray text. Used for sizes or categories.