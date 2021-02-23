import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
// app.get('/', (req, res) => res.render('pages/index'))
import ClubesRoute from './app/routes/clubes.js'
import ClubesPartidasRoute from './app/routes/clubesPartidas.js'
import membrosRoute from './app/routes/membros.js'
import membrosPartidasRoute from './app/routes/membrosPartidas.js'
import partidasRoute from './app/routes/partidas.js'
import robsonersRoute from './app/routes/robsoners.js'
import seasonalsRoute from './app/routes/seasonals.js'
import stadiumsRoute from './app/routes/stadiums.js'

const PORT = process.env.PORT || 5000
const serverPath = path.join('./app/views/')

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}

const app = express()
app.use(allowCrossDomain)
app.use(cors())
app.use(express.static(serverPath))
app.get('/', function (req, res) {
  res.sendFile(serverPath + 'index.html')
})
// app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(ClubesRoute)
app.use(ClubesPartidasRoute)
app.use(membrosRoute)
app.use(membrosPartidasRoute)
app.use(partidasRoute)
app.use(robsonersRoute)
app.use(seasonalsRoute)
app.use(stadiumsRoute)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

export default app
