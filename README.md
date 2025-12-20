# 🌐 alditpra - Personal Link Directory

> Web ini dibangun menggunakan Astro dan Tailwind CSS 4, dengan Google Sheets sebagai database-nya. **Solusi gratis tanpa bayar.**

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism UI dengan candy color palette
- 📊 **Google Sheets as CMS** - Kelola konten tanpa database tradisional
- 🔍 **Real-time Search** - Cari link dengan instant filtering
- 📱 **Fully Responsive** - Mobile-first design yang sempurna di semua device
- ⚡ **Lightning Fast** - Server-side rendering dengan Astro
- 🎯 **Dynamic Routing** - Level 0 (direct links) dan Level 1 (detail pages)
- 🔒 **Secure** - URL sanitization dan external link protection
- 🌈 **Animated UI** - Smooth transitions dan hover effects
- 📂 **Google Drive Integration** - Embedded folder view untuk file management
- ♿ **Accessible** - Keyboard shortcuts (⌘K untuk search) dan semantic HTML

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.0
- **CSS**: [Tailwind CSS](https://tailwindcss.com) 4.0 (Beta)
- **Icons**: [Lucide Icons](https://lucide.dev) via `astro-icon`
- **Data Source**: Google Sheets (CSV export)
- **Deployment**: [Vercel](https://vercel.com)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)
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
│   │   └── ui/                # Reusable UI components
│   │       ├── MeshGradient.astro
│   │       └── SearchBar.astro
│   ├── layouts/
│   │   └── Layout.astro       # Base layout
│   ├── lib/
│   │   ├── data.ts            # Google Sheets data fetching
│   │   ├── security.ts        # URL sanitization
│   │   ├── error-handler.ts   # Error handling & retry logic
│   │   ├── colors.ts          # Color system
│   │   ├── category-utils.ts  # Category helpers
│   │   └── constants.ts       # App configuration
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   └── [id].astro         # Dynamic link detail pages
│   ├── styles/
│   │   └── global.css         # Global styles & CSS variables
│   └── types/
│       └── index.ts           # TypeScript types
├── public/
│   └── avatar.webp            # Profile image (optimized)
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 22)
- npm atau pnpm

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/alditpra.git
   cd alditpra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Google Sheets** (Optional - jika ingin menggunakan data sendiri)
   
   a. Buat Google Spreadsheet dengan 3 sheets:
   - `Links` - Data link utama
   - `Level1` - Data detail untuk level 1 pages
   - `Categories` - Data kategori
   
   b. Publish spreadsheet to web:
   - File → Share → Publish to web
   - Pilih "Entire Document" dan "CSV"
   - Copy URL-nya
   
   c. Update `src/lib/constants.ts`:
   ```typescript
   const SPREADSHEET_BASE_URL = "YOUR_PUBLISHED_SPREADSHEET_URL";
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Website akan berjalan di `http://localhost:4321`

## 📊 Google Sheets Schema

### Sheet: Links
| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique identifier (lowercase) |
| name | string | Display name |
| description | string | Short description |
| icon | string | Lucide icon name |
| category | string | Category ID |
| link | string | URL (for level 0) or empty (for level 1) |
| level | number | 0 = direct link, 1 = detail page |
| active | number | 1 = active, 0 = hidden |
| order | number | Display order |

### Sheet: Level1
| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique ID (priority over link_id) |
| link_id | string | Parent link ID |
| title | string | Item title |
| description | string | Item description |
| link | string | Item URL |
| type | string | materi, buku, video, tugas, etc. |
| icon | string | Lucide icon name |
| urutan | number | Display order |
| active | number | 1 = active, 0 = hidden |

### Sheet: Categories
| Column | Type | Description |
|--------|------|-------------|
| id | string | Category ID |
| title | string | Category name |
| description | string | Category description |
| icon | string | Lucide icon name |
| order | number | Display order |
| active | number | 1 = active, 0 = hidden |

## 🎨 Customization

### Colors
Edit candy color palette di `src/styles/global.css`:
```css
:root {
  --candy-teal: #35e2c3;
  --candy-blue: #14d0f0;
  --candy-purple: #7f73ff;
  --candy-pink: #ff83c3;
  --candy-yellow: #ffe552;
}
```

### Site Config
Edit informasi site di `src/lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
    name: "Your Name",
    description: "Your description",
    tagline: "Your tagline",
    author: "Your Name",
};
```

## 📦 Build & Deployment

### Build untuk Production
```bash
npm run build
```

### Deploy ke Vercel

1. **Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via GitHub**
   - Push code ke GitHub
   - Import project di [Vercel Dashboard](https://vercel.com/new)
   - Deploy akan otomatis

### Environment Variables
Tidak ada environment variable yang diperlukan! Semua konfigurasi ada di `constants.ts`.

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run astro    # Run Astro CLI commands
```

## 🎯 Performance

- ✅ **Lighthouse Score**: 95+
- ⚡ **LCP**: < 2.5s
- 📦 **Bundle Size**: Optimized dengan dynamic imports
- 🖼️ **Images**: WebP format dengan preload
- 🔄 **Caching**: Smart caching strategy (5 minutes)

## 🤝 Contributing

Contributions are welcome! Jika Anda menemukan bug atau ingin menambahkan fitur:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aldit Pratyasto**

- Website: [alditpra.vercel.app](https://alditpra.vercel.app)
- GitHub: [@alditpra](https://github.com/alditpra)

## 🙏 Acknowledgments

- [Astro](https://astro.build) - Amazing framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Lucide](https://lucide.dev) - Beautiful icons
- [Vercel](https://vercel.com) - Free hosting platform
- [Google Sheets](https://sheets.google.com) - Free CMS solution

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and ☕ by Aldit Pratyasto

</div>
