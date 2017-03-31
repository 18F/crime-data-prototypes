import React from 'react'

import states from '../data/states.json'
import cities from '../data/cities.json'

class App extends React.Component {
  render() {
    return (
      <div className='p3'>
        <h2>states:</h2>
        <pre>{JSON.stringify(states, null, 2)}</pre>
        <h2>cities:</h2>
        <pre>{JSON.stringify(cities, null, 2)}</pre>
      </div>
    )
  }
}

export default App
