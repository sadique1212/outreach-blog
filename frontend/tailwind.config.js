/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        outreach: {
          bg: "#0a0a0f",
          surface: "#111118",
          card: "#16161f",
          border: "#252535",
          accent: "#ff6b2b",
          accent2: "#ff9f1c",
          teal: "#2bffe4",
          purple: "#a855f7",
          text: "#e8e8f0",
          muted: "#7070a0",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease infinite",
        "blink": "blink 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,107,43,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,107,43,0.7)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 90%, 100%": { scaleY: "1" },
          "95%": { scaleY: "0.05" },
        },
      },
    },
  },
  plugins: [],
};