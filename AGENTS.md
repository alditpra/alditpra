# Codebase Guide & Rules

## Project Overview
- **Framework**: Astro 5.0 (Server Output / SSR)
- **Styling**: Tailwind CSS 4.0 (Beta)
- **Deployment**: Vercel (ISR configured)
- **Data Source**: Google Sheets (CSV via `papaparse`)
- **Key Features**: Link Directory, SANTET (AI), SLOT (Randomizer), TUMBAL (Metadata)

## Build & Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (Astro + Tailwind) |
| `npm run preview` | Preview production build |
| `npm run optimize:images` | Run custom image optimization script |

## Code Style & Patterns

### 1. Astro Patterns
- **Components**: Use `.astro` files for UI. Keep logic in the "Frontmatter" script fence `---`.
- **Client Directives**: Use `client:load`, `client:visible`, or `client:idle` sparingly. Prefer `client:visible` for heavy interactive islands.
- **Images**: Use standard `<img>` or Astro `<Image />`. Current codebase uses `scripts/optimize-images.mjs`, so adhere to existing image pipelines.
- **Routing**: File-based routing in `src/pages`.

### 2. Styling (Tailwind CSS 4)
- **v4 Differences**: No `tailwind.config.js`. Config is in CSS variables in `src/styles/global.css`.
- **Dark Mode**: handled via `.dark` class on `<html>` element. Use `dark:` variant.
- **Colors**: Defined as CSS variables (e.g., `--candy-teal`, `--candy-purple`). Use utility classes that reference these.

### 3. TypeScript
- **Strict Mode**: Enabled. No `any` unless absolutely necessary (and temporarily).
- **Imports**: Use `@/` alias for `src/`.
  ```typescript
  import { SITE_CONFIG } from "@/lib/constants"; // ✅
  import { SITE_CONFIG } from "../lib/constants"; // ❌
  ```

### 4. Data Fetching
- **Google Sheets**: Data is fetched as CSV.
- **Caching**: Use `headers` or Vercel ISR options to cache data.
- **Structure**: See `src/lib/constants.ts` for sheet URLs.

### 5. Performance Guidelines (Critical)
- **Dynamic Imports**: Lazy load heavy libraries (`xlsx`, `canvas-confetti`).
  ```typescript
  // ✅ DO THIS
  const { default: confetti } = await import('canvas-confetti');
  
  // ❌ AVOID THIS (unless critical)
  import confetti from 'canvas-confetti';
  ```
- **CDN Usage**: Avoid mixed local/CDN usage. Use `npm` packages and dynamic imports to share chunks.
- **Fonts**: Use system fonts (sans-serif) as configured. Avoid adding heavy webfonts.

## Testing
- Currently no explicit test runner (Vitest/Jest) configured in `package.json`.
- Manual verification required:
  1. Build success (`npm run build`)
  2. Runtime check of key flows (Link loading, SANTET generation).

## Directory Structure
- `src/components`: UI components
- `src/layouts`: Page layouts (Layout.astro)
- `src/lib`: Utilities and constants
- `src/pages`: Routes
- `src/styles`: Global CSS
- `public`: Static assets

## Specific Rules
- **TUMBAL/SLOT**: These features use `xlsx`. Always lazy load this library.
- **Environment**: No `.env` needed; config is in `constants.ts`.
