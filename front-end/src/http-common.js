import axios from 'axios'

// Relativo: o build é servido pelo próprio Express. Em `npm run serve`,
// o devServer.proxy do vue.config.js encaminha /api para localhost:5500
export default axios.create({
  // No GitHub Pages, informe VUE_APP_API_URL com a URL do backend Express.
  // Localmente, o proxy continua encaminhando /api para localhost:5500.
  baseURL: process.env.VUE_APP_API_URL || '/api',
  headers: {
    'Content-type': 'application/json'
  }
})
