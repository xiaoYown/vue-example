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

app.engine('html', ejs.__express)
app.set('views', './')
app.set('view engine', 'html')

app.use('/static', express.static(path.join(__dirname, './static')))
console.log(path.join(__dirname, './static'))

app.get('/', (req, res) => {
  res.render('index', {})
})

app.get('/:page', (req, res) => {
  findFile(path.join(__dirname, './' + req.params.page + '.html'), () => {
    res.render(req.params.page, {})
  }, () => {
    res.render('index', {})
  })
})

app.get('/:page/:params1', (req, res) => {
  findFile(path.join(__dirname, './' + req.params.page + '.html'), () => {
    res.render(req.params.page, {})
  }, () => {
    res.render('index', {})
  })
})

app.get('/:page/:params1/:params2', (req, res) => {
  findFile(path.join(__dirname, './' + req.params.page + '.html'), () => {
    res.render(req.params.page, {})
  }, () => {
    res.render('index', {})
  })
})

app.listen(3010, () => {
  console.log('-------------------------- history model start --------------------------')
})