import axios from 'axios'

// Relativo: o build é servido pelo próprio Express. Em `npm run serve`,
// o devServer.proxy do vue.config.js encaminha /api para localhost:5500.
// No GitHub Pages (VUE_APP_STATIC=true) a API vira JSON estático gerado por
// scripts/export_static.js: /api/membros/1 -> <base>api/membros/1.json
const isStatic = process.env.VUE_APP_STATIC === 'true'

const http = axios.create({
  baseURL: isStatic ? `${process.env.BASE_URL}api` : '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

if (isStatic) {
  http.interceptors.request.use(config => {
    const path = config.url.replace(/\/+$/, '') || '/index'
    config.url = path.split('/').map(encodeURIComponent).join('/') + '.json'
    return config
  })
}

export default http
