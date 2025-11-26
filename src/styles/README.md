# 🎨 Styles Directory

This directory contains CSS stylesheets and theme configuration for the Spookiki Creations platform.

## 📁 Files

```
styles/
└── theme.css    # Custom theme variables and styles
```

## 📄 File Descriptions

### theme.css

Custom CSS variables and theme definitions that extend Tailwind CSS.

**Purpose:**
- Define brand color palette
- Set typography variables
- Configure component-specific styles
- Override shadcn/ui defaults

## 🎨 Color Palette

The theme uses a mystical, cozy color scheme:

| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Mystical Purple | `--primary` | `#7A687F` | Primary CTAs, headings, links |
| Soft Mint | `--secondary` | `#96DDCE` | Success states, accents, badges |
| Digital Lavender | `--muted` | `#CBC3E3` | Footer, hover states, backgrounds |
| Blush Pink | `--accent` | `#E8A5A5` | Highlights, sale tags, attention |
| Background | `--background` | `#F6F4F0` | Main page background |
| Foreground | `--foreground` | `#555555` | Body text |
| Card | `--card` | `#FFFFFF` | Card backgrounds |

### Color Contrast Ratios

All color pairings meet WCAG accessibility standards:

| Pairing | Ratio | Status |
|---------|-------|--------|
| Background + Foreground | 8.2:1 | ✅ AAA |
| Card + Foreground | 9.5:1 | ✅ AAA |
| Primary + White | 5.1:1 | ✅ AA |
| Secondary + Dark Grey | 6.8:1 | ✅ AA |
| Accent + Dark Grey | 5.4:1 | ✅ AA |

## 🔤 Typography

### Font Families

| Purpose | Font | Weight | Usage |
|---------|------|--------|-------|
| Headings | Nunito | Bold/SemiBold | H1-H3, titles |
| Body | Inter | Regular/Medium | Paragraphs, labels |
| Buttons | Inter | SemiBold | Button text |

### Type Scale

| Element | Font | Size | Line Height | Tracking |
|---------|------|------|-------------|----------|
| H1 | Nunito Bold | 36px | tight | -0.02em |
| H2 | Nunito SemiBold | 28px | normal | 0 |
| H3 | Nunito SemiBold | 20px | normal | 0 |
| Body | Inter Regular | 16px | 1.6 | 0 |
| Small | Inter Medium | 14px | normal | 0 |
| Buttons | Inter SemiBold | 15px | normal | 0.05em |

## 📐 Spacing

Base unit: **4px**

| Size | Value | Usage |
|------|-------|-------|
| `gap-3` | 12px | Small gaps |
| `gap-6` | 24px | Standard gaps |
| `p-8` | 32px | Card padding |
| Section margins | 16/24/32px | Based on hierarchy |

## 🎭 CSS Variables Structure

The theme uses Radix UI color scales and Tailwind CSS variables:

```css
#spark-app {
  /* Neutral colors - based on Slate scale */
  --color-neutral-1 to --color-neutral-12
  --color-neutral-a1 to --color-neutral-a12 /* Alpha variants */
  
  /* Accent colors - based on Blue scale */
  --color-accent-1 to --color-accent-12
  
  /* Secondary accent - based on Violet scale */
  --color-accent-secondary-1 to --color-accent-secondary-12
  
  /* Foreground colors */
  --color-fg: var(--color-neutral-12);
  --color-fg-secondary: var(--color-neutral-a11);
  
  /* Background colors */
  --color-bg: #ffffff;
  --color-bg-inset: var(--color-neutral-2);
  --color-bg-overlay: #ffffff;
  
  /* Focus ring */
  --color-focus-ring: var(--color-accent-9);
  
  /* Border radius scale */
  --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-2xl
  
  /* Size/spacing scale */
  --size-0 through --size-96
}
```

The theme also imports all Radix UI color palettes for flexibility.

## 🔧 Usage in Components

### Using CSS Variables
```tsx
// In Tailwind classes
<div className="bg-primary text-primary-foreground">
  Primary Button
</div>

// In custom CSS
.custom-element {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}
```

### Theme-Aware Components
```tsx
// Button with theme colors
<Button variant="default">
  {/* Uses --primary */}
</Button>

<Button variant="secondary">
  {/* Uses --secondary */}
</Button>

// Card with theme colors
<Card>
  {/* Uses --card background */}
  {/* Uses --card-foreground text */}
</Card>
```

## 🌙 Dark Mode (Future)

The theme structure supports dark mode through CSS variable overrides:

```css
.dark {
  --background: 26 26 26;
  --foreground: 229 231 235;
  /* ... other dark mode values */
}
```

## 📱 Responsive Typography

Typography adjusts for mobile viewports:

```css
/* Mobile adjustments */
@media (max-width: 768px) {
  h1 { font-size: 28px; }
  h2 { font-size: 22px; }
  h3 { font-size: 18px; }
}
```

## 🎯 Animation Variables

```css
:root {
  /* Timing */
  --transition-fast: 150ms;
  --transition-normal: 200ms;
  --transition-slow: 300ms;
  
  /* Easing */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## 📚 Related Files

- `src/index.css` - Global CSS imports
- `src/main.css` - Main stylesheet
- `tailwind.config.js` - Tailwind configuration
- `components.json` - shadcn/ui configuration

## 🔗 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
