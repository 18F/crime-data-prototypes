import React from 'react'

import Map from './Map'
import cities from '../data/cities.json'
import states from '../data/states.json'

class App extends React.Component {
  render() {
    return (
      <div className='p3'>
        <Map />
        <h2>states:</h2>
        <pre>{JSON.stringify(states, null, 2)}</pre>
        <h2>cities:</h2>
        <pre>{JSON.stringify(cities, null, 2)}</pre>
      </div>
    )
  }
}

export default App
