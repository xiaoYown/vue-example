const path =	require('path')

module.exports = {
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /\//,
        to: '/index.html'
      }]
    },
    hot: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'config': path.resolve(__dirname, './config')
    }
  }
};
