module.exports = {
  // GitHub Pages serve em /<repo>/; PUBLIC_PATH vem do workflow
  publicPath: process.env.PUBLIC_PATH || '/',
  // O lint fica no `npm run lint`; no CI o .eslintrc.json da raiz quebra o eslint-loader
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
