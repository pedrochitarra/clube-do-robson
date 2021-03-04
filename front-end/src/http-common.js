import axios from 'axios'

// baseURL: http://localhost:5000/api for local
// baseURL: 'https://clubedorobson.herokuapp.com/api' for build

export default axios.create({
  baseURL: 'https://clubedorobson.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json'
  }
})
