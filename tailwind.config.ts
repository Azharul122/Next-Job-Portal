import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
      },
      colors: {
        'transparentBGprimary': 'rgba(2, 8, 23,0.9)',
        'transparentBGDarkprimary': 'rgba(255, 126, 95,0.9)',
        'gradient-start': '#ff7e5f', // Starting color
        'gradient-end': '#feb47b',
        "darkbg":"#000b1f",
        "lightbg":"#f8f8f8",
        // primaryText:"",
        // seconderyText:"",
        // gradientTextDark:"",
        // gradientTextLight:"",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #ff7e5f, #feb47b)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    
    function ({ addUtilities }) {
      addUtilities({
        '.gradient-text': {
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.gradient-icon': {
          fontSize: '15px',
          background: 'linear-gradient(to bottom, #ff7e5f 0%, #feb47b 100%)',
          '-webkit-background-clip': 'text',
          '-moz-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          display: 'inline-block', 
          'color': 'transparent', // Fallback for non-WebKit browsers
        },
      });
    },
  ],
} satisfies Config

export default config