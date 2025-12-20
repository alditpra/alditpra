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
            // Revalidate cache every 5 minutes (300 seconds)
            expiration: 300,
            // Exclude paths that should never be cached
            exclude: [],
        },
    }),
    integrations: [icon()],
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
    },
});
