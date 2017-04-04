import React from 'react'

import Chart from './Chart'


class App extends React.Component {
  state = {
    year: null,
  }

  handleChange = e => {
    this.setState({ place: e.target.value })
  }

  render() {
    const { year } = this.state

    return (
      <div className='container px2' style={{ maxWidth: 800 }}>
        <h1 className='mb3 border-bottom'>TODO</h1>
        <Chart crime='foo' isMain />
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-6 px2'>
            <Chart crime='foo' />
          </div>
          <div className='sm-col sm-col-6 px2'>
            <Chart crime='foo' />
          </div>
        </div>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-6 px2'>
            <Chart crime='foo' />
          </div>
          <div className='sm-col sm-col-6 px2'>
            <Chart crime='foo' />
          </div>
        </div>
      </div>
    )
  }
}

export default App
