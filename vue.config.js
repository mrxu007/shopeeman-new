/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-27 21:34:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\vue.config.js
 */
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
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
  // devServer: {

<<<<<<< HEAD
  //   public: '172.16.11.38:8080',
=======
    // public: '172.16.11.50:8080',
>>>>>>> cdc6b54ef3f87b0b855c4fc8685c55c8002f7679

  //   hot: true,

  //   disableHostCheck: true

  // }
}
