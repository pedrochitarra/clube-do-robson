import http from '../http-common'

class StadiumService {
  getAll () {
    return http.get('/stadiums')
  }

  get (name) {
    console.log(name)
    return http.get(`/stadiums/${name}`)
  }
}

export default new StadiumService()
