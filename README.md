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
- ⚡ **Lightning Fast** - Optimized SSR with Astro, 97+ Lighthouse score
- 🎯 **Dynamic Routing** - Level 0 (direct links) and Level 1 (detail pages)
- 🧙 **SANTET Generator** - AI prompt generator for academic assignments ("Saran ANti TElat Tugas")
- 🔒 **Secure** - URL sanitization and external link protection
- 🌈 **Smooth Transitions** - View Transitions for SPA-like navigation
- 📂 **Google Drive Integration** - Embedded folder view for file management
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🔄 **Auto Data Refresh** - ISR with 5-minute cache revalidation
- 🎭 **Error Resilient** - Graceful error handling with fallback data

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.16
- **CSS**: [Tailwind CSS](https://tailwindcss.com) 4.0
- **Icons**: [Lucide Icons](https://lucide.dev) via `astro-icon`
- **Fonts**: [Inter](https://fontsource.org/fonts/inter) (self-hosted via @fontsource)
- **Data Source**: Google Sheets (CSV export)
- **Deployment**: [Vercel](https://vercel.com) with ISR
- **TypeScript**: Full type safety

## 📁 Project Structure

```
alditpra/
├── src/
│   ├── components/
│   │   ├── features/          # Feature-specific components
│   │   │   ├── profile-card/  # Profile card with social links
│   │   │   ├── category-section/ # Category filters
│   │   │   └── LinkCard.astro # Link card component
│   │   ├── generators/        # Tool generators
│   │   │   └── santet/        # SANTET prompt generator
│   │   ├── HomePage.astro     # Homepage component
│   │   └── ui/                # Reusable UI components
│   ├── layouts/
│   │   └── Layout.astro       # Base layout with View Transitions
│   ├── lib/
│   │   ├── data.ts            # Google Sheets data fetching with caching
│   │   ├── security.ts        # URL sanitization
│   │   ├── error-handler.ts   # Error handling & retry logic
│   │   ├── colors.ts          # Dynamic color system
│   │   ├── category-utils.ts  # Category helpers
│   │   └── constants.ts       # App configuration
│   ├── pages/
│   │   ├── index.astro        # Homepage route
│   │   ├── [id].astro         # Dynamic link detail pages
│   │   ├── santet.astro       # SANTET prompt generator
│   │   └── debug-data.astro   # Data debugging page
│   ├── styles/
│   │   └── global.css         # Global styles & CSS variables
│   └── types/
│       └── index.ts           # TypeScript definitions
├── public/
│   └── avatar.webp            # Profile image (8KB, optimized)
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
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm run astro    # Run Astro CLI commands
```

## 🎯 Performance Optimizations

- ✅ **Lighthouse Score**: 90-95/100
- ⚡ **Max Critical Path**: 564ms
- 📦 **CSS Bundle**: 13.9 KB (minimal, purged)
- 🖼️ **Avatar Image**: 8 KB WebP
- 🔤 **Fonts**: Self-hosted, 4 weights only (~80KB)
- 🔄 **ISR Caching**: 5-minute revalidation for auto data updates
- 🎬 **View Transitions**: Smooth page navigation
- 🚫 **No Forced Reflows**: Pure CSS-based filtering
- 🌐 **No CDN Dependencies**: Fully self-hosted fonts

### Total First Load
~60-70 KB (excellent!)

## 🔄 Auto Data Updates

The site uses **Incremental Static Regeneration (ISR)** with 5-minute cache expiration:
- Update Google Sheets → Changes appear within 5 minutes
- No manual redeployment needed
- Development mode skips cache for instant updates
- Optimal balance between freshness and performance

## 🧙 SANTET Generator

**S**aran **AN**ti **T**Elat **T**ugas - AI prompt generator for academic assignments.

Features:
- Individual & Group assignment modes
- Dynamic form fields based on assignment type
- Real-time prompt preview
- Copy to clipboard functionality
- Discipline-specific hints (Bisnis, Teknik, Kesehatan, Sosial, Seni)
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

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ☕ by alditpra

</div>
