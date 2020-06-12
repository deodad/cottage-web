const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'COTTAGE_API_HOST']),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/, /main/]),
  ],
})
