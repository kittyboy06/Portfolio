/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: "#0A0A12",        // Deep space dark (Anime.js inspired)
          card: "rgba(18, 18, 30, 0.7)", // Frosted dark glass
          surface: "rgba(255, 255, 255, 0.04)",
          accent: "#06B6D4",    // Vibrant Cyan
          secondary: "#8B5CF6", // Luminous Violet
          indigo: "#6366F1",    // Luminous Indigo
          rose: "#F43F5E",      // Neon Rose
          text: "#F8FAFC",      // Slate 50 text
          muted: "#94A3B8",     // Slate 400 muted text
          border: "rgba(255, 255, 255, 0.12)" // Glass edge line
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-orb-1': 'floatOrb1 24s ease-in-out infinite alternate',
        'float-orb-2': 'floatOrb2 28s ease-in-out infinite alternate',
        'float-orb-3': 'floatOrb3 22s ease-in-out infinite alternate',
      },
      keyframes: {
        floatOrb1: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(80px, 120px) scale(1.15)' },
        },
        floatOrb2: {
          '0%': { transform: 'translate(0px, 0px) scale(1.1)' },
          '100%': { transform: 'translate(-100px, -80px) scale(0.9)' },
        },
        floatOrb3: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(60px, -90px) scale(1.2)' },
        },
      }
    },
  },
  plugins: [],
}
