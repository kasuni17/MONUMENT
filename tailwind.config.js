/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: {
          DEFAULT: '#FAF7F2',
          dim: '#F1ECE4',
          deep: '#E7E0D5',
        },
        ink: {
          DEFAULT: '#15120E',
          soft: '#3B352C',
          muted: '#655E4E',
          faint: '#6C6555',
        },
        line: {
          DEFAULT: '#E0D8CB',
          strong: '#CBC1B1',
          dark: '#2A2620',
          darkStrong: '#3B352D',
        },
        accent: {
          DEFAULT: '#8A3B2A',
          /** Only ever used as text on a dark ground, so it is tuned for that contrast. */
          soft: '#E09274',
          strong: '#75311F',
          wash: '#F4E9E4',
        },
        surface: {
          dark: '#121110',
          darkAlt: '#1B1917',
          darkSoft: '#23201C',
        },
      },
      maxWidth: {
        container: '1280px',
        prose: '680px',
        measure: '58ch',
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.1', letterSpacing: '0.12em' }],
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        riseIn: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        overlayIn: { from: { opacity: 0, transform: 'translateY(-8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out',
        riseIn: 'riseIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        slideIn: 'slideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        overlayIn: 'overlayIn 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
