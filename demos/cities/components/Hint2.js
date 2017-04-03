import React from 'react'

const Hint = ({ value, position }) => {
  const width = 180
  const style = {
    left: position.x - (width / 2),
    top: position.y + 20,
    width,
  }

  return (
    <div
      className='
        inline-block absolute border-box bg-navy white
        p2 h6 line-height-3 rounded'
      style={style}
    >
      <div className='mb2 h4'>{value}</div>
      <div
        className='mb1 fs-10 border-bottom border-white'
        style={{ paddingBottom: 4 }}
      >
        2014 RATES
      </div>
      <div className='m0'>
        <div>Violent Crime <strong>891</strong></div>
        <div>Property Crime <strong>2,225</strong></div>
      </div>
    </div>
  )
}

export default Hint
