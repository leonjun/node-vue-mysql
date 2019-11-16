module.exports = {
    //...
    baseUrl: './',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: 'http://127.0.0.1:3000', 
    //         changeOrigin: true,
    //         pathRewrite: {
    //           '^/api':''
    //         }
    //       }
    //     }
    //   }
    
    devServer: {
        proxy: 'http://127.0.0.1:3000'
      }
}