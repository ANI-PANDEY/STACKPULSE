/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          jet: '#050508',
          black: '#000000',
          dark: '#0A0A10',
          darker: '#06060A',
          card: '#0D0D16',
          border: 'rgba(255, 255, 255, 0.08)',
          pink: {
            DEFAULT: '#FF007F',
            hot: '#FF1493',
            neon: '#FF2A85',
            light: '#FF69B4',
            dark: '#D6006B'
          },
          yellow: {
            DEFAULT: '#FFE600',
            electric: '#FCEE0A',
            bright: '#FFF01F',
            amber: '#FFB703'
          },
          emerald: '#10B981',
          indigo: '#6366F1',
          cyan: '#06B6D4',
          rose: '#F43F5E'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(255, 0, 127, 0.45)',
        'glow-pink-lg': '0 0 50px -10px rgba(255, 0, 127, 0.55)',
        'glow-yellow': '0 0 25px rgba(255, 230, 0, 0.45)',
        'glow-cyber': '0 0 35px rgba(255, 0, 127, 0.35), 0 0 15px rgba(255, 230, 0, 0.25)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'pulse-pink': 'pulsePink 2.5s infinite ease-in-out',
        'pulse-yellow': 'pulseYellow 2s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        pulsePink: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 0, 127, 0.35)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 20, 147, 0.65)', transform: 'scale(1.02)' },
        },
        pulseYellow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)', filter: 'drop-shadow(0 0 8px rgba(255, 230, 0, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
