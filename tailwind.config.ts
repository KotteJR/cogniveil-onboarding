import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:             '#080d18',
        surface:        '#0d1525',
        'surface-2':    '#101e33',
        'surface-3':    '#162236',
        border:         '#1a2a40',
        'border-subtle':'#0f1e30',
        accent:         '#00d4ff',
        'accent-2':     '#00b8e6',
        'text-primary': '#dce8f5',
        'text-secondary':'#7a90ae',
        'text-muted':   '#3d5470',
        warning:        '#f0a429',
        'warning-dim':  '#1a1200',
        success:        '#00d084',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono:    ['var(--font-mono)',    'Courier New', 'monospace'],
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease forwards',
        'slide-up':      'slideUp 0.4s ease forwards',
        'pulse-accent':  'pulseAccent 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseAccent: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

export default config
