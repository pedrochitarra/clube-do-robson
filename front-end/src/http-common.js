import axios from 'axios'

// Relativo: o build é servido pelo próprio Express. Em `npm run serve`,
// o devServer.proxy do vue.config.js encaminha /api para localhost:5500
export default axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json'
  }
})
