# Design System — IEEE IES Tunisia Section

> **Applied to every page, component, and element in this project.**

---

## 1. Typography System

### Fonts
| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headings** | Montserrat | 700 (bold) | All h1–h6 elements |
| **Body** | Open Sans | 400 (regular), 500 (medium) | Paragraphs, labels, metadata |

### Type Scale
| Level | Tailwind | Mobile | Desktop | Line Height | Usage |
|-------|----------|--------|---------|-------------|-------|
| **Hero h1** | `text-4xl lg:text-6xl` | 36px | 60px | 1.2 | Page hero titles |
| **Section h2** | `text-2xl md:text-3xl` | 24px | 30px | 1.2 | Section headers |
| **Card h3** | `text-lg md:text-xl` | 18px | 20px | 1.3 | Card titles, subsection headers |
| **Card h4** | `text-base` | 16px | 16px | 1.4 | Sub-card titles |
| **Body** | `text-base` | 16px | 16px | 1.6 | Paragraph text |
| **Small** | `text-sm` | 14px | 14px | 1.5 | Metadata, captions, descriptions |
| **Micro** | `text-xs` | 12px | 12px | 1.4 | Badges, timestamps, tags |
| **Tiny** | `text-[10px]` | 10px | 10px | 1.3 | Officer role badges, event weekday labels |

### Text Colors
| Token | HSL | Usage |
|-------|-----|-------|
| `text-foreground` | `222 47% 11%` | Primary text (headings, body) |
| `text-muted-foreground` | `25 8% 42%` | Secondary text (captions, metadata) |
| `text-primary` | `18 91% 54%` | Accent words, links, interactive text |
| `text-white` | — | Text on dark backgrounds |
| `text-white/80` | — | Secondary text on dark backgrounds |
| `text-white/70` | — | Tertiary text on dark backgrounds |
| `text-white/60` | — | Muted text on dark backgrounds (header top links, footer links) |

### Text Patterns
```tsx
// Hero title (all page h1)
<h1 className="page-hero-title">Page <span className="text-primary">Title</span></h1>

// Hero subtitle (all page p under h1)
<p className="page-hero-subtitle">Description text here.</p>

// Section title (all section h2)
<h2 className="section-title">Section Title</h2>

// Card title
<h3 className="font-semibold text-foreground leading-tight">Card Title</h3>

// Body paragraph
<p className="text-muted-foreground text-sm leading-relaxed">Description here.</p>

// Metadata row
<span className="text-xs text-muted-foreground">Date: TBA</span>
```

---

## 2. Icon System

### Icon Family
**Lucide React only.** No emojis. No other icon libraries.

### Icon Size Scale
| Class | Size | Usage | Example |
|-------|------|-------|---------|
| `icon-xs` | 12px (`size-3`) | Inline micro-accents | ArrowRight in "Read more" links |
| `icon-sm` | 14px (`size-3.5`) | Meta row icons, social links | Calendar, Clock, Mail, Linkedin, Facebook |
| `icon-md` | 16px (`size-4`) | Standard content icons | MapPin, Users, Send, ExternalLink, ChevronLeft/Right |
| `icon-lg` | 20px (`size-5`) | Section header icons, card header icons | BookOpen, Lightbulb, History, Building2, Award, Trophy |
| `icon-xl` | 24px (`size-6`) | Large decorative icons | Globe2, Handshake, Mail (CTA), Calendar (year headers) |
| `icon-2xl` | 28px (`size-7`) | Award card icons, large CTA icons | Trophy, Star (received awards) |
| `icon-3xl` | 36px (`size-9`) | Contact info icon containers | — |
| `icon-4xl` | 40px (`size-10`) | Benefit card icons, pillar icons | — |
| `icon-5xl` | 48px (`size-12`) | CTA section icons, hero icons | CheckCircle, Mail (about CTA) |

### Icon Container Sizes
| Class | Size | Holds | Usage |
|-------|------|-------|-------|
| `icon-box-xs` | 24px | `icon-xs`, `icon-sm` | Tag dots, small inline |
| `icon-box-sm` | 36px (`size-9`) | `icon-md`, `icon-lg` | Activity cards, contact info |
| `icon-box-md` | 40px (`size-10`) | `icon-lg`, `icon-xl` | Benefit cards, card headers |
| `icon-box-lg` | 48px (`size-12`) | `icon-xl`, `icon-2xl` | CTA section icons |
| `icon-box-xl` | 56px (`size-14`) | `icon-2xl` | Received award cards |

### Icon Container Pattern
```tsx
// Standard icon container (used everywhere)
<div className="icon-box-sm">
  <Icon className="icon-md text-primary" />
</div>

// Larger icon container (for benefit cards, pillars)
<div className="icon-box-md">
  <Icon className="icon-lg text-primary" />
</div>
```

### Icon Colors
| Context | Color Class |
|---------|-------------|
| Inside primary/10 bg container | `text-primary` |
| Inside muted bg container | `text-muted-foreground` |
| On white background | `text-foreground` |
| On primary background | `text-primary-foreground` (white) |
| Decorative / aria-hidden | `aria-hidden="true"` + appropriate color |

---

## 3. Color System

### Semantic Tokens (NEVER use raw hex)
| Token | HSL | Visual | Usage |
|-------|-----|--------|-------|
| `--primary` | `18 91% 54%` | 🟠 IES Orange | CTAs, links, accents, highlights |
| `--primary-foreground` | `0 0% 100%` | ⚪ White | Text on primary |
| `--secondary` | `203 100% 29%` | 🔵 IEEE Blue | Hero bg, calendar headers, secondary actions |
| `--secondary-foreground` | `0 0% 100%` | ⚪ White | Text on secondary |
| `--background` | `0 0% 100%` | ⚪ White | Page background |
| `--foreground` | `222 47% 11%` | ⚫ Dark | Primary text |
| `--muted` | `30 6% 93%` | 🟡 Warm gray | Subtle backgrounds (alternating sections) |
| `--muted-foreground` | `25 8% 42%` | 🟤 Gray | Secondary text |
| `--card` | `0 0% 100%` | ⚪ White | Card backgrounds |
| `--border` | `30 8% 88%` | 🟡 Light warm | Borders, dividers |
| `--accent` | `203 100% 96%` | 🔵 Light blue | Accent backgrounds (info boxes) |
| `--destructive` | `0 84% 60%` | 🔴 Red | Error states (unused currently) |

### Opacity Scale (primary)
| Value | Usage |
|-------|-------|
| `primary/5` | Ultra-subtle bg tint |
| `primary/10` | Icon container bg, info box bg |
| `primary/15` | Card header gradient |
| `primary/20` | Border accents, subtle highlights |
| `primary/25` | — |
| `primary/30` | Calendar grid overlay |
| `primary/35` | Officer photo hover border |
| `primary/40` | — |
| `primary/50` | Gradient mid-points |
| `primary/60` | Gradient bar end |
| `primary/80` | Gradient mid-points |
| `primary/90` | Button hover state |

### Hardcoded Colors (Allowed Exceptions)
| Color | Where | Why |
|-------|-------|-----|
| `white` / `white/X` | Header (orange bg), Footer (orange bg) | White text on primary bg is semantic |
| `yellow-400`, `amber-500` | HeroSection only | Award announcement badge (special case) |
| `black/10`, `black/40` | Overlays, dialogs | Standard overlay pattern |

### Forbidden Patterns
```tsx
// ❌ NEVER: Raw hex colors
className="bg-[#E87722]"
className="text-blue-500"
className="bg-red-600"

// ✅ ALWAYS: Semantic tokens
className="bg-primary"
className="text-destructive"
className="bg-muted"
```

---

## 4. Spacing System

### Page Layout (consistent on ALL pages)
```tsx
<div className="py-16 md:py-24">           // Page wrapper: 64px → 96px vertical
  <div className="container mx-auto px-4   // Container: 16px horizontal
    max-w-3xl | max-w-4xl | max-w-5xl | max-w-6xl">  // Max width per page type
```

### Max-Width by Page Type
| Page | Max-Width | Reason |
|------|-----------|--------|
| Home sections | N/A (full-width sections) | Hero, stats, about, activities |
| About | `max-w-6xl` | Wide grid layouts (ExCom, societies) |
| Contact | `max-w-4xl` | Two-column form layout |
| Events | `max-w-4xl` | Single-column event list |
| Hubs & Nodes | `max-w-5xl` | Medium grid (pillars, nodes) |
| Join | `max-w-4xl` | Benefits grid + steps |
| Subunits | `max-w-5xl` | Two-column card grid |
| Activities | `max-w-5xl` | Three-column activity grid |
| Awards | `max-w-6xl` | Wide winner card grids |
| Received Awards | `max-w-4xl` | Single-column list |

### Section Spacing
| Pattern | Value | Usage |
|---------|-------|-------|
| `mb-16` | 64px | Between major sections |
| `mb-12` | 48px | Between hero and first section |
| `mb-8` | 32px | Between related sections |
| `mb-6` | 24px | Between cards in a list |
| `mb-4` | 16px | Between element and text |
| `mb-3` | 12px | Between related elements |
| `mb-2` | 8px | Between label and value |
| `mb-1.5` | 6px | Tight element spacing |
| `mb-1` | 4px | Minimal spacing |

### Card Padding
| Pattern | Usage |
|---------|-------|
| `p-4` | Compact cards (officer cards) |
| `p-5` | Standard cards (subunits, events, received awards) |
| `p-6` | Spaced cards (benefits, contact info) |
| `p-6 md:p-8` | Responsive padding (article content) |
| `p-6 md:p-10` | Large padding (article prose) |

### Grid Gaps
| Pattern | Usage |
|---------|-------|
| `gap-2` | Social icon rows, tag groups |
| `gap-3` | Icon + text rows, small grids |
| `gap-4` | Standard card grids (2-col) |
| `gap-5` | Step cards (join page) |
| `gap-6` | Standard card grids (2-col, 3-col) |
| `gap-8` | Large grids (stats, officer grids) |
| `gap-12` | Wide grids (stats section desktop) |

---

## 5. Responsive Breakpoints

### Breakpoint Scale
| Prefix | Min Width | Device |
|--------|-----------|--------|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |

### Standard Responsive Patterns
```tsx
// Section padding
py-16 md:py-24

// Hero title
text-4xl lg:text-6xl

// Hero subtitle
text-lg md:text-xl

// Section title
text-2xl md:text-3xl

// Card grid: 1 col → 2 col → 3 col
grid md:grid-cols-2 lg:grid-cols-3

// Card grid: 1 col → 2 col
grid md:grid-cols-2

// Stats grid: 2 col → 4 col
grid-cols-2 md:grid-cols-4

// Hero image height
h-[40vh] md:h-[50vh]

// Card padding
p-6 md:p-8

// CTA padding
p-10 md:p-12

// Section h2 with text-center
text-center mb-12

// Flex: column → row
flex-col md:flex-row

// Hide/show
hidden md:flex
md:hidden
```

---

## 6. Card Pattern System

### Card Types
| Type | Classes | Usage |
|------|---------|-------|
| **Standard** | (none) | Default shadcn card |
| **Hover lift** | `card-hover` | Subunits, mission/vision, events |
| **Hover + primary shadow** | `card-hover-primary` | Benefits, activities, join steps, received awards |
| **Gradient bar** | `card-gradient-bar` | Contact info, CTA cards, activities, received awards |
| **Combined** | `card-hover-primary card-gradient-bar` | Benefits, activities, join steps, received awards |

### Card Structure
```tsx
// Standard content card
<Card className="card-hover-primary card-gradient-bar">
  <CardContent className="p-6 flex items-start gap-4">
    <div className="icon-box-sm">
      <Icon className="icon-md text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-foreground mb-1">Title</h3>
      <p className="text-muted-foreground text-sm">Description</p>
    </div>
  </CardContent>
</Card>
```

### Icon-Left Card (used in benefits, contact, received awards)
```tsx
<Card className="card-hover-primary card-gradient-bar">
  <CardContent className="p-6 flex items-start gap-4">
    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
      <Icon className="size-5 text-primary" />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-foreground mb-1">Title</h3>
      <p className="text-muted-foreground text-sm">Description</p>
    </div>
  </CardContent>
</Card>
```

### Icon-Top Card (used in activities, pillars)
```tsx
<Card className="card-hover-primary">
  <CardHeader>
    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
      <Icon className="size-5 text-primary" />
    </div>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription className="text-base">Description</CardDescription>
  </CardContent>
</Card>
```

### Horizontal Card (used in events, subunits)
```tsx
<Card className="hover:border-primary/40 transition-colors">
  <CardContent className="p-5">
    <div className="flex gap-4">
      {/* Left: date block or icon */}
      <div className="shrink-0">...</div>
      {/* Right: content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground leading-tight mb-1.5">Title</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">Description</p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

## 7. Page Hero Pattern (ALL pages)

```tsx
<div className="text-center mb-16 animate-fadeUp">
  <Badge variant="secondary" className="section-label">Label</Badge>
  <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
    Page <span className="text-primary">Title</span>
  </h1>
  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
    Description paragraph here.
  </p>
</div>
```

### Rules
1. **Always** `text-center mb-16 animate-fadeUp`
2. **Always** `Badge variant="secondary" className="section-label"`
3. **Always** `text-4xl lg:text-6xl` for h1
4. **Always** one accent word in `text-primary` inside `<span>`
5. **Always** `text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto` for subtitle
6. **Always** `mb-6` between h1 and subtitle
7. **Never** add extra classes to the hero wrapper

---

## 8. CTA Section Pattern

### Primary CTA (gradient, white text)
```tsx
<section className="cta-gradient text-white rounded-2xl p-12 md:p-16 relative overflow-hidden animate-slideUp">
  <div className="cta-glow size-48 top-0 right-0" />
  <div className="cta-glow size-32 bottom-0 left-0" />
  <div className="relative z-10 text-center">
    <Icon className="icon-5xl mx-auto mb-4" />
    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Title</h2>
    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Description</p>
    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-lg">
      <a href="...">CTA Text <ArrowRight className="icon-md ml-2" /></a>
    </Button>
  </div>
</section>
```

### Secondary CTA (muted bg, primary button)
```tsx
<section className="cta-secondary animate-slideUp">
  <div className="relative z-10 text-center">
    <Icon className="icon-5xl mx-auto mb-4 text-primary" />
    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Title</h2>
    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Description</p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide shadow-lg">
        <a href="mailto:...">Primary CTA</a>
      </Button>
      <Button asChild variant="outline" size="lg" className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-wide">
        <a href="/contact/">Secondary CTA</a>
      </Button>
    </div>
  </div>
</section>
```

### Minimal CTA (simple centered)
```tsx
<div className="text-center animate-slideUp">
  <p className="text-muted-foreground mb-4">Message text.</p>
  <Button asChild size="lg" className="font-bold tracking-wide shadow-md">
    <a href="...">CTA Text</a>
  </Button>
</div>
```

---

## 9. Button System

### Button Sizes
| Size | Usage |
|------|-------|
| `size="lg"` | All page-level CTAs (default for pages) |
| `size="default"` | Inline buttons, card footer buttons |
| `size="icon"` | Icon-only buttons (mobile menu toggle) |

### Button Variants
| Variant | Classes | Usage |
|---------|---------|-------|
| **Default** | `bg-primary text-primary-foreground hover:bg-primary/90` | Primary CTAs |
| **Outline** | `border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground` | Secondary CTAs |
| **Secondary** | `bg-white text-secondary hover:bg-white/90` | Join IEEE button |
| **Ghost** | `hover:bg-muted` | Mobile menu toggle |
| **Destructive** | (unused) | Error states |

### Button Text Patterns
```tsx
// Primary CTA button
<Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide shadow-lg">

// Outline CTA button
<Button asChild variant="outline" size="lg" className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-wide">

// Standard CTA (no special styling)
<Button asChild size="lg" className="font-bold tracking-wide shadow-md">

// External link CTA
<Button asChild size="lg" className="font-bold">
```

---

## 10. Grid System

### Standard Grid Patterns
```tsx
// 2-column responsive
<div className="grid md:grid-cols-2 gap-6">

// 3-column responsive
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4-column (stats, ExCom top row)
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

// 5-column (ExCom bottom row)
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">

// 9-column (officer grid)
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 md:gap-8 justify-items-center">

// 3-column centered (How It Works)
<div className="grid gap-6 md:grid-cols-3">

// Single column (event lists, received awards)
<div className="flex flex-col gap-4">
```

---

## 11. Animation System

### Entrance Animations
| Class | Effect | Usage |
|-------|--------|-------|
| `animate-fadeUp` | Fade + translateY(20px) → 0, 0.6s | Page heroes (ALL pages) |
| `animate-slideUp` | Custom slide up, 0.6s | Sections, CTAs |
| `opacity-0 translate-y-6 animate-fadeUp` + `animationDelay` | Staggered fade-in | Awards page |

### Hover Animations
| Pattern | Effect | Usage |
|---------|--------|-------|
| `card-hover` | `-translate-y-1` + `shadow-lg` | All hover-able cards |
| `hover:scale-[1.02]` | Subtle scale up | Award winner cards |
| `hover:scale-105` | Image zoom | Article card images |
| `hover:scale-110` | Icon scale | Social icons |
| `group-hover:text-primary` | Color change | Card titles, links |
| `group-hover:underline` | Underline | "Read more" links |

### Transition Durations
| Duration | Usage |
|----------|-------|
| `150ms` (default Tailwind) | Color transitions |
| `200ms` (`duration-200`) | Chevron rotations |
| `300ms` (`duration-300`) | Card hovers, icon scales |
| `500ms` (`duration-500`) | Image zooms, carousel slides |

---

## 12. Accessibility Rules

### Always
- `aria-label` on icon-only buttons and social links
- `aria-hidden="true"` on decorative icons
- `alt` on all `<img>` elements
- `role="navigation"` + `aria-label` on `<nav>` elements
- `target="_blank" rel="noreferrer"` on all external links

### Focus States
- Global `:focus-visible` ring (4px, offset)
- All interactive elements inherit focus styles

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)` disables all animations
- Carousel should pause on hover/focus (TODO: implement)

---

## 13. File Naming Conventions

| Pattern | Example |
|---------|---------|
| Page routes | `app/about/page.tsx`, `app/contact/page.tsx` |
| Component files | `components/Header.tsx` (PascalCase) |
| UI components | `components/ui/button.tsx` (lowercase) |
| Utility files | `lib/articles.ts`, `lib/utils.ts` (lowercase) |
| Article files | `articles/article-slug.mdx` + `article-slug.mdx.json` |

---

## Checklist for New Pages

When creating a new page, ensure:
- [ ] Hero uses `page-hero`, `page-hero-title`, `page-hero-subtitle` classes
- [ ] Page wrapper uses `py-16 md:py-24`
- [ ] Container uses `container mx-auto px-4 max-w-*`
- [ ] All icons use `icon-*` size classes
- [ ] Icon containers use `icon-box-*` or `size-N bg-primary/10 rounded-xl`
- [ ] Cards use `card-hover`, `card-hover-primary`, and/or `card-gradient-bar`
- [ ] CTA sections use `cta-secondary` or `cta-gradient`
- [ ] Buttons use `size="lg"` for page-level CTAs
- [ ] Colors use semantic tokens (never raw hex)
- [ ] `aria-label` on all icon-only interactive elements
- [ ] `aria-hidden="true"` on decorative icons
- [ ] External links use `target="_blank" rel="noreferrer"`
- [ ] Section spacing uses `mb-16`
- [ ] Grid gaps use `gap-4` or `gap-6` (never arbitrary values)
