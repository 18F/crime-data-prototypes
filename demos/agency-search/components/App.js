import axios from 'axios'
import React from 'react'

import RefineBox from './RefineBox'
import Table from './Table'

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const matches = (a, b) => a.toUpperCase().includes(b.toUpperCase())

const imgs = {
  trend: 'Trend, no NIBRS',
  table: 'Table, no NIBRS',
  details: 'NIBRS charts',
}

const refinements = {
  agency_name: '',
  agency_type: '',
  city_name: '',
  county_name: '',
}

class App extends React.Component {
  state = {
    data: [],
    search: '',
    selected: null,
    isFetching: true,
    refine: false,
    ...refinements
  }

  componentDidMount() {
    axios.get('data/agencies.json')
      .then(response => response.data)
      .then(data => this.setState({
        data,
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

  refineToggle = e => {
    e.preventDefault()
    this.setState(prevState => ({ refine: !prevState.refine }))
  }

  refineSubmit = () => {
    this.setState({ refine: false })
  }

  refineClear = () => {
    this.setState({ ...refinements })
  }

  refineInputHandler = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  removeSelection = () => {
    this.setState({ selected: null, search: '', ...refinements })
  }

  render() {
    const {
      data, search, selected, isFetching, refine,
      agency_name, agency_type, city_name, county_name,
    } = this.state

    const showImg = Object.keys(imgs).includes(search)
    const [x, y] = [rand(60, 160), rand(40, 120)]
    const hasRefinement = agency_name || agency_type || city_name || county_name

    const searchUpper = search.toUpperCase()
    let dataFiltered = data.filter(d => {
      const words = `
        ${d['agency_name']} ${d['agency_type']}
        ${d['city_name']} ${d['county_name']}
      `.toUpperCase()

      return words.includes(searchUpper)
    })

    // TODO: refactor this gross bit
    if (hasRefinement) {
      dataFiltered = dataFiltered.filter(d => (
        (!agency_name || (
          matches(d.agency_name, agency_name) || matches(d.ori, agency_name)
        )) &&
        matches(d.agency_type, agency_type) &&
        matches(d.city_name, city_name) &&
        matches(d.county_name, county_name)
      ))
    }

    const hasSearch = searchUpper.length || hasRefinement
    const showOris = hasSearch && dataFiltered.length > 0

    return (
      <div className='clearfix'>
        <div className='sm-col sm-col-3 p3 bg-white'>
          <h3 className='mt0 h2 navy'>Location</h3>
          <div className='relative'>
            <img src='new-jersey.png' />
            {selected && (
              <img
                className='absolute'
                src='pin.svg'
                style={{ left: x, top: y }}
              />
            )}
          </div>
          <select className='mt2 mb3 col-12 field bg-navy white'>
            <option>New Jersey</option>
          </select>
          {(hasSearch && !selected) ? (
            <p className='mb1 fs-13 italic'>
              There are <strong>{dataFiltered.length}</strong> agencies
              within your search. Select one to view or{' '}
              <a
                className='navy underline'
                href='#!'
                onClick={this.refineToggle}
              >
                refine your results
              </a>.
            </p>
          ) : (
            <p className='mb1 fs-13 italic'>
              Search by law enforcement agency name  or type,
              city, and county.
            </p>
          )}
          {selected ? (
            <div className="flex mb2">
              <input
                type="text"
                className="flex-auto m0 h5 field rounded-left"
                placeholder="Search"
                defaultValue={selected['agency_name']}
              />

              <button
                className="btn rounded-right border"
                style={{ borderLeft: 0 }}
                onClick={this.removeSelection}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className='relative'>
              <div className="flex">
                <input
                  type="text"
                  className="flex-auto m0 h5 field rounded-left"
                  placeholder='Search'
                  value={search}
                  onChange={this.handleChange}
                />
                <button
                  className="btn rounded-right border"
                  style={{ borderLeft: 0 }}
                  onClick={this.refineToggle}
                >
                  <img src='chevron.png' width='13' />
                </button>
              </div>
              {showOris && (
                <ul
                  className="mt05 mb2 absolute h5 list-reset col-12 border-box bg-white border rounded overflow-auto"
                  style={{ maxHeight: 240 }}
                >
                  {dataFiltered.slice(0, 100).map((d, i) => (
                    <li key={i} className="">
                      <a
                        className='px1 block black truncate'
                        style={{ lineHeight: '1.75' }}
                        href='#!'
                        onClick={this.handleClick(d)}
                      >
                        {d['agency_name']}
                      </a>
                    </li>  
                  ))}
                </ul>
              )}
              {refine && (
                <RefineBox
                  agency_name={agency_name}
                  agency_type={agency_type}
                  city_name={city_name}
                  county_name={county_name}
                  onClear={this.refineClear}
                  onChange={this.refineInputHandler}
                  onSubmit={this.refineSubmit}
                />
              )}
            </div>
          )}
          <img className='mt3' src='sidebar-bottom.png' />
        </div>
        <div className='sm-col sm-col-9' style={{ minHeight: 1000 }}>
          {showImg && (
            <img src={`${imgs[search]}.png`} />
          )}
        </div>
      </div>
    )
  }
}

export default App
