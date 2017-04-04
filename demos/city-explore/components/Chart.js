import { bisector, extent, max, min } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

import ChartDetails from './ChartDetails'
import XAxis from './XAxis'
import YAxis from './YAxis'


const data = [
  {
    "date": 2004,
    "illinois": {
      "count": 488,
      "pop": 12779604,
      "rate": 3.8185846760196953
    },
    "united-states": {
      "count": 11647,
      "pop": 298658646,
      "rate": 3.8997699065440754
    }
  },
  {
    "date": 2005,
    "illinois": {
      "count": 492,
      "pop": 12826171,
      "rate": 3.835907068446226
    },
    "united-states": {
      "count": 12109,
      "pop": 301501908,
      "rate": 4.016226656847558
    }
  },
  {
    "date": 2006,
    "illinois": {
      "count": 551,
      "pop": 12903652,
      "rate": 4.270108958301107
    },
    "united-states": {
      "count": 12543,
      "pop": 304525592,
      "rate": 4.118865648572485
    }
  },
  {
    "date": 2007,
    "illinois": {
      "count": 576,
      "pop": 12923835,
      "rate": 4.456881413295666
    },
    "united-states": {
      "count": 12391,
      "pop": 306757776,
      "rate": 4.039343406897043
    }
  },
  {
    "date": 2008,
    "illinois": {
      "count": 584,
      "pop": 12973710,
      "rate": 4.501410930258191
    },
    "united-states": {
      "count": 11910,
      "pop": 309327055,
      "rate": 3.8502936640960814
    }
  },
  {
    "date": 2009,
    "illinois": {
      "count": 541,
      "pop": 12965589,
      "rate": 4.172583289505783
    },
    "united-states": {
      "count": 10783,
      "pop": 312367926,
      "rate": 3.4520189502426697
    }
  },
  {
    "date": 2010,
    "illinois": {
      "count": 524,
      "pop": 12888247,
      "rate": 4.065719721231289
    },
    "united-states": {
      "count": 10373,
      "pop": 314170775,
      "rate": 3.301707486955144
    }
  },
  {
    "date": 2011,
    "illinois": {
      "count": 570,
      "pop": 12923112,
      "rate": 4.410702313808005
    },
    "united-states": {
      "count": 10252,
      "pop": 317186963,
      "rate": 3.232163107536043
    }
  },
  {
    "date": 2012,
    "illinois": {
      "count": 590,
      "pop": 12934012,
      "rate": 4.561616302814625
    },
    "united-states": {
      "count": 10520,
      "pop": 319697368,
      "rate": 3.2906120140469843
    }
  },
  {
    "date": 2013,
    "illinois": {
      "count": 516,
      "pop": 12938533,
      "rate": 3.9880873666280405
    },
    "united-states": {
      "count": 9895,
      "pop": 321812692,
      "rate": 3.0747699658781635
    }
  },
  {
    "date": 2014,
    "illinois": {
      "count": 492,
      "pop": 12938060,
      "rate": 3.8027339492937893
    },
    "united-states": {
      "count": 9873,
      "pop": 324698721,
      "rate": 3.040664887620546
    }
  }
]

const keysWithSlugs = [
  {
    "name": "Illinois",
    "slug": "illinois"
  },
  {
    "name": "United States",
    "slug": "united-states"
  }
]


class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null, svgParentWidth: null }
    this.getDimensions = ::this.getDimensions
    this.forgetValue = ::this.forgetValue
    this.rememberValue = ::this.rememberValue
  }

  componentDidMount() {
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions)
  }

  getDimensions() {
    if (this.svgParent) {
      this.setState({ svgParentWidth: this.svgParent.clientWidth })
    }
  }

  forgetValue() {
    this.setState({ hover: null })
  }

  rememberValue(e) {
    // get mouse x position, relative to container
    const node = e.target
    const rect = node.getBoundingClientRect()
    const xRel = e.clientX - rect.left - node.clientLeft

    this.setState({ hover: { x: xRel / rect.width } })
  }

  render() {
    const { crime, colors, size, isMain } = this.props
    const { hover, svgParentWidth } = this.state

    const color = scaleOrdinal(colors)
    const parse = timeParse('%Y')

    const dataClean = data.map(d => (
      Object.assign(
        { year: +d.date, date: parse(d.date) },
        ...keysWithSlugs.map(k => ({ [k.slug]: d[k.slug] })),
      )
    ))

    const dataByKey = keysWithSlugs.map(k => {
      const segments = [[]]
      const values = dataClean.map(d => ({
        year: d.year,
        date: d.date,
        value: d[k.slug],
      }))

      values.forEach(d => {
        if (d.value.count !== 0) {
          segments[segments.length - 1].push(d)
        } else {
          segments.push([])
        }
      })

      return { id: k.slug, name: k.name, values, segments }
    })

    const maxValue = max(dataByKey, d => max(d.values, v => v.value.rate))

    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 2.25
    const margin = { ...size.margin, left: maxValue > 1000 ? 48 : 36 }
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const xPadding = svgWidth < 500 ? 20 : 40

    const x = scaleTime()
        .domain(extent(dataClean, d => d.date))
        .range([0 + xPadding, width - xPadding])

    const y = scaleLinear()
        .domain([0, maxValue])
        .range([height, 0])
        .nice()

    const l = line()
        .x(d => x(d.date))
        .y(d => y(d.value.rate))

    let active = dataClean[dataClean.length - 1]
    if (hover) {
      const bisectDate = bisector(d => d.date).left
      const x0 = x.invert(hover.x * width)
      const i = bisectDate(dataClean, x0, 1)
      const [d0, d1] = [dataClean[i - 1], dataClean[i]]

      if (d0 && d1) {
        active = (x0 - d0.date > d1.date - x0) ? d1 : d0
      }
    }

    const callout = (
      <g transform={`translate(${x(active.date)}, 0)`}>
        <line y2={height} stroke='#95aabc' strokeWidth='1' />
        {keysWithSlugs.map((k, j) => (
          <circle
            key={j}
            cx='0'
            cy={y(active[k.slug].rate)}
            fill={color(k.slug)}
            r={active[k.slug].count ? '4' : '0'}
          />
        ))}
      </g>
    )

    return (
      <div className='px2 py3 sm-p4 bg-white'>
        <ChartDetails
          colors={colors}
          crime={crime}
          data={active}
          keys={keysWithSlugs}
          isMain={isMain}
        />
        <div
          className='col-12'
          ref={ref => this.svgParent = ref}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            style={{ maxWidth: '100%' }}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <XAxis scale={x} height={height} tickCt={svgWidth < 500 ? 4 : 8} />
              <YAxis scale={y} width={width} />
              {dataByKey.map((d, i) => (
                <g key={i} className={`series series-${d.id}`}>
                  {d.segments.map((s, j) => (
                    <path
                      key={j}
                      d={l(s)}
                      fill='none'
                      stroke={color(d.id)}
                      strokeWidth='2'
                    />
                  ))}
                </g>
              ))}
              {callout}
              <rect
                width={width}
                height={height}
                fill='none'
                pointerEvents='all'
                onMouseMove={this.rememberValue}
                onMouseOut={this.forgetValue}
              />
            </g>
          </svg>
        </div>
        <div className='my1 fs-10 sm-fs-12 monospace center'>
          <div className='bold'>TODO rate per 100,000 people</div>
          <div className='italic'>(Does not include estimates)</div>
        </div>
      </div>
    )
  }
}

Chart.defaultProps = {
  size: {
    width: 735,
    margin: { top: 16, right: 0, bottom: 24, left: 36 },
  },
  colors: ['#ff5e50', '#52687d', '#97a7b8'],
}

export default Chart