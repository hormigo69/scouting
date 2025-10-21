/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.js",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos (mapeados desde esquema original)
        'applus-orange': '#FF8C00',
        'applus-orange-dark': '#e67e00',
        'applus-orange-light': '#FFA500',
        'applus-orange-bg': '#fff8f0',
        'applus-orange-border': '#ffe4b5',
        
        // Colores adicionales del diseño actual
        'applus-gray': {
          50: '#f8f9fa',
          100: '#f0f0f0',
          200: '#e5e7eb',
          300: '#bdc3c7',
          400: '#6b7280',
          500: '#4b5563',
          600: '#333333',
          700: '#2c3e50',
          800: '#1f2937',
          900: '#111827'
        }
      },
      fontFamily: {
        'sans': ['Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'applus': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'applus-lg': '0 4px 12px rgba(255, 140, 0, 0.15)',
        'applus-xl': '0 6px 20px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
