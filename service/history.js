// var history = require('connect-history-api-fallback')
var path = require('path')
const fs = require('fs')

var express = require('express')
var ejs = require('ejs')

var app = express()

function findFile (fileName, found, notFound) {
  fs.exists(fileName, (exists) => {
    if (exists) {
      found()
    } else {
      notFound()
    }
  });
}

const VIEWS_PATH = './front/';

app.engine('html', ejs.__express)
app.set('views', VIEWS_PATH)
app.set('view engine', 'html')

app.use('/static', express.static(path.join(__dirname, './front/static')))

app.get('/', (req, res) => {
  res.render('index', {})
})

app.get('/vue/:page', (req, res) => {
  console.log(path.join(__dirname, VIEWS_PATH + req.params.page + '.html'))
  findFile(path.join(__dirname, VIEWS_PATH + req.params.page + '.html'), () => {
    res.render(req.params.page, {})
  }, () => {
    res.render('index', {})
  })
})

app.get('/vue/:page/:params1', (req, res) => {
  findFile(path.join(__dirname, VIEWS_PATH + req.params.page + '.html'), () => {
    res.render(req.params.page, {})
  }, () => {
    res.render('index', {})
  })
})

app.get('/vue/:page/:params1/:params2', (req, res) => {
  findFile(path.join(__dirname, VIEWS_PATH + req.params.page + '.html'), () => {
    res.render(req.params.page, {})
  }, () => {
    res.render('index', {})
  })
})

app.listen(3010, () => {
  console.log('-------------------------- history model start --------------------------')
  console.log('open: http://127.0.0.1:3010/vue/home')
})