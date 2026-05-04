import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'stemo-dark':     '#0d0d0d',
        'stemo-dark-alt': '#111110',
        'stemo-card':     '#1a1a18',
        'stemo-bg-deep':  '#0a0a09',
        'gold': {
          50:  '#fdf8ec',
          100: '#f7e9c0',
          200: '#edd48a',
          300: '#e8d5a3',
          400: '#d4af37',
          500: '#c9a84c',
          600: '#b8860b',
          700: '#9a7009',
          800: '#7a5c0a',
          900: '#4a3706',
        },
      },
      backgroundImage: {
        'gradient-gold':     'linear-gradient(135deg, #e8d5a3 0%, #d4af37 45%, #b8860b 100%)',
        'gradient-gold-btn': 'linear-gradient(135deg, #c9a84c 0%, #b8860b 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
