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
          bg: "#FAFAF8",       // Soft Cream / Off-white (from backup)
          card: "rgba(255, 255, 255, 0.9)", // Pure white light glass
          surface: "#F0EFEB",  // Light gray surface
          accent: "#E85D3F",   // Warm Coral
          secondary: "#4F46E5",// Electric Indigo
          text: "#1A1A1A",     // Near-black text
          muted: "#666666",    // Muted dark gray
          border: "#E0DFDB"    // Warm gray border
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
