import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#a46b5e",
        secondary: "#DADADA",
        tertiary: "#00FFDB",
      },
      keyframes: {
        bounce: {
          "0%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(0)" },
          "80%": { transform: "translateY(0)" },
          "100%": {
            transform: "translateY(0)",
          },
          "40%": {
            transform: "translateY(-30px)",
          },
          "60%": {
            transform: "translateY(-15px)",
          },
          "70%": {
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        "bounce-animation": "bounce 0.75s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
