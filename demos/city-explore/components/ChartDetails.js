import { format } from 'd3-format'
import React from 'react'


const formatRate = format('.1f')
const formatTotal = format(',.0f')

const getComparison = ({ place, data }) => {
  const placeRate = data[place].rate
  const nationalRate = data['united-states'].rate
  const difference = (placeRate - nationalRate)

  if (Math.abs(difference) < 2) return 'about the same as'
  else if (difference > 2) return 'higher than'
  return 'lower than'
}

const ChartDetails = ({ colors, crime, data, keys, isMain, updateYear }) => {
  const { name, slug } = keys[0]
  const comparison = getComparison({ place: slug, data })
  const rate = data[slug].rate
  const year = data.date.getFullYear()
  const highlight = v => <span className='bold navy'>{v}</span>

  return (
    <div className='mb2 lg-flex'>
      {isMain && (
        <div className='flex-auto'>
          <p className='mt1 mb3' style={{ paddingRight: 24 }}>
            Chicago's {crime} rate was lower than that of the United States, and
            in {highlight(year)} was {highlight(formatRate(rate))} incidents
            per 100,000 people.
          </p>
          <select
            className='mb3 field bg-navy white'
            style={{ minWidth: 160 }}
            onChange={e => updateYear(Number(e.target.value))}
            value={year}
          >
            <option>2004</option>
            <option>2005</option>
            <option>2006</option>
            <option>2007</option>
            <option>2008</option>
            <option>2009</option>
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
          </select>
        </div>
      )}
      <div>
        <table
          className={`mb1 lg-m0 ${isMain ? 'px1 py2 bg-light-blue' : ''}`}
          style={{ maxWidth: 300 }}
        >
          <thead className='fs-12 line-height-3'>
            <tr><td /><td>Rate</td><td>Total</td></tr>
          </thead>
          <tbody className='fs-14 bold'>
            {keys.map((k, i) => (
              <tr key={i}>
                <td className='pr2 sm-pr3 fs-12 nowrap align-bottom'>
                  <span
                    className='mr1 inline-block circle'
                    style={{ width: 8, height: 8, backgroundColor: colors[i] || '#000' }}
                  />
                  {k.name}
                </td>
                <td className='pt1 pr2 sm-pr3 line-height-4 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatRate(data[k.slug].rate)}
                  </span>
                </td>
                <td className='pt1 line-height-4 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatTotal(data[k.slug].count)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ChartDetails
