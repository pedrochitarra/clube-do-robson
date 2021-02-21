import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
const PORT = process.env.PORT || 5000
const serverPath = path.join(__dirname, '/app/views/')

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
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
// app.get('/', (req, res) => res.render('pages/index'))
require('./app/routes/clubes')(app)
require('./app/routes/clubesPartidas')(app)
require('./app/routes/membros')(app)
require('./app/routes/membrosPartidas')(app)
require('./app/routes/partidas')(app)
require('./app/routes/robsoners')(app)
require('./app/routes/seasonals')(app)
require('./app/routes/stadiums')(app)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
