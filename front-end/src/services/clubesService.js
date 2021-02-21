import http from '../http-common'

class ClubesService {
  get (id) {
    return http.get(`/clubes/${id}`)
  }
}

export default new ClubesService()
