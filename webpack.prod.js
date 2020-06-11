const merge = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/, /main/]),
  ],
})
