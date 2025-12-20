import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        isr: {
            // Revalidate cache every 5 minutes (300 seconds) for fresh data
            expiration: 300,
            // Exclude paths that should never be cached
            exclude: [],
        },
        imageService: true,
        imagesConfig: {
            sizes: [320, 640, 768, 1024, 1280, 1536],
            formats: ['webp', 'avif'],
            domains: ['docs.google.com', 'drive.google.com'],
        },
    }),
    integrations: [
        icon(),
        // Uncomment after installing astro-compress:
        // import compress from 'astro-compress';
        // compress({
        //     CSS: true,
        //     HTML: {
        //         removeAttributeQuotes: false,
        //         collapseWhitespace: true,
        //         conservativeCollapse: true,
        //     },
        //     Image: false, // We handle images separately
        //     JavaScript: true,
        //     SVG: true,
        // }),
    ],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "piccolore": path.resolve(__dirname, "./src/mocks/piccolore.ts"),
            },
        },
        ssr: {
            // Force bundle library utility kecil agar tidak perlu resolve dari node_modules di runtime
            noExternal: ['clsx', 'tailwind-merge', '@astrojs/vercel', 'astro-icon'],
        },
        build: {
            cssCodeSplit: true,
            minify: 'esbuild',
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor': ['papaparse'],
                    },
                },
            },
        },
    },
});
