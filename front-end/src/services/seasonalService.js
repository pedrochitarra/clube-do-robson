import http from '../http-common'

class SeasonalService {
  getAll () {
    return http.get('/seasonals')
  }
}

export default new SeasonalService()
