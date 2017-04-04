import React from 'react'

const Hint = ({ value, position }) => {
  const width = 120
  const style = {
    left: position.x - (width / 2),
    top: position.y + 20,
    width,
  }

  return (
    <div
      className='
        inline-block absolute border-box bg-navy white
        p1 h6 line-height-3 rounded'
      style={style}
    >
      <div className='mb1 h5'>{value}</div>
      <div
        className='mb1 border-bottom border-white'
        style={{ paddingBottom: 2, fontSize: 9 }}
      >
        2014 RATES
      </div>
      <div className='m0' style={{ fontSize: 9 }}>
        <div className='flex'>
          <div className='flex-auto'>Violent Crime</div>
          <div className='bold'>891</div>
        </div>
        <div className='flex'>
          <div className='flex-auto'>Property Crime</div>
          <div className='bold'>2,225</div>
        </div>
      </div>
    </div>
  )
}

export default Hint
