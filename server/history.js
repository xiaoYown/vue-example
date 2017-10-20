// var history = require('connect-history-api-fallback')
var path = require('path')

var express = require('express')
var ejs = require('ejs')

var app = express()

app.engine('html', ejs.__express)
app.set('views', './')
app.set('view engine', 'html')

app.use('/static', express.static(path.join(__dirname, './static')))
console.log(path.join(__dirname, './static'))

app.get('/', (req, res) => {
  res.render('index', {})
})

app.get('/:page', (req, res) => {
  res.render(req.params.page, {})
})

app.get('/:page/:params1', (req, res) => {
  res.render(req.params.page, {})
})

app.get('/:page/:params1/:params2', (req, res) => {
  res.render(req.params.page, {})
})

app.listen(3010, () => {
  console.log('-------------------------- history model start --------------------------')
})