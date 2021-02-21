import http from '../http-common'

class RobsonService {
  getAll () {
    return http.get('/robsoners/')
  }

  get (name) {
    console.log(name)
    return http.get(`/robsoners/${name}`)
  }
}

export default new RobsonService()
