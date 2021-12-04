module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      darkLightBlue: "#3a0ca3",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
