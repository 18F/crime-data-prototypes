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


const ChartDetails = ({ colors, crime, data, keys, isMain }) => {
  const { name, slug } = keys[0]
  const comparison = getComparison({ place: slug, data })
  const rate = data[slug].rate
  const year = data.date.getFullYear()
  const highlight = v => <span className='bold blue'>{v}</span>

  return (
    <div className='mb2 lg-flex'>
      {isMain && (
        <div className='flex-auto'>
          <h4 className='mt0 mb1 fs-18 sans-serif'>{year}</h4>
          <p className='mb1 lg-m0 lg-pr4 lg-mh-72p fs-14 sm-fs-16'>
            TODO...
          </p>
        </div>
      )}
      <div>
        <table className='mb1 lg-m0' style={{ maxWidth: 300 }}>
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
