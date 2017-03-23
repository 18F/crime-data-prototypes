const fs = require('fs')
const path = require('path')

const basicAuth = require('basic-auth-connect')
const cfenv = require('cfenv')
const express = require('express')

const app = express()

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const username = credService.credentials["HTTP_BASIC_USERNAME"]
const password = credService.credentials["HTTP_BASIC_PASSWORD"]

const getDemos = () => {
  const where = path.join(__dirname, 'demos')
  return fs.readdirSync(where)
    .filter(f => fs.statSync(path.join(where, f)).isDirectory())
}

if (process.env.NODE_ENV === 'production') {
  app.use(basicAuth(username, password))
}

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  const demos = getDemos()
  const html = `<h1>FBI Crime Data Explorer prototypes</h1>
  <ul>
    ${demos.map(d => (
      `<li><a href='/demos/${d}/'>${d}</a></li>`
    )).join('')}
  </ul>`
  res.send(html)
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
