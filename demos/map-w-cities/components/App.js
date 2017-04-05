import React from 'react'

import Map from './Map'

import data from '../data/participation.json'


const slugify = str => str.toLowerCase().replace(/\s+/g, '-')
const lookup = state => data[slugify(state)]
const stateNames = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho",
  "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
  "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
]
const cityNames = [
  "Atlanta, Georgia","Boston, Massachusetts","Buffalo, New York","Chicago, Illinois",
  "Cincinnati, Ohio","Cleveland, Ohio","Dallas, Texas","Denver, Colorado",
  "Detroit, Michigan","Houston, Texas","Las Vegas, Nevada","Los Angeles, California",
  "Memphis, Tennessee","Miami, Florida","Milwaukee, Wisconsin","Minneapolis, Minnesota",
  "New York, New York","Norfolk, Virginia","Philadelphia, Pennsylvania",
  "Phoenix, Arizona","Pittsburgh, Pennsylvania","Portland, Oregon",
  "Raleigh, North Carolina","Sacramento, California","San Antonio, Texas",
  "San Diego, California","San Francisco, California","San Jose, California",
  "Seattle, Washington","St. Louis, Missouri","Tampa, Florida",
  "Washington, D.C., District of Columbia"
]


class App extends React.Component {
  state = { crime: '', place: '' }

  updatePlace = place => {
    this.setState({ place })
  }

  updateCrime = crime => {
    this.setState({ crime })
  }

  render() {
    const { crime, place } = this.state

    return (
      <div className='container px2' style={{ maxWidth: 800, minHeight: 1000 }}>
        <h1 className='mb3'>Explore by location and type of crime</h1>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-4 px2'>
            <select
              className='mb1 sm-m0 col-12 field'
              onChange={e => this.updatePlace(e.target.value)}
              value={place}
            >
              <option value='' disabled>Select a state or city</option>
              <optgroup label='States'>
                {stateNames.map(s => <option key={s}>{s}</option>)}
              </optgroup>
              <optgroup label='Cities'>
                {cityNames.map(c => <option key={c}>{c}</option>)}
              </optgroup>
            </select>
          </div>
          <div className='sm-col sm-col-4 px2'>
            <select
              className='mb1 sm-m0 col-12 field'
              onChange={e => this.updateCrime(e.target.value)}
              value={crime}
            >
              <option value='' disabled>Select a crime type</option>
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
            <button
              className='mb1 sm-m0 btn btn-primary bg-navy col-12'
              disabled={place === '' || crime === ''}
            >
              View results
            </button>
          </div>
        </div>
        <Map
          selected={place}
          updatePlace={this.updatePlace}
        />
        <div className='clearfix'>
          <img className='right' width='95' src='legend.png' style={{ marginTop: -60 }} />
        </div>
      </div>
    )
  }
}

export default App
