module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-import"),
    require("postcss-node-sass"),
    require("autoprefixer"),
    ...(process.env.NETLIFY || process.env.NODE_ENV === "production"
      ? [
          require("cssnano")({
            preset: "default",
          }),
        ]
      : []),
  ],
}
