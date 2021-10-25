const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  publicPath: './',
  // outputDir: './Debug/Plugins/js-home',
  lintOnSave: false, // 关闭Eslint
  productionSourceMap: false,
  configureWebpack: {
    // 警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 500000000,
      // 生成文件的最大体积
      maxAssetSize: 3000000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  devServer: {

    public: '172.16.11.38:8080',

    hot: true,

    disableHostCheck: true

  }
}
