/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        accent: {
          50: '#fff0f6',
          100: '#ffddd2',
          200: '#ffbfba',
          300: '#ff9c9c',
          400: '#ff7a7a',
          500: '#ff4d4f',
          600: '#f5222d',
          700: '#cf1322',
          800: '#a8071a',
          900: '#820014',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'rotate-3d': 'rotate3d 0.6s ease-in-out',
        'bounce-soft': 'bounceSoft 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotate3d: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '50%': { transform: 'perspective(1000px) rotateY(180deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(360deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(24, 144, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(24, 144, 255, 0.8)' },
        },
      },
      boxShadow: {
        '3d': '0 10px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)',
        '3d-dark': '0 10px 30px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2)',
        'inner-3d': 'inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
