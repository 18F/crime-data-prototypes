import axios from 'axios'
import React from 'react'

import RefineBox from './RefineBox'

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

    const tags = [agency_name, agency_type, city_name, county_name]
      .filter(t => t.length)
      .map(t => `+${t}`)
      .join(' ')

    return (
      <div>
        <div className='p2 bg-navy' />
        <div className='flex'>
          <div
            className='flex-none bg-white border-box'
            style={{ width: 320, padding: 48 }}
          >
            <h3 className='mt1 h2 navy' style={{ fontSize: 22 }}>Location</h3>
            <div className='relative'>
              <img src='new-jersey.png' />
              {selected && (
                <img
                  className='absolute'
                  src='pin.svg'
                  style={{ left: 115, top: 25 }}
                />
              )}
            </div>
            <select className='mt2 mb2 col-12 field bg-navy white'>
              <option>New Jersey</option>
            </select>
            {(hasSearch && !selected) ? (
              <p className='mt1 mb2 fs-12 serif italic'>
                Your search returned <strong>{dataFiltered.length}</strong>{' '}
                {dataFiltered.length === 1 ? 'agency' : 'agencies'}.
                Select one or{' '}
                <a
                  className='navy bold underline'
                  href='#!'
                  onClick={this.refineToggle}
                >
                  refine your results
                </a>.
              </p>
            ) : (
              <p className='mt1 mb2 fs-12 serif italic'>
                Search by agency name, city, county, or type of law enforcement agency.
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
                  {!refine && (
                    <button
                      className="btn rounded-right border"
                      style={{ borderLeft: 0 }}
                      onClick={this.refineToggle}
                    >
                      <img src='chevron.png' width='13' />
                    </button>
                  )}
                </div>
                {hasRefinement && (
                  <div
                    className='mtn1 absolute h6 bg-white muted rounded'
                    style={{ top: 11, left: 70, padding: '2px 4px', lineHeight: '1' }}
                  >
                    {tags}
                  </div>
                )}
                {showOris && (
                  <ul
                    className="mtn1 mb2 absolute h5 list-reset col-12 border-box bg-white border rounded overflow-auto"
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
                    onClose={this.refineToggle}
                  />
                )}
              </div>
            )}
            <img src='sidebar-bottom.png' style={{ marginTop: 48 }} />
          </div>
          <div className='flex-auto mt1 px4 py3' style={{ minHeight: 1000 }}>
            {showImg && (
              <img src={`${imgs[search]}.png`} />
            )}
            {selected && <img src='content.png' />}
          </div>
        </div>
      </div>
    )
  }
}

export default App
