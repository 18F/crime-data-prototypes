import React from 'react'

import cities from '../data/cities.json'
import states from '../data/states.json'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null }
  }

  rememberValue = id => e => {
    this.setState({
      hover: { value: id, position: { x: e.pageX, y: e.pageY } },
    })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    return (
      <div>
        <svg
          viewBox='0 0 959 593'
          preserveAspectRatio='xMidYMid'
        >
          <title>USA</title>
          <g>
            {states.map(s => (
              <path
                key={s.id}
                id={s.id}
                d={s.d}
                pointerEvents='all'
                onMouseOver={this.rememberValue(s.name)}
                onMouseMove={this.rememberValue(s.name)}
                onMouseOut={this.forgetValue}
              />
            ))}
          </g>
        </svg>
      </div>
    )
  }
}

export default Map
