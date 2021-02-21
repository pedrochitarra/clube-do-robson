import http from '../http-common'

class MembrosService {
  getAll (clubId) {
    return http.get(`/membros/${clubId}`)
  }

  get (id, clubId) {
    return http.get(`/membros/${clubId}/${id}`)
  }
}

export default new MembrosService()
