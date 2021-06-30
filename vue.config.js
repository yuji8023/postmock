module.exports = {
  outputDir: 'postmock',
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    // proxy: 'https://passport.111.com.cn'
    // {
    //   '/api': {
    //     target: 'https://passport.111.com.cn',
    //     ws: true,
    //     changeOrigin: true
    //   },
    // }
  }
}