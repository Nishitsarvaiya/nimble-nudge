import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--primary-font)", ...fontFamily.sans],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				chat: {
					DEFAULT: "hsl(var(--chat))",
					foreground: "hsl(var(--chat-foreground))",
				},
				gray: {
					DEFAULT: "hsl(var(--gray))",
					500: "hsl(var(--gray-light))",
					900: "hsl(var(--gray-text))",
				},
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
			animation: {
				spinner: "spinner 1s linear infinite",
			},
			rotate: {
				"30": "30deg",
				"60": "60deg",
				"90": "90deg",
				"120": "120deg",
				"150": "150deg",
				"180": "180deg",
				"210": "210deg",
				"240": "240deg",
				"270": "270deg",
				"300": "300deg",
				"330": "330deg",
				"360": "360deg",
			},
			keyframes: {
				spinner: {
					"0%": {
						backgroundColor: "hsl(var(--primary))",
					},
					"100%": {
						backgroundColor: "transparent",
					},
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
export default config;
