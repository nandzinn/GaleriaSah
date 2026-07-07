---
name: Azure Cinematic Gallery
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#b9c7e4'
  on-secondary: '#233148'
  secondary-container: '#3c4962'
  on-secondary-container: '#abb9d6'
  tertiary: '#b6c4ff'
  on-tertiary: '#05297a'
  tertiary-container: '#748de1'
  on-tertiary-container: '#00226e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b9c7e4'
  on-secondary-fixed: '#0d1c32'
  on-secondary-fixed-variant: '#39475f'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b6c4ff'
  on-tertiary-fixed: '#00164e'
  on-tertiary-fixed-variant: '#264191'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  hidden:
    fontFamily: Inter
    fontSize: 0px
    fontWeight: '400'
    lineHeight: 0px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  page-margin: 4rem
  gutter: 0.75rem
  row-gap: 2.5rem
  mobile-margin: 1rem
---

## Brand & Style

The design system is centered on an immersive, emotive experience designed for a personal photo collection. It draws inspiration from cinematic streaming platforms, prioritizing visual storytelling over information density. The personality is intimate and high-end, utilizing a **Glassmorphic** and **Minimalist** style to ensure the UI feels like a transparent lens through which the imagery is viewed. 

The user interface disappears into the background, using deep blue tones to provide a sophisticated, low-light environment that makes photo colors pop. There is a total absence of text; navigation and interaction are handled through intuitive iconography and spatial relationships.

## Colors

The palette is a monochromatic exploration of blue, optimized for a dark mode "cinema" environment.
- **Primary (#007AFF):** A vibrant azure used sparingly for active states, focus rings, and interactive highlights.
- **Secondary (#0A192F):** A deep navy used for secondary surfaces and subtle gradients.
- **Tertiary (#1E3A8A):** A medium blue used for frosted glass effects and semi-transparent overlays.
- **Neutral (#020617):** An ultra-dark "Obsidian Blue" used for the global background to ensure infinite depth and maximum contrast for photography.

Gradients should transition from `secondary` to `neutral` to create a sense of vertical depth in scrolling lists.

## Typography

This design system adheres to a strict "No Text" policy. While **Inter** is designated as the system font for accessibility meta-layers (hidden from the primary UI), all visual communication must be achieved through:
1. **Iconography:** Using clear, universal symbols in the primary azure color.
2. **Aspect Ratios:** Distinguishing categories by the shape of the photo containers (e.g., cinematic 21:9 for highlights, square 1:1 for personal sets).
3. **Scale:** Larger imagery indicates featured or recent content.

## Layout & Spacing

The layout follows a **Fluid Grid** model inspired by modern streaming catalogs. 
- **Horizontal Rows:** Photos are grouped into horizontally scrollable carousels.
- **Edge-to-Edge:** On mobile, imagery should feel expansive, utilizing tight 4px gutters.
- **Desktop/Tablet:** A 12-column grid is used, but content is restricted to row-based scrolling. 
- **Negative Space:** Large vertical gaps (40px+) between rows are used to separate "chapters" or "themes" of photos without needing text headers.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Tonal Layers**.
- **The Base:** The deepest layer is the `neutral` obsidian blue.
- **The Surface:** Photo cards sit on the base. When hovered or focused, they scale up (1.05x) and gain a subtle azure outer glow.
- **Navigation Rails:** Global navigation (side or bottom) uses a backdrop-filter (blur: 20px) with a 10% opacity `tertiary` fill, creating a "frosted blue glass" effect that allows photo colors to bleed through as the user scrolls.
- **Overlays:** Any active UI element (like a zoom view) uses a 90% opaque `neutral` wash to kill background distractions.

## Shapes

The design system uses a **Soft** shape language to maintain a modern, professional look that doesn't distract from the photography.
- **Photo Containers:** Standardized with a 4px (0.25rem) corner radius. This provides a crisp, "film-strip" aesthetic.
- **Interaction Orbs:** Buttons (like "Close" or "Play") are the only exception, using a `rounded-xl` or full pill shape to distinguish them from the rectangular content.

## Components

### Photo Cards
The core component. Rectangular containers with a slight `secondary` border (1px, 20% opacity). On hover/interaction, the border brightens to the `primary` azure.

### The "Infinite Row"
A horizontal scroll component. It should fade to a `neutral` gradient on the right edge to indicate more content is available. No scrollbars are visible; navigation is via swipe or directional input.

### Glass Navigation Rail
A slim, vertical or horizontal bar containing only icons. Icons use the `primary` color for the active state and a muted `tertiary` for inactive.

### Focal Overlay
When a photo is selected, it fills the screen. No UI is visible until the user interacts, at which point "Close" and "Share" icons appear as floating azure circles in the corners with high-blur backdrops.

### Category Indicators
Since text is absent, categories are differentiated by the **Aspect Ratio** of the cards within that row (e.g., Row 1: Portrait; Row 2: Wide Landscape; Row 3: Square).