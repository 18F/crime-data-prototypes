import React from 'react'

import Map from './Map'

class App extends React.Component {
  render() {
    return (
      <div className='container p2' style={{ maxWidth: 900 }}>
        <Map />
      </div>
    )
  }
}

export default App
