// Google Sheets CSV Export URLs
// The spreadsheet must be published to the web for CSV export

const SPREADSHEET_BASE_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSl2jtFyjweEYWlMYJnH4p9-Nxd4emr-eGythForJVtGIMFCjWskoum4gLqhdAMzgsA64j0f0EPhIK6/pub";

export const SHEET_URLS = {
    links: `${SPREADSHEET_BASE_URL}?gid=0&output=csv`,
    level1: `${SPREADSHEET_BASE_URL}?gid=1242471507&output=csv`,
    categories: `${SPREADSHEET_BASE_URL}?gid=1984945743&output=csv`,
} as const;

// Fetch timeout in milliseconds (10 seconds)
export const FETCH_TIMEOUT = 10000;

// Site metadata
export const SITE_CONFIG = {
    name: "Aldit Pratyasto",
    description: "Open Source Project menggunakan Astro 5 dan Tailwind CSS 4, dengan Google Sheets sebagai database-nya. Solusi gratisan.",
    tagline: "Personal Link Directory",
    // Typewriter effect phrases
    profilePhrases: [
        "Lecturer & Tech Enthusiast",
        "Lecturer & Full Stack Architect",
        "Lecturer & Cloud Engineer",
        "Lecturer & Data Scientist",
    ],
    author: "Aldit Pratyasto",
    url: "https://alditpra.vercel.app", // Update with your actual domain
    ogImage: "/og-image.webp", // OG preview image (WebP optimized)
} as const;

// UI Text Constants
export const UI_TEXT = {
    // Navigation
    back: "Kembali",
    backToHome: "Kembali ke Home",
    tryAgain: "Coba Lagi",
    refresh: "Refresh",

    // General
    search: "Cari link, tools, atau resource...",
    searchPlaceholder: "Cari...",
    noResults: "Tidak ada hasil ditemukan",
    noResultsHint: "Coba kata kunci lain atau ubah kategori.",

    // Errors
    loadError: "Gagal Memuat Data",
    loadErrorMessage: "Terjadi kesalahan saat mengambil data dari Google Sheets.",
    loadErrorHint: "Silakan refresh halaman atau coba lagi nanti.",

    // Tools
    santet: {
        shortName: "SANTET",
        fullName: "SANTET - Senjata ANti TElat Tugas",
        description: "Generator prompt AI untuk membantu mahasiswa brainstorming dan menyelesaikan tugas tepat waktu.",
        warning: "AI bisa keliru (halusinasi). Verifikasi semua fakta, referensi, dan data. Gunakan hasil untuk belajar, bukan copy-paste.",
    },
    slot: {
        shortName: "SLOT",
        fullName: "SLOT - Saatnya LOtre Tanya",
        description: "Sistem pemilihan acak mahasiswa untuk sesi tanya jawab di kelas.",
    },
    tumbal: {
        shortName: "TUMBAL",
        fullName: "TUMBAL - Tabel Urut Mudah Buat Analisa Lanjutan",
        description: "Konversi tabel dengan nested headers dan merged cells menjadi format rapi untuk analisa lanjutan.",
        quote: "Mengorbankan tabel lama yang jelek demi mendapatkan kekayaan data yang melimpah. Contohnya tabel BPS.",
    },

    // Categories
    categories: "Kategori",
    allData: "All Data",

    // Buttons
    copy: "Salin",
    copyPrompt: "Salin Prompt",
    copied: "✓ Disalin!",
    download: "Download",
    upload: "Upload",
    clear: "Hapus",
    reset: "Reset",
    confirm: "Konfirmasi",
    cancel: "Batal",
    skip: "Lewati",

    // Empty states
    noContent: "Belum ada konten untuk topik ini.",
    noStudents: "Belum ada data mahasiswa.",
    noHistory: "Belum ada riwayat pemilihan.",
} as const;
