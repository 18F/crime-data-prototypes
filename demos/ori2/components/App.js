import axios from 'axios'
import React from 'react'

import Table from './Table'

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const imgs = {
  trend: 'Trend, no NIBRS',
  table: 'Table, no NIBRS',
  details: 'NIBRS charts',
}

class App extends React.Component {
  state = {
    data: [],
    search: '',
    selected: null,
    isFetching: true
  }

  componentDidMount() {
    axios.get('/data/ori.json')
      .then(response => response.data)
      .then(data => this.setState({
        data: data.filter(d => d['ORI9'].slice(0, 2) === 'OH'),
        isFetching: false
      }))
      .catch(error => console.log(error))
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  handleClick = datum => e => {
    e.preventDefault()
    this.setState({ selected: datum })
  }

  removeSelection = () => {
    this.setState({ selected: null, search: '' })
  }

  render() {
    const { data, search, selected, isFetching } = this.state

    const searchUpper = search.toUpperCase()
    const dataFiltered = data.filter(d => {
      const words = `
        ${d['NAME']} ${d['COUNTYNAME']} ${d['STATENAME']}
        ${d['ADDRESS_ZIP']} ${d['ADDRESS_CITY']}
      `.toUpperCase()

      return words.includes(searchUpper)
    })
    const showOris = searchUpper.length >= 3 && dataFiltered.length > 0
    const showImg = Object.keys(imgs).includes(search)
    const [x, y] = [rand(60, 160), rand(40, 120)]

    return (
      <div className='clearfix'>
        <div className='sm-col sm-col-3 p3'>
          <h3 className='mt0'>Location</h3>
          <div className='relative'>
            <img src='ohio.png' />
            {selected && (
              <img
                className='absolute animated bounce'
                src='pin.svg'
                style={{ left: x, top: y }}
              />
            )}
          </div>
          <select className='mt2 mb3 col-12 field'>
            <option>Ohio</option>
          </select>
          {(showOris && !selected) ? (
            <p className='mb1 h5 italic'>
              There are <strong>{dataFiltered.length}</strong> locations
              within your search. Select one to view.
            </p>
          ) : (
            <p className='mb1 h5 italic'>
              Enter a city, county, or zip code to
              select a location within the state
            </p>
          )}
          {selected ? (
            <div className="flex mb2">
              <input
                type="text"
                className="flex-auto m0 h6 monospace field rounded-left"
                placeholder="Search"
                value={`${selected['ORI9']} ${selected['NAME']}`}
              />

              <button
                className="btn rounded-right border"
                onClick={this.removeSelection}
              >
                ✕
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                className='mb2 col-12 field'
                placeholder='Enter location or zip code'
                value={search}
                onChange={this.handleChange}
              />
              {showOris && (
                <ul
                  className="mb2 relative h6 list-reset bg-white border overflow-auto"
                  style={{ width: 350, maxHeight: 200 }}
                >
                  {dataFiltered.slice(0, 100).map((d, i) => (
                    <li key={i} className="monospace border-bottom">
                      <a
                        className='btn block p1 regular truncate'
                        href='#!'
                        onClick={this.handleClick(d)}
                      >
                        {d['ORI9']}<span className='ml2'>{d['NAME']}</span>
                      </a>
                    </li>  
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className='sm-col sm-col-9' style={{
          backgroundColor: '#f1f4f9',
          minHeight: 1000
        }}>
          {isFetching ? 'ORI data loading...' : null}
          {showImg && (
            <img src={`${imgs[search]}.png`} />
          )}
        </div>
      </div>
    )
  }
}

export default App
