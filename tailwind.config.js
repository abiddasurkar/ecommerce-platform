/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#ffffff',
        'bg-dark': '#0f172a',
        'surface-light': '#f9fafb',
        'surface-dark': '#1e293b',
        'border-light': 'rgba(0, 0, 0, 0.1)',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
        'text-light': '#1f2937',
        'text-dark': '#f3f4f6',
      },

      /* 🌀 Custom Animations */
      animation: {
        'float-slow': 'float-slow 25s ease-in-out infinite',
        'float-slower': 'float-slower 35s ease-in-out infinite',
        'float-random': 'float-random 45s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        'float-slow': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
          },
          '33%': { 
            transform: 'translateY(-30px) translateX(20px) rotate(120deg)',
          },
          '66%': { 
            transform: 'translateY(15px) translateX(-25px) rotate(240deg)',
          },
        },
        'float-slower': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
          },
          '25%': { 
            transform: 'translateY(-40px) translateX(15px) scale(1.1)',
          },
          '50%': { 
            transform: 'translateY(-60px) translateX(-10px) scale(0.9)',
          },
          '75%': { 
            transform: 'translateY(-20px) translateX(-20px) scale(1.05)',
          },
        },
        'float-random': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
            opacity: '0.3'
          },
          '25%': { 
            transform: 'translateY(-50px) translateX(25px) rotate(90deg)',
            opacity: '0.6'
          },
          '50%': { 
            transform: 'translateY(-80px) translateX(-15px) rotate(180deg)',
            opacity: '0.8'
          },
          '75%': { 
            transform: 'translateY(-30px) translateX(-30px) rotate(270deg)',
            opacity: '0.5'
          },
        },
        'pulse-slow': {
          '0%, 100%': { 
            opacity: '0.05',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.1',
            transform: 'scale(1.05)'
          },
        },
        'float': {
          '0%, 100%': { 
            transform: 'translateY(0px)'
          },
          '50%': { 
            transform: 'translateY(-10px)'
          },
        },
        'glow': {
          '0%': { 
            boxShadow: '0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.5)'
          },
        }
      },

      /* 🌈 Backgrounds & Effects */
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'dark-glass-gradient': 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))',
      },
      
      backgroundSize: {
        'grid-size': '50px 50px',
      },

      /* 💫 Glow Effects */
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.5)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },

      /* 🌫️ Backdrop Utilities */
      backdropBlur: {
        xs: '2px',
        '4xl': '80px',
      },
      
      backdropOpacity: {
        15: '0.15',
      },

      /* ✨ Additional Utilities */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      scale: {
        '102': '1.02',
      },
      
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },
      
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      
      animationDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.dark-glass-effect': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}