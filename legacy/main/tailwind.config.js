module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwindcss-dark-mode/prefers-dark.js",
  ],
  // experimental: {
  //   darkModeVariant: true,
  // },
  // dark: "class",
  theme: {
    darkSelector: ".dark-mode",
  },
  variants: {
    backgroundColor: [
      "dark",
      "dark-hover",
      "dark-group-hover",
      "dark-even",
      "dark-odd",
      "hover",
      "responsive",
    ],
    borderColor: [
      "dark",
      "dark-focus",
      "dark-focus-within",
      "hover",
      "responsive",
    ],
    textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"],
  },
  plugins: [require("tailwindcss-dark-mode")()],
  purgeCSS: {
    whitelist: ["dark-mode"],
  },
};
