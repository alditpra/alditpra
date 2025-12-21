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
    name: "alditpra",
    description: "Open Source Project menggunakan Astro 5 dan Tailwind CSS 4, dengan Google Sheets sebagai database-nya. Solusi gratisan.",
    tagline: "Organized, Accessible, Always Updated",
    author: "Aldit Pratyasto",
    url: "https://alditpra.vercel.app", // Update with your actual domain
    ogImage: "/og-image.png", // OG preview image
} as const;
