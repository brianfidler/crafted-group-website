# Project Context for Claude Code

## Product Requirements Document (PRD)

**📄 See full PRD: [PRD.md](./PRD.md)**  
*Note: PRD.md will be added by client - contains detailed business requirements and specifications*

---

## Project Overview

### Basic Information
- **Project Name:** Crafted Group Website
- **Type:** Professional Design & Development Services Website
- **Current Stage:** Development - Content population needed
- **Tech Stack:** Next.js 15.4.6, Sanity CMS v4, Tailwind CSS v4, TypeScript
- **Development Server:** Running on port 3001 (npm run dev)

### Project Purpose
A modern, content-managed website for Crafted Group showcasing design and development services. Originally structured for CMO/marketing services, recently pivoted to focus on web design and development expertise.

---

## Technical Architecture

### Directory Structure
```
crafted-group-website/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (admin)/studio/   # Sanity Studio route
│   │   ├── about/            # About page
│   │   ├── blog/             # Blog system with [slug] routes
│   │   ├── case-studies/     # Portfolio showcase
│   │   ├── contact/          # Contact page
│   │   ├── pricing/          # Pricing tiers
│   │   ├── services/         # Services overview
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Header, Footer components
│   │   └── blog/            # BlogCard, BlogPost components
│   └── lib/                 # Utilities (utils.ts)
├── sanity/
│   ├── schemaTypes/         # Content models
│   │   ├── pages/           # All page schemas
│   │   ├── shared/          # Reusable components
│   │   └── index.ts         # Schema exports
│   └── lib/                 # Sanity utilities & queries
├── scripts/                 # Automation & migration tools
├── types/                   # TypeScript definitions
└── backups/                # Sanity backup storage
```

### Key Technologies
- **Framework:** Next.js with App Router, Server Components, Turbopack
- **Styling:** Tailwind CSS v4 with CSS variables, OKLCH colors
- **UI Library:** shadcn/ui with Radix UI primitives
- **CMS:** Sanity Studio v4 integrated at /studio
- **Content:** Portable Text for rich content editing
- **Type Safety:** TypeScript with strict mode enabled

---

## Content Management System

### Sanity Schema Types

#### Page Schemas (Singletons)
- `homePage` - Hero, stats, services, testimonials
- `aboutPage` - Story, expertise, process, philosophy
- `servicesPage` - Core services, process steps, FAQs
- `pricingPage` - Tiers, features, FAQs
- `caseStudiesPage` - Portfolio grid, results
- `contactPage` - Contact methods, form, hours
- `blogPage` - Blog listing configuration

#### Content Types
- `post` - Blog posts with categories, authors, SEO
- `author` - Author profiles with bio and image
- `category` - Blog categories with descriptions
- `siteSettings` - Global site configuration
- `legalPage` - Terms, Privacy, Cookie policies

#### Shared Components
- `testimonial` - Client testimonials
- `callToAction` - CTA blocks with buttons
- `statistic` - Numerical stats with labels
- `blockContent` - Rich text editor configuration

### Content Features
- Image hotspot/crop support
- SEO fields on all pages
- Reference relationships (posts → authors/categories)
- Structured FAQs with Q&A pairs
- Flexible service/pricing configurations

---

## Development Guidelines

### Code Standards

#### Component Patterns
```typescript
// Use async server components for data fetching
export default async function PageName() {
  const data = await fetchData<PageType>(query)
  // ...
}

// Use shadcn/ui components with variants
<Button variant="outline" size="lg" asChild>
  <Link href="/path">Text</Link>
</Button>
```

#### Styling Conventions
- Use Tailwind utility classes
- Mobile-first responsive design
- Consistent spacing scale (px-4, py-20, etc.)
- CSS variables for theming (--background, --foreground, etc.)
- Container pattern: `container mx-auto max-w-[size]`

#### TypeScript Usage
- Define interfaces for all data types
- Use generics for reusable functions
- Strict null checks enabled
- Type all Sanity query responses

### Data Fetching Pattern
```typescript
import { fetchData } from "@/sanity/client"
import { pageQuery } from "@/sanity/lib/queries"

const data = await fetchData<DataType>(pageQuery)
```

---

## Current State & Known Issues

### ✅ Working Features
- All pages rendering with fallback content
- Sanity Studio accessible at /studio
- Blog system with dynamic routes
- Responsive navigation with mobile menu
- Server-side rendering for all pages
- TypeScript compilation without errors

### ⚠️ Needs Attention
1. **Content:** CMS needs population with real content (currently showing fallbacks)
2. **Environment:** Sanity project ID and dataset need configuration
3. **Forms:** Contact form needs backend integration
4. **Images:** Need proper alt text and optimization
5. **Analytics:** No tracking implementation
6. **Testing:** No test suite implemented

### 📝 Recent Changes
- Rebranded from CMO/marketing to design/development services
- Updated homepage hero, services, and testimonials
- Added comprehensive automation scripts for content management

---

## Available Scripts

### Core Commands
```bash
npm run dev          # Start development server (port 3000/3001)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run setup        # First-time developer setup
```

### Content Management
```bash
npm run backup:sanity    # Backup all CMS content
npm run restore:sanity   # Restore from backup
npm run fix:all          # Fix content issues interactively
npm run migrate:content  # Migrate sample content
npm run create:blog      # Create sample blog post
```

### Maintenance
```bash
npm run health:check    # System health diagnostic
npm run env:validate    # Configure environment variables
npm run check:content   # Validate CMS content
```

### Sanity Studio
```bash
npm run sanity:dev     # Start Sanity Studio locally
npm run sanity:build   # Build Studio for production
npm run sanity:deploy  # Deploy Studio to Sanity
```

---

## Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=     # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=        # Default: "production"
NEXT_PUBLIC_SANITY_API_VERSION=    # Default: "2024-01-01"
SANITY_API_TOKEN=                  # For write operations (optional)
```

---

## Important Notes for Claude

### When Making Changes
1. **Always preserve existing patterns** - Check neighboring files for conventions
2. **Use TypeScript strictly** - Define all types and interfaces
3. **Follow mobile-first design** - Start with mobile, enhance for desktop
4. **Test Sanity queries** - Ensure GROQ queries are valid before using
5. **Keep SEO in mind** - Maintain proper meta tags and heading hierarchy

### Project Context
- Client: Brian Fidler (Crafted Group)
- Originally built for CMO services, pivoted to web design/development
- Focus on professional presentation and lead generation
- Content management is critical for non-technical updates

### Deployment Considerations
- Typically deployed to Vercel (optimal for Next.js)
- Sanity Studio can be embedded or deployed separately
- Environment variables needed for all environments
- Consider ISR (Incremental Static Regeneration) for blog

### Common Tasks
- Adding new pages: Create schema → Add route → Create query
- Updating content: Use Sanity Studio at /studio
- Fixing issues: Run `npm run fix:all` for content problems
- Backing up: Always run `npm run backup:sanity` before major changes

---

## Quick Reference

### File Locations
- **Pages:** `src/app/[page]/page.tsx`
- **Components:** `src/components/`
- **Schemas:** `sanity/schemaTypes/`
- **Queries:** `sanity/lib/queries.ts`
- **Scripts:** `scripts/`
- **Types:** `types/` and inline in components

### Styling Classes (Common Patterns)
- **Container:** `container mx-auto max-w-6xl px-4`
- **Section:** `py-20 px-4`
- **Grid:** `grid grid-cols-1 md:grid-cols-3 gap-8`
- **Card:** `rounded-lg border bg-card p-6`
- **Button:** `<Button variant="default|outline|ghost" size="sm|lg">`

### Debugging Commands
- Check health: `npm run health:check`
- Validate env: `npm run env:validate`
- Check content: `npm run check:content`
- View logs: Check terminal running `npm run dev`

---

*Last updated: Project analysis completed with all systems operational*