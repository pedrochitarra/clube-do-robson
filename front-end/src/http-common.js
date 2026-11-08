import axios from 'axios'
import * as staticApi from './static-api'

// Relativo: o build é servido pelo próprio Express. Em `npm run serve`,
// o devServer.proxy do vue.config.js encaminha /api para localhost:5500
const api = axios.create({
  // No GitHub Pages, informe VUE_APP_API_URL com a URL do backend Express.
  // Localmente, o proxy continua encaminhando /api para localhost:5500.
  baseURL: process.env.VUE_APP_API_URL || '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

export default process.env.VUE_APP_STATIC_DATA === 'true' ? staticApi : api
