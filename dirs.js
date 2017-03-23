const fs = require('fs')
const path = require('path')

function getDirectories (where) {
  return fs.readdirSync(where)
    .filter(file => fs.statSync(path.join(where, file)).isDirectory())
}

const dirs = getDirectories(path.join(__dirname, 'demos'))
console.log('dirs', dirs)
