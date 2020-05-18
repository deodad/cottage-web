const { colors } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.html"],
  theme: {
    opacity: {
      "00dp": "0",
      "01dp": "0.05",
      "02dp": "0.07",
      "03dp": "0.08",
      "04dp": "0.09",
      "06dp": "0.11",
      "08dp": "0.12",
      "12dp": "0.14",
      "16dp": "0.15",
      "24dp": "0.16",
      "0": "0",
      "100": "1",
      disabled: "0.38",
      medium: "0.60",
      high: "0.87",
    },
    colors: {
      ...colors,
      white: "rgb(253, 253, 251)",
      black: "rgb(3, 3, 5)",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      error: "var(--color-error)",
      brand: "rgb(103, 43, 38)",
      "simply-white": "rgb(247, 247, 238)",
      "whippie-blue": "rgb(119, 159, 177)",
      "fairmont-green": "rgb(100, 133, 106)",
    },
  },
}
