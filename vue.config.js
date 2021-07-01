module.exports = {
  outputDir: 'postmock',
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    proxy: 'https://gateway.fangkuaiyi.com'
    // {
    //   '/api': {
    //     target: 'https://passport.111.com.cn',
    //     ws: true,
    //     changeOrigin: true
    //   },
    // }
  }
}