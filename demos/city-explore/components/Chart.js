import { bisector, extent, max, min } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

import ChartDetails from './ChartDetails'
import XAxis from './XAxis'
import YAxis from './YAxis'


const slugify = str => str.toLowerCase().replace(/\s+/g, '-')

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { svgParentWidth: null }
  }

  componentDidMount() {
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions)
  }

  getDimensions = () => {
    if (this.svgParent) {
      this.setState({ svgParentWidth: this.svgParent.clientWidth })
    }
  }

  rememberValue = (data, x, width) => e => {
    // get mouse x position, relative to container
    const node = e.target
    const rect = node.getBoundingClientRect()
    const xRel = e.clientX - rect.left - node.clientLeft
    const hover = { x: xRel / rect.width }

    const bisectDate = bisector(d => d.date).left
    const x0 = x.invert(hover.x * width)
    const i = bisectDate(data, x0, 1)
    const [d0, d1] = [data[i - 1], data[i]]

    if (d0 && d1) {
      const active = (x0 - d0.date > d1.date - x0) ? d1 : d0
      this.props.updateYear(active.year)
    }
  }

  render() {
    const { colors, size, isMain, crime, data, keys, year, updateYear, title } = this.props
    const { hover, svgParentWidth } = this.state

    const color = scaleOrdinal(colors)
    const parse = timeParse('%Y')

    const keysWithSlugs = keys.map(name => ({ name, slug: slugify(name) }))

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

    let active = dataClean.find(d => d.year === year)
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
      <div className={`mb3 sm-p4 bg-white ${isMain ? 'p3' : 'p2'}`}>
        <h3 className={`mt0 mb3 ${isMain ? 'h2' : 'h3'}`}>{title}</h3>
        <ChartDetails
          colors={colors}
          crime={crime}
          data={active}
          keys={keysWithSlugs}
          isMain={isMain}
          updateYear={updateYear}
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
                onMouseMove={this.rememberValue(dataClean, x, width)}
              />
            </g>
          </svg>
        </div>
        <div className='mt1 mb2 fs-10 monospace center'>
          <div className='bold monospace'>Rate per 100,000 people</div>
        </div>
        <button className="btn p0 fs-12 navy nowrap">
          <img
            className="mr1"
            style={{ verticalAlign: 'text-bottom' }}
            width="15"
            height="14"
            src="download.svg"
            alt="download"
          />
          Download data
        </button>
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
