import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "vault-amber": "#FFD52C",
        "vault-orange": "#FF5C00",
        "vault-red": "#C72D04",
        "vault-green": "#00FF00",
        "vault-rust": "#8B4513",
        "vault-dark": "#111111",
        "terminal-green": "#00FF41",
        "pip-boy": "#00C851",
        primary: "#FFD52C",
        secondary: "#FF5C00",
        tertiary: "#C72D04",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Courier New", "monospace"],
        fallout: ["VT323", "monospace"],
        retro: ["Share Tech Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "crt-scanlines":
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flicker: "flicker 0.15s infinite linear",
        static: "static 0.1s infinite linear",
        "crt-flicker": "crt-flicker 0.15s infinite linear",
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "0.99",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.4",
          },
        },
        static: {
          "0%": { transform: "translateX(0px)" },
          "10%": { transform: "translateX(-2px)" },
          "20%": { transform: "translateX(2px)" },
          "30%": { transform: "translateX(-1px)" },
          "40%": { transform: "translateX(1px)" },
          "50%": { transform: "translateX(-2px)" },
          "60%": { transform: "translateX(2px)" },
          "70%": { transform: "translateX(-1px)" },
          "80%": { transform: "translateX(1px)" },
          "90%": { transform: "translateX(-2px)" },
          "100%": { transform: "translateX(0px)" },
        },
        "crt-flicker": {
          "0%": { opacity: "1" },
          "97%": { opacity: "1" },
          "98%": { opacity: "0.98" },
          "99%": { opacity: "0.99" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        crt: "0 0 1rem rgba(255, 213, 44, 0.5), inset 0 0 1rem rgba(255, 213, 44, 0.1)",
        "amber-glow": "0 0 1rem rgba(255, 213, 44, 0.5)",
        "orange-glow": "0 0 1rem rgba(255, 92, 0, 0.5)",
        "red-glow": "0 0 1rem rgba(199, 45, 4, 0.5)",
        "green-glow": "0 0 1rem rgba(0, 255, 0, 0.5)",
        "fallout-border": "inset 0px 0px 2rem rgba(255, 213, 44, 0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
