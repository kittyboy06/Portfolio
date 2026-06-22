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
          bg: "#FAFAF8",       // Soft Cream/Off-white
          card: "#FFFFFF",     // Pure White card
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
    },
  },
  plugins: [],
}
