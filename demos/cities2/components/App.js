import React from 'react'

import Map from './Map'


const optionData = [
  {'state': 'Alabama', 'cities': []},
  {'state': 'Alaska', 'cities': []},
  {'state': 'California', 'cities': [
    'Los Angeles', 'Sacramento', 'San Diego',
    'San Francisco', 'San Jose',
  ]},
  {'state': 'Georgia', 'cities': ['Atlanta']},
  {'state': 'Texas', 'cities': ['Dallas', 'Houston', 'San Antonio']},
]


class App extends React.Component {
  state = {
    place: '',
  }

  handleChange = e => {
    this.setState({ place: e.target.value })
  }

  updatePlace = place => {
    this.setState({ place })
  }

  render() {
    const { place } = this.state

    let options = []
    optionData.forEach(d => {
      options.push(<option key={d.state} value={d.state}>{d.state}</option>)
      d.cities.forEach(city => {
        const display = `${city}, ${d.state}`
        options.push(
          <option key={display} value={display}>&nbsp;&nbsp;&nbsp;{city}</option>
        )
      })
    })

    return (
      <div className='container px2' style={{ maxWidth: 800 }}>
        <h1 className='mb3'>Explore by location and type of crime</h1>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-4 px2'>
            <select
              className='mb1 sm-m0 col-12 field'
              onChange={this.handleChange}
              value={place}
            >
              <option value='' disabled>Select a state or city</option>
              {options}
            </select>
          </div>
          <div className='sm-col sm-col-4 px2'>
            <select className='mb1 sm-m0 col-12 field' defaultValue=''>
              <option value='' disabled>Crime type</option>
              <optgroup label='Violent Crime'>
                <option value='violent-crime'>All Violent Crime</option>
                <option value='homicide'>Homicide</option>
                <option value='rape'>Rape</option>
                <option value='robbery'>Robbery</option>
                <option value='aggravated-assault'>Aggravated Assault</option>
              </optgroup>
              <optgroup label='Property Crime'>
                <option value='property-crime'>All Property Crime</option>
                <option value='arson'>Arson</option>
                <option value='burglary'>Burglary</option>
                <option value='larceny-theft'>Larceny Theft</option>
                <option value='motor-vehicle-theft'>Motor Vehicle Theft</option>
              </optgroup>
            </select>
          </div>
          <div className='sm-col sm-col-4 px2'>
            <button className='mb1 sm-m0 btn btn-primary bg-navy col-12'>View results</button>
          </div>
        </div>
        <Map
          selected={place}
          updatePlace={this.updatePlace}
        />
      </div>
    )
  }
}

export default App
