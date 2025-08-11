import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        "purple-primary": "var(--purple-primary)",
        "purple-light": "var(--purple-light)",
        "purple-dark": "var(--purple-dark)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        orbitron: ["var(--font-orbitron)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "matrix-rain": {
          "0%": {
            transform: "translateY(-100vh)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh)",
            opacity: "0",
          },
        },
        "glow-pulse": {
          "0%": {
            boxShadow: "0 0 20px var(--matrix), 0 0 40px var(--matrix), 0 0 60px var(--matrix)",
          },
          "100%": {
            boxShadow: "0 0 10px var(--matrix), 0 0 20px var(--matrix), 0 0 30px var(--matrix)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(-20px) rotate(1deg)",
          },
          "66%": {
            transform: "translateY(-10px) rotate(-1deg)",
          },
        },
        "cyber-bounce": {
          "0%": {
            transform: "scale(0.8) rotateY(0deg)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.05) rotateY(180deg)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1) rotateY(360deg)",
            opacity: "1",
          },
        },
        "scan-line": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100vw)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "matrix-rain": "matrix-rain 2s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "cyber-bounce": "cyber-bounce 1s ease-out",
        "scan-line": "scan-line 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
