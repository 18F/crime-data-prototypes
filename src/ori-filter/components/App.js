import React from 'react'

class App extends React.Component {
  state = {
    entries: [1, 2, 3],
  }

  render() {
    const { entries } = this.state

    return (
      <div>
        <nav className="py2 bg-blue white">
          <div className="container">
            <h2 className="m0 h5 caps">scratchpad</h2>
          </div>
        </nav>
        <div className='p2 container'>
          <h1>hello, world</h1>
          <p>{JSON.stringify(entries)}</p>
        </div>
      </div>
    )
  }
}

export default App
