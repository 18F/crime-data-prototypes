import React from 'react'

import Chart from './Chart'


class App extends React.Component {
  state = {
    year: 2013,
  }

  updateYear = year => {
    this.setState({ year })
  }

  render() {
    const { year } = this.state

    return (
      <div className='container px2' style={{ maxWidth: 800 }}>
        <h1 className='mb3 border-bottom'>Chicago</h1>
        <Chart
          isMain
          crime='foo'
          year={year}
          updateYear={this.updateYear}
        />
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-6 px2'>
            <Chart
              crime='foo'
              year={year}
              updateYear={this.updateYear}
            />
          </div>
          <div className='sm-col sm-col-6 px2'>
            <Chart
              crime='foo'
              year={year}
              updateYear={this.updateYear}
            />
          </div>
        </div>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-6 px2'>
            <Chart
              crime='foo'
              year={year}
              updateYear={this.updateYear}
            />
          </div>
          <div className='sm-col sm-col-6 px2'>
            <Chart
              crime='foo'
              year={year}
              updateYear={this.updateYear}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
