# 🎨 UI Components (shadcn/ui)

This directory contains the shadcn/ui component library - a collection of reusable UI components built on top of Radix UI primitives.

## 📦 About shadcn/ui

shadcn/ui provides beautifully designed, accessible components that you can copy and customize. Unlike traditional component libraries, these components are:

- **Not a dependency** - Components are copied into your project
- **Fully customizable** - Modify styles and behavior as needed
- **Accessible** - Built on Radix UI primitives
- **Styled with Tailwind** - Uses Tailwind CSS for styling

## 📁 Available Components

### Form Components
| Component | File | Description |
|-----------|------|-------------|
| Button | `button.tsx` | Primary action buttons with variants |
| Input | `input.tsx` | Text input fields |
| Textarea | `textarea.tsx` | Multi-line text input |
| Label | `label.tsx` | Form field labels |
| Checkbox | `checkbox.tsx` | Checkbox inputs |
| Radio Group | `radio-group.tsx` | Radio button groups |
| Select | `select.tsx` | Dropdown select menus |
| Switch | `switch.tsx` | Toggle switches |
| Slider | `slider.tsx` | Range slider inputs |
| Form | `form.tsx` | Form validation wrapper |
| Input OTP | `input-otp.tsx` | One-time password input |

### Layout Components
| Component | File | Description |
|-----------|------|-------------|
| Card | `card.tsx` | Content container cards |
| Separator | `separator.tsx` | Visual dividers |
| Scroll Area | `scroll-area.tsx` | Custom scrollable areas |
| Resizable | `resizable.tsx` | Resizable panels |
| Aspect Ratio | `aspect-ratio.tsx` | Fixed aspect ratio containers |

### Navigation Components
| Component | File | Description |
|-----------|------|-------------|
| Tabs | `tabs.tsx` | Tab navigation |
| Navigation Menu | `navigation-menu.tsx` | Main navigation |
| Menubar | `menubar.tsx` | Application menubar |
| Breadcrumb | `breadcrumb.tsx` | Breadcrumb navigation |
| Pagination | `pagination.tsx` | Page navigation |
| Sidebar | `sidebar.tsx` | Sidebar navigation |

### Overlay Components
| Component | File | Description |
|-----------|------|-------------|
| Dialog | `dialog.tsx` | Modal dialogs |
| Alert Dialog | `alert-dialog.tsx` | Confirmation dialogs |
| Sheet | `sheet.tsx` | Slide-out panels |
| Drawer | `drawer.tsx` | Bottom drawer (mobile) |
| Popover | `popover.tsx` | Floating content |
| Tooltip | `tooltip.tsx` | Hover tooltips |
| Hover Card | `hover-card.tsx` | Rich hover content |
| Dropdown Menu | `dropdown-menu.tsx` | Dropdown menus |
| Context Menu | `context-menu.tsx` | Right-click menus |
| Command | `command.tsx` | Command palette |

### Feedback Components
| Component | File | Description |
|-----------|------|-------------|
| Alert | `alert.tsx` | Alert messages |
| Badge | `badge.tsx` | Status badges |
| Progress | `progress.tsx` | Progress indicators |
| Skeleton | `skeleton.tsx` | Loading placeholders |
| Sonner | `sonner.tsx` | Toast notifications |

### Data Display Components
| Component | File | Description |
|-----------|------|-------------|
| Table | `table.tsx` | Data tables |
| Avatar | `avatar.tsx` | User avatars |
| Calendar | `calendar.tsx` | Date picker calendar |
| Carousel | `carousel.tsx` | Image carousels |
| Chart | `chart.tsx` | Data visualization |

### Interactive Components
| Component | File | Description |
|-----------|------|-------------|
| Accordion | `accordion.tsx` | Collapsible sections |
| Collapsible | `collapsible.tsx` | Collapsible content |
| Toggle | `toggle.tsx` | Toggle buttons |
| Toggle Group | `toggle-group.tsx` | Toggle button groups |

## 🎨 Customization

### Button Variants
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Card Usage
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
  </CardHeader>
  <CardContent>
    Product description...
  </CardContent>
</Card>
```

### Form with Validation
```tsx
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

<Form {...form}>
  <FormField
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <Input {...field} />
      </FormItem>
    )}
  />
</Form>
```

## 🎯 Theme Integration

Components use CSS variables defined in `theme.css` for consistent theming:

```css
/* Primary colors */
--primary: 7A687F;        /* Mystical Purple */
--secondary: 96DDCE;      /* Soft Mint */
--accent: E8A5A5;         /* Blush Pink */

/* Background */
--background: F6F4F0;     /* Warm off-white */
--foreground: 555555;     /* Dark grey text */
```

## 📝 Component Patterns

### Compound Components
Many components use compound patterns:
```tsx
<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Controlled vs Uncontrolled
Components support both patterns:
```tsx
// Controlled
<Select value={value} onValueChange={setValue}>

// Uncontrolled
<Select defaultValue="option1">
```

## 🔧 Adding New Components

To add a new shadcn/ui component:

```bash
npx shadcn@latest add [component-name]
```

Or manually copy from the [shadcn/ui registry](https://ui.shadcn.com/docs/components).

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
