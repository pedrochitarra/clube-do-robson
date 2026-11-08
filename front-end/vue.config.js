module.exports = {
  // GitHub Pages serve em /<repo>/; PUBLIC_PATH vem do workflow
  publicPath: process.env.PUBLIC_PATH || '/',
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': { target: 'http://localhost:5500' }
    }
  }
}
