import React from 'react'

import Map from './Map'

class App extends React.Component {
  render() {
    return (
      <div className='container p2' style={{ maxWidth: 900 }}>
        <h1 className='mb3'>Explore by location and type of crime</h1>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-4 px2'>
            <select className='mb1 sm-m0 col-12 field' defaultValue=''>
              <option value='' disabled>Location</option>
              <optgroup label='States'>
                <option>Alaska</option>
                <option>Alabama</option>
                <option>Arkansas</option>
              </optgroup>
              <optgroup label='Cities'>
                <option>Atlanta, Georgia</option>
                <option>Boston, Massachusetts</option>
                <option>Chicago, Illinois</option>
                <option>Cincinnati, Ohio</option>
              </optgroup>
            </select>
          </div>
          <div className='sm-col sm-col-4 px2'>
            <select className='mb1 sm-m0 col-12 field' defaultValue=''>
              <option value='' disabled>Crime Type</option>
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
            <button className='mb1 sm-m0 btn btn-primary bg-navy col-12'>Submit</button>
          </div>
        </div>
        <Map />
      </div>
    )
  }
}

export default App
