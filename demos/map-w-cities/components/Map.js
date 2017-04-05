import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import React from 'react'
import { feature, mesh } from 'topojson'

import Hint from './Hint2'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null, usa: null }
  }

  componentDidMount() {
    axios.get('data/usa.json')
      .then(response => { this.setState({ usa: response.data }) })
  }

  rememberValue = name => e => {
    this.setState({
      hover: { value: name, position: { x: e.pageX, y: e.pageY } },
    })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  clickHandler = name => e => {
    this.props.updatePlace(name)
  }

  render() {
    const { selected } = this.props
    const { hover, usa } = this.state

    if (!usa) return null

    const [w, h] = [400, 300]
    const projection = geoAlbersUsa().scale(500).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    const meshed = mesh(usa, usa.objects.states, (a, b) => (a !== b))

    const geoStates = feature(usa, usa.objects.states).features
    const geoCities = feature(usa, usa.objects.places).features
    const citiesFiltered = geoCities.filter(c => c.properties.pop > 1000000)

    window.cities = citiesFiltered
    window.states = geoStates

    return (
      <div className='md-col-11 mx-auto'>
        <svg
          className='pointer'
          preserveAspectRatio='xMidYMid'
          viewBox={`0 0 ${w} ${h}`}
        >
          <g>
            <g className='states'>
              {geoStates.map((d, i) => (
                <path
                  key={i}
                  className='state'
                  d={path(d)}
                  fill={d.properties.name === selected ? '#ff5e50' : '#95aabc'}
                  pointerEvents='all'
                  onClick={this.clickHandler(d.properties.name)}
                  onMouseOver={this.rememberValue(d.properties.name)}
                  onMouseMove={this.rememberValue(d.properties.name)}
                  onMouseOut={this.forgetValue}
                />
              ))}
              <path
                d={path(meshed)}
                fill='none'
                stroke='#fff'
                strokeWidth='.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
            <g className='cities'>
              {citiesFiltered.map((d, i) => {
                const name = `${d.properties.name}, ${d.properties.state}`
                return (
                  <circle
                    key={i}
                    transform={`translate(${projection(d.geometry.coordinates)})`}
                    r={name === selected ? 5 : 2.5}
                    fill={name === selected ? '#ff5e50' : '#284152'}
                    stroke='#fff'
                    strokeWidth='.5'
                    pointerEvents='all'
                    onClick={this.clickHandler(name)}
                    onMouseOver={this.rememberValue(name)}
                    onMouseOut={this.forgetValue}
                  />
                )
              })}
            </g>
          </g>
        </svg>
        {hover ? <Hint {...hover} /> : null}
      </div>
    )
  }
}

export default Map
