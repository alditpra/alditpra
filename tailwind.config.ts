import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'candy-purple': 'var(--candy-purple)',
        'candy-blue': 'var(--candy-blue)',
        'candy-pink': 'var(--candy-pink)',
        'candy-orange': 'var(--candy-orange)',
        'candy-teal': 'var(--candy-teal)',
      },
    },
  },
}

export default config
