module.exports = {
  // O repositório é publicado em /clube-do-robson/ no GitHub Pages.
  // Em desenvolvimento, o app continua sendo servido na raiz.
  publicPath: process.env.VUE_APP_BASE_URL || (process.env.NODE_ENV === 'production' ? '/clube-do-robson/' : '/'),
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': { target: 'http://localhost:5500' }
    }
  }
}
