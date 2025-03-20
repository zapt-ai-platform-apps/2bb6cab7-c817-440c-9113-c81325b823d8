export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7bc6fc',
          400: '#3aa2f8',
          500: '#1a82ef',
          600: '#0967e3',
          700: '#0853c9',
          800: '#0b46a4',
          900: '#0f3d82',
          950: '#0b2656',
        },
        secondary: {
          50: '#f4f8fd',
          100: '#e9f1fa',
          200: '#cee0f5',
          300: '#a4c7eb',
          400: '#74a7de',
          500: '#4b87d0',
          600: '#356bc2',
          700: '#2c57ac',
          800: '#29498d',
          900: '#264072',
          950: '#19284a',
        },
        accent: {
          50: '#eefdf8',
          100: '#d6faf0',
          200: '#b0f3e2',
          300: '#7ae8cf',
          400: '#41d4b5',
          500: '#21b99c',
          600: '#14a189',
          700: '#138071',
          800: '#14655c',
          900: '#14544d',
          950: '#0a312d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 28px -2px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCQkY0RkYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwSDI0VjBoNnYzMHpNMTggMzBoLTZWMGg2djMwem0tNiAwSDZWMGg2djMwek01NCAzMGgtNlYwaD2vjMwem0tNiAwSDQyVjBoNnYzMHptMTIgMGgtNlYwaD2vjMweiIvPjwvZz48L2c+PC9zdmc+');",
      }
    },
  },
  plugins: [],
};