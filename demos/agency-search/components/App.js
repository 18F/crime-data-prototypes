import axios from 'axios'
import React from 'react'

import RefineBox from './RefineBox'
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
    isFetching: true,
    refine: false,
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

  refineClick = e => {
    e.preventDefault()
    this.setState({ refine: true })
  }

  removeSelection = () => {
    this.setState({ selected: null, search: '' })
  }

  render() {
    const { data, search, selected, isFetching, refine } = this.state

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
        <div className='sm-col sm-col-3 p3 bg-white'>
          <h3 className='mt0 h2 navy'>Location</h3>
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
          <select className='mt2 mb3 col-12 field bg-navy white'>
            <option>New Jersey</option>
          </select>
          {(showOris && !selected) ? (
            <p className='mb1 h5 italic'>
              There are <strong>{dataFiltered.length}</strong> agencies
              within your search. Select one to view or{' '}
              <a
                className='navy underline'
                href='#!'
                onClick={this.refineClick}
              >
                refine your results
              </a>.
            </p>
          ) : (
            <p className='mb1 h5 italic'>
              Search by law enforcement agency name  or type,
              city, and county.
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
            <div className='relative'>
              <input
                type="text"
                className='m0 col-12 field'
                placeholder='Enter location or zip code'
                value={search}
                onChange={this.handleChange}
              />
              {showOris && (
                <ul
                  className="mb2 absolute h6 list-reset col-12 border-box bg-white border overflow-auto"
                  style={{ maxHeight: 240 }}
                >
                  {dataFiltered.slice(0, 100).map((d, i) => (
                    <li key={i} className="">
                      <a
                        className='btn p0 px1 block regular truncate'
                        href='#!'
                        onClick={this.handleClick(d)}
                      >
                        {d['NAME']}
                      </a>
                    </li>  
                  ))}
                </ul>
              )}
              {refine && <RefineBox />}
            </div>
          )}
          <img className='mt3' src='sidebar-bottom.png' />
        </div>
        <div className='sm-col sm-col-9' style={{ minHeight: 1000 }}>
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
