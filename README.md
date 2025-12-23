# 🌐 alditpra - My Personal Link Directory

> A modern, high-performance personal link directory built with Astro and Tailwind CSS 4, powered by Google Sheets as a free CMS. **100% free solution, no paid services required.**

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism UI with candy color palette
- 🌗 **Dark Mode** - Smooth theme toggle with system preference detection
- 📊 **Google Sheets as CMS** - Manage content without traditional databases
- 🔍 **Real-time Search** - Instant filtering with keyboard shortcuts (⌘K)
- 📱 **Fully Responsive** - Mobile-first design that works perfectly on all devices
- ⚡ **Lightning Fast** - Optimized SSR with Astro
- 🎯 **Dynamic Routing** - Level 0 (direct links) and Level 1 (detail pages)
- 🧙 **SANTET Generator** - AI prompt generator for academic assignments ("Senjata ANti TElat Tugas")
- 🔒 **Secure** - URL sanitization and external link protection
- 🌈 **Smooth Transitions** - View Transitions for SPA-like navigation
- 📂 **Google Drive Integration** - Embedded folder view for file management
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🔄 **Auto Data Refresh** - ISR with 5-minute cache revalidation
- 🎭 **Error Resilient** - Graceful error handling with fallback data

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.0
- **CSS**: [Tailwind CSS](https://tailwindcss.com) 4.0 (beta.1)
- **Icons**: [Lucide Icons](https://lucide.dev) via `astro-icon`
- **Fonts**: Inter (from Google Fonts)
- **Data Source**: Google Sheets (CSV export)
- **Deployment**: [Vercel](https://vercel.com) with ISR
- **TypeScript**: Full type safety
- **Utilities**: `clsx`, `tailwind-merge` for class management
- **Animation**: `framer-motion` for smooth transitions
- **CSV Parser**: `papaparse` for Google Sheets data

## 📁 Project Structure

```
alditpra/
├── src/
│   ├── components/
│   │   ├── features/          # Feature-specific components
│   │   │   ├── profile-card/  # Profile card with social links
│   │   │   │   ├── ProfileCard.astro
│   │   │   │   └── SocialLinks.astro
│   │   │   ├── category-section/ # Category filters
│   │   │   │   └── CategorySection.astro
│   │   │   └── LinkCard.astro # Link card component
│   │   ├── PromptGenerator/   # SANTET prompt UI components
│   │   │   ├── LivePreview.astro
│   │   │   └── PromptLayout.astro
│   │   ├── layout/            # Layout components
│   │   ├── shared/            # Shared components
│   │   ├── HomePage.astro     # Homepage component
│   │   └── ui/                # Reusable UI components
│   │       ├── MeshGradient.astro
│   │       ├── SafeIcon.astro
│   │       ├── SearchBar.astro
│   │       └── ThemeToggle.astro
│   ├── generators/            # Tool generators (top-level)
│   │   └── santet/            # SANTET prompt generator
│   │       ├── AssignmentTypeSelector.astro
│   │       ├── SantetForm.astro
│   │       ├── generator.ts
│   │       └── templates.ts
│   ├── layouts/
│   │   └── Layout.astro       # Base layout with View Transitions
│   ├── lib/
│   │   ├── category-utils.ts  # Category helpers
│   │   ├── colors.ts          # Dynamic color system
│   │   ├── constants.ts       # App configuration
│   │   ├── data.ts            # Google Sheets data fetching with caching
│   │   ├── drive-utils.ts     # Google Drive helpers
│   │   ├── error-handler.ts   # Error handling & retry logic
│   │   ├── security.ts        # URL sanitization
│   │   └── utils.ts           # General utilities
│   ├── mocks/
│   │   └── piccolore.ts       # Mock for piccolore library
│   ├── pages/
│   │   ├── index.astro        # Homepage route
│   │   ├── [id].astro         # Dynamic link detail pages
│   │   ├── santet.astro       # SANTET prompt generator
│   │   └── debug-data.astro   # Data debugging page
│   ├── scripts/
│   │   └── (internal scripts) # Build-time utilities
│   ├── styles/
│   │   └── global.css         # Global styles & CSS variables
│   └── types/
│       └── index.ts           # TypeScript definitions
├── public/
│   ├── avatar.webp            # Profile image (8KB, optimized)
│   ├── avatar-desktop.webp    # Desktop variant
│   ├── avatar-mobile.webp     # Mobile variant
│   ├── og-image.png           # OpenGraph preview image
│   ├── favicon.ico            # Browser favicon
│   ├── favicon.svg            # SVG favicon
│   ├── robots.txt             # SEO robots file
│   └── *.svg                  # Icon assets
├── scripts/
│   └── optimize-images.mjs    # Image optimization script
├── astro.config.mjs           # Astro + Vercel ISR config
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 22)
- npm or pnpm

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/alditpra/alditpra.git
   cd alditpra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Google Sheets** (Optional - use your own data)
   
   a. Create a Google Spreadsheet with 3 sheets:
   - `Links` - Main link data (Home sheet)
   - `Level1` - Detail page content
   - `Categories` - Category definitions
   
   b. Publish spreadsheet to web:
   - File → Share → Publish to web
   - Select each sheet individually and choose "CSV"
   - Copy the published URLs
   
   c. Update `src/lib/constants.ts`:
   ```typescript
   export const SHEET_URLS = {
       links: "YOUR_LINKS_SHEET_URL",
       level1: "YOUR_LEVEL1_SHEET_URL",
       categories: "YOUR_CATEGORIES_SHEET_URL",
   };
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open `http://localhost:4321`

## 📊 Google Sheets Schema

### Sheet: Home (Links)
| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique identifier (lowercase-with-dashes) |
| icon | string | Lucide icon name |
| name | string | Display name |
| category | string | Category ID (matches Categories sheet) |
| description | string | Short description |
| link | string | URL or empty for detail page |

**Notes:**
- Links are auto-detected: Google Drive folders → level 1 (iframe), other URLs → level 0 (direct link), empty → level 1 (detail page)
- Row order determines display order (no `order` column needed)
- All rows are active by default (no `active` column needed)

### Sheet: Level1
| Column | Type | Description |
|--------|------|-------------|
| id | string | Parent link ID (maps to Home sheet id) |
| link_id | string | Alternative to id (fallback) |
| title | string | Item title |
| description | string | Item description (optional) |
| link | string | Item URL |
| type | string | materi, buku, video, tugas, etc. |
| icon | string | Lucide icon name (optional) |

**Notes:**
- Row order determines display order (no `urutan` column needed)
- All rows are active by default (no `active` column needed)

### Sheet: Categories
| Column | Type | Description |
|--------|------|-------------|
| id | string | Category ID (lowercase-with-dashes) |
| title | string | Category display name |
| description | string | Category description (optional) |
| icon | string | Lucide icon name (optional) |

**Notes:**
- Row order determines display order (no `order` column needed)
- All rows are active by default (no `active` column needed)

## 🎨 Customization

### Colors
Edit the candy color palette in `src/styles/global.css`:
```css
:root {
  --candy-teal: #35e2c3;
  --candy-blue: #14d0f0;
  --candy-purple: #7f73ff;
  --candy-pink: #ff83c3;
  --candy-yellow: #ffe552;
}
```

### Site Configuration
Edit site information in `src/lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
    name: "Your Name",
    description: "Your description",
    tagline: "Your tagline",
    author: "Your Name",
};
```

### Profile Avatar
Replace `public/avatar.webp` with your own image (recommended: 230x230px, WebP format).

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel

1. **Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via GitHub (Recommended)**
   - Push code to GitHub
   - Import project in [Vercel Dashboard](https://vercel.com/new)
   - Automatic deployments on every push

### Environment Variables
No environment variables required! All configuration is in `constants.ts`.

## 🔧 Available Scripts

```bash
npm run dev             # Start development server
npm run start           # Alias for dev
npm run build           # Build for production  
npm run build:prod      # Build with image optimization
npm run preview         # Preview production build
npm run astro           # Run Astro CLI commands
npm run optimize:images # Optimize images in public/
```

## 🔄 Auto Data Updates

The site uses **Incremental Static Regeneration (ISR)** with 5-minute cache expiration:
- Update Google Sheets → Changes appear within 5 minutes
- No manual redeployment needed
- Development mode skips cache for instant updates
- Optimal balance between freshness and performance

## 🧙 SANTET Generator

**S**enjata **AN**ti **T**Elat **T**ugas - AI prompt generator for academic assignments.

Features:
- Individual & Group assignment modes
- Dynamic form fields based on assignment type
- Real-time prompt preview
- Copy to clipboard functionality
- Hallucination warning for AI-generated content

Access at: `/santet`

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to add features:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aldit Pratyasto**

- Website: [alditpra.vercel.app](https://alditpra.vercel.app)
- GitHub: [@alditpra](https://github.com/alditpra)

## 🙏 Acknowledgments

- [Astro](https://astro.build) - Amazing framework for content-focused sites
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide](https://lucide.dev) - Beautiful, consistent icon set
- [Vercel](https://vercel.com) - Free hosting with ISR support
- [Google Sheets](https://sheets.google.com) - Free CMS solution
- [@fontsource](https://fontsource.org) - Self-hosted fonts made easy

---npm

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ☕ by alditpra

</div>
