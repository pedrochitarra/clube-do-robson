import http from '../http-common'

class ClubesPartidasService {
  getAll (clubId) {
    return http.get(`/clubesPartidas/${clubId}`)
  }

  get (id, partidaId) {
    return http.get(`/clubesPartidas/${partidaId}/${id}`)
  }

  getBySeason (clubId, seasonId) {
    return http.get(`/clubesPartidas/${clubId}/${seasonId}`)
  }

  getSeasons (clubId) {
    return http.get(`/clubesPartidas/seasons/${clubId}`)
  }
}

export default new ClubesPartidasService()
