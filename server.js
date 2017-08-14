const fs = require('fs')
const path = require('path')

const cfenv = require('cfenv')
const express = require('express')
const gzipStatic = require('connect-gzip-static')

const app = express()

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || {
  credentials: {},
}

app.use(gzipStatic(__dirname))

const getDemos = () => {
  const where = path.join(__dirname, 'demos')
  return fs
    .readdirSync(where)
    .filter(f => fs.statSync(path.join(where, f)).isDirectory())
}

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <style>
    body{margin:0;padding:32px;font-family:courier,monospace;line-height:1.5;}
    h1{font-size:20px;}
    </style>
    <h1>FBI Crime Data Explorer prototypes</h1>
    ${getDemos()
      .map(d => `<div><a href='/demos/${d}/'>${d}</a></div>`)
      .join('')}
  `
  res.send(html)
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
