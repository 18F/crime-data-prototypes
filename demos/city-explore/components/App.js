import React from 'react'

import Chart from './Chart'
import dataViolentCrime from '../data/violent-crime.json'
import dataHomicide from '../data/homicide.json'
import dataRape from '../data/rape.json'
import dataRobbery from '../data/robbery.json'
import dataAggAssault from '../data/aggravated-assault.json'


const keys = ['Chicago', 'Illinois', 'United States']

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
      <div className='clearfix'>
        <div className='p3 bg-navy' />
        <div className='sm-col sm-col-3 p3'>
          <img className='mb4' src='side-content.png' />
        </div>
        <div className='sm-col sm-col-9' style={{
          backgroundColor: '#f1f4f9',
          minHeight: 1000
        }}>
          <div className='container px2' style={{ maxWidth: 780 }}>
            <h1 className='mb3 border-bottom navy serif'>Chicago, Illinois</h1>
            <img className='mt2 mb4' src='top-content.png' />
            <Chart
              isMain
              crime='violent crime'
              data={dataViolentCrime}
              keys={keys}
              year={year}
              updateYear={this.updateYear}
              title='Violent Crime in Chicago, Illinois, 2004–2014'
            />
            <div className='clearfix mxn2'>
              <div className='sm-col sm-col-6 px2'>
                <Chart
                  crime='homicide'
                  data={dataHomicide}
                  keys={keys}
                  year={year}
                  updateYear={this.updateYear}
                  title={`Homicide, ${year}`}
                />
              </div>
              <div className='sm-col sm-col-6 px2'>
                <Chart
                  crime='rape'
                  data={dataRape}
                  keys={keys}
                  year={year}
                  updateYear={this.updateYear}
                  title={`Rape, ${year}`}
                />
              </div>
            </div>
            <div className='clearfix mxn2'>
              <div className='sm-col sm-col-6 px2'>
                <Chart
                  crime='robbery'
                  data={dataRobbery}
                  keys={keys}
                  year={year}
                  updateYear={this.updateYear}
                  title={`Robbery, ${year}`}
                />
              </div>
              <div className='sm-col sm-col-6 px2'>
                <Chart
                  crime='aggravated assault'
                  data={dataAggAssault}
                  keys={keys}
                  year={year}
                  updateYear={this.updateYear}
                  title={`Aggravated Assault, ${year}`}
                />
              </div>
            </div>
            <hr />
            <img className='mt3 mb4' src='bottom-content.png' />
          </div>
        </div>
      </div>
    )
  }
}

export default App
