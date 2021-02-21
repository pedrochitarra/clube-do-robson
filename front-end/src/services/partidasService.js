import http from '../http-common'

class PartidasService {
  getAll (clubId) {
    return http.get(`/partidas/${clubId}`)
  }

  getOne (partidaId) {
    return http.get(`/partidas/${partidaId}/`)
  }

  getSeasons (clubId) {
    return http.get(`/partidas/seasons/${clubId}`)
  }
}

export default new PartidasService()
