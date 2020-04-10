const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["src/**/*.js"],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NETLIFY || process.env.NODE_ENV === "production"
      ? [
          purgecss,
          require("cssnano")({
            preset: "default",
          }),
        ]
      : []),
  ],
}
