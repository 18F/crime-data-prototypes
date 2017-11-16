const child_process = require('child_process')
const fs = require('fs')
const path = require('path')

const d3 = require('d3')
const globLib = require('glob')
const http = require('axios')
const unzip = require('unzip')

const exec = cmd => {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else if (stdout) {
        resolve(stdout)
      }
    })
  })
}

const glob = pattern => {
  return new Promise((resolve, reject) => {
    globLib(pattern, (err, files) => {
      if (err) return reject(err)
      return resolve(files)
    })
  })
}

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) return reject(err)
      resolve(path)
    })
  })
}

const s3 =
  'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3'

const createBulkNibrsUrl = (year, state) => {
  const s = state < 10 ? `0${state}` : state
  return `${s3}/${year}/${s.toUpperCase()}-${year}.zip`
}

const states = {
  WV: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
}

const scrapeZips = () => {
  return new Promise((resolve, reject) => {
    const urls = Object.keys(states)
      .map(state => {
        return states[state].map(year => ({
          year,
          state,
          url: createBulkNibrsUrl(year, state),
        }))
      })
      .reduce((accum, next) => {
        return [...accum, ...next]
      }, [])
      .map(u => {
        console.log('get from', u.url)
        return http
          .get(u.url, { responseType: 'arraybuffer' })
          .then(result => {
            const output = path.join(__dirname, `${u.state}-${u.year}.zip`)
            console.log('write to', output)
            fs.writeFileSync(output, result.data)
            return Object.assign({}, u, {
              path: output,
            })
          })
          .then(file => {
            console.log('extracting from', file.path)
            return exec(`unzip ${file.path}`).then(() => {
              console.log('removing', file.path)
              return exec(`rm ${file.path}`)
            })
          })
      })
    Promise.all(urls).then(() => resolve(urls))
  })
}

const combineCsvs = () => {
  return new Promise((resolve, reject) => {
    const csvNames = [
      'arrestee.csv',
      'incident.csv',
      'offender.csv',
      'offense.csv',
      'property.csv',
      'victim.csv',
    ]

    const f = csvNames.map(c => {
      return glob(`**/${c}`)
        .then(files => {
          return Promise.all(files.map(f => readFile(f)))
        })
        .then(csvs => {
          return csvs.map(csv => d3.csvParse(csv))
        })
        .then(csvs => {
          return csvs.reduce((accum, next) => {
            const n = accum.concat(next)
            return n
          }, [])
        })
        .then(csvs => {
          return writeFile(`all-${c}`, d3.csvFormat(csvs))
        })
        .catch(err => {
          reject(err)
        })
    })
    Promise.all(f).then(() => resolve())
  })
}

const go = () => {
  scrapeZips().then(() => combineCsvs())
}

go()
