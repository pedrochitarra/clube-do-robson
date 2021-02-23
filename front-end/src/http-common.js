import axios from 'axios'

// baseURL: http://localhost:5000/api for local
// baseURL: /api for build

export default axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json'
  }
})
