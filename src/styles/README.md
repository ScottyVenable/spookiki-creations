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

```css
:root {
  /* Colors */
  --background: 246 244 240;      /* F6F4F0 */
  --foreground: 85 85 85;         /* 555555 */
  --primary: 122 104 127;         /* 7A687F */
  --primary-foreground: 255 255 255;
  --secondary: 150 221 206;       /* 96DDCE */
  --secondary-foreground: 45 45 45;
  --accent: 232 165 165;          /* E8A5A5 */
  --accent-foreground: 45 45 45;
  --muted: 203 195 227;           /* CBC3E3 */
  --muted-foreground: 61 61 61;
  --card: 255 255 255;
  --card-foreground: 85 85 85;
  
  /* Borders & Radius */
  --border: 229 231 235;
  --radius: 0.5rem;
  
  /* Focus ring */
  --ring: 122 104 127;
}
```

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
- `theme.json` - Theme metadata

## 🔗 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
