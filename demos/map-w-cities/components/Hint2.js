import { format } from 'd3-format'
import React from 'react'


const fmt = format(',.0f')
const data = [
  {
    "name": "Alabama",
    "vc": 91382,
    "pc": 131259
  },
  {
    "name": "Alaska",
    "vc": 13197,
    "pc": 20235
  },
  {
    "name": "Arizona",
    "vc": 83255,
    "pc": 209345
  },
  {
    "name": "Arkansas",
    "vc": 47275,
    "pc": 77662
  },
  {
    "name": "California",
    "vc": 347282,
    "pc": 866934
  },
  {
    "name": "Colorado",
    "vc": 43717,
    "pc": 128314
  },
  {
    "name": "Connecticut",
    "vc": 34293,
    "pc": 65060
  },
  {
    "name": "Delaware",
    "vc": 17948,
    "pc": 27675
  },
  {
    "name": "District of Columbia",
    "vc": 22804,
    "pc": 34752
  },
  {
    "name": "Florida",
    "vc": 255695,
    "pc": 582441
  },
  {
    "name": "Georgia",
    "vc": 127911,
    "pc": 307667
  },
  {
    "name": "Hawaii",
    "vc": 8492,
    "pc": 24401
  },
  {
    "name": "Idaho",
    "vc": 14312,
    "pc": 27587
  },
  {
    "name": "Illinois",
    "vc": 37442,
    "pc": 171429
  },
  {
    "name": "Indiana",
    "vc": 62370,
    "pc": 144997
  },
  {
    "name": "Iowa",
    "vc": 22993,
    "pc": 54696
  },
  {
    "name": "Kansas",
    "vc": 39339,
    "pc": 64927
  },
  {
    "name": "Kentucky",
    "vc": 35420,
    "pc": 83895
  },
  {
    "name": "Louisiana",
    "vc": 71870,
    "pc": 148698
  },
  {
    "name": "Maine",
    "vc": 9811,
    "pc": 22432
  },
  {
    "name": "Maryland",
    "vc": 72994,
    "pc": 146688
  },
  {
    "name": "Massachusetts",
    "vc": 68819,
    "pc": 103531
  },
  {
    "name": "Michigan",
    "vc": 126713,
    "pc": 166728
  },
  {
    "name": "Minnesota",
    "vc": 33849,
    "pc": 113404
  },
  {
    "name": "Mississippi",
    "vc": 24079,
    "pc": 54099
  },
  {
    "name": "Missouri",
    "vc": 68876,
    "pc": 154276
  },
  {
    "name": "Montana",
    "vc": 9405,
    "pc": 22772
  },
  {
    "name": "Nebraska",
    "vc": 18698,
    "pc": 43657
  },
  {
    "name": "Nevada",
    "vc": 52387,
    "pc": 74779
  },
  {
    "name": "New Hampshire",
    "vc": 13275,
    "pc": 19896
  },
  {
    "name": "New Jersey",
    "vc": 59888,
    "pc": 123393
  },
  {
    "name": "New Mexico",
    "vc": 25024,
    "pc": 70409
  },
  {
    "name": "New York",
    "vc": 147357,
    "pc": 315599
  },
  {
    "name": "North Carolina",
    "vc": 108295,
    "pc": 254040
  },
  {
    "name": "North Dakota",
    "vc": 8351,
    "pc": 14283
  },
  {
    "name": "Ohio",
    "vc": 134373,
    "pc": 251589
  },
  {
    "name": "Oklahoma",
    "vc": 42161,
    "pc": 100206
  },
  {
    "name": "Oregon",
    "vc": 28189,
    "pc": 110560
  },
  {
    "name": "Pennsylvania",
    "vc": 98473,
    "pc": 201657
  },
  {
    "name": "Rhode Island",
    "vc": 9944,
    "pc": 21912
  },
  {
    "name": "South Carolina",
    "vc": 90347,
    "pc": 154101
  },
  {
    "name": "South Dakota",
    "vc": 9206,
    "pc": 14117
  },
  {
    "name": "Tennessee",
    "vc": 136458,
    "pc": 180949
  },
  {
    "name": "Texas",
    "vc": 362215,
    "pc": 749785
  },
  {
    "name": "Utah",
    "vc": 29069,
    "pc": 78791
  },
  {
    "name": "Vermont",
    "vc": 2138,
    "pc": 7755
  },
  {
    "name": "Virginia",
    "vc": 95208,
    "pc": 150796
  },
  {
    "name": "Washington",
    "vc": 71453,
    "pc": 246524
  },
  {
    "name": "West Virginia",
    "vc": 12513,
    "pc": 24604
  },
  {
    "name": "Wisconsin",
    "vc": 34942,
    "pc": 104545
  },
  {
    "name": "Wyoming",
    "vc": 5571,
    "pc": 10278
  },
  {
    "name": "Atlanta, Georgia",
    "vc": 16628.43,
    "pc": 33843.37
  },
  {
    "name": "Boston, Massachusetts",
    "vc": 8946.470000000001,
    "pc": 11388.41
  },
  {
    "name": "Buffalo, New York",
    "vc": 19156.41,
    "pc": 34715.89
  },
  {
    "name": "Chicago, Illinois",
    "vc": 4867.46,
    "pc": 18857.19
  },
  {
    "name": "Cincinnati, Ohio",
    "vc": 17468.49,
    "pc": 27674.79
  },
  {
    "name": "Cleveland, Ohio",
    "vc": 17468.49,
    "pc": 27674.79
  },
  {
    "name": "Dallas, Texas",
    "vc": 47087.950000000004,
    "pc": 82476.35
  },
  {
    "name": "Denver, Colorado",
    "vc": 5683.21,
    "pc": 14114.54
  },
  {
    "name": "Detroit, Michigan",
    "vc": 16472.690000000002,
    "pc": 18340.08
  },
  {
    "name": "Houston, Texas",
    "vc": 47087.950000000004,
    "pc": 82476.35
  },
  {
    "name": "Las Vegas, Nevada",
    "vc": 6810.31,
    "pc": 8225.69
  },
  {
    "name": "Los Angeles, California",
    "vc": 45146.66,
    "pc": 95362.74
  },
  {
    "name": "Memphis, Tennessee",
    "vc": 17739.54,
    "pc": 19904.39
  },
  {
    "name": "Miami, Florida",
    "vc": 33240.35,
    "pc": 64068.51
  },
  {
    "name": "Milwaukee, Wisconsin",
    "vc": 4542.46,
    "pc": 11499.95
  },
  {
    "name": "Minneapolis, Minnesota",
    "vc": 4400.37,
    "pc": 12474.44
  },
  {
    "name": "New York, New York",
    "vc": 19156.41,
    "pc": 34715.89
  },
  {
    "name": "Norfolk, Virginia",
    "vc": 12377.04,
    "pc": 16587.56
  },
  {
    "name": "Philadelphia, Pennsylvania",
    "vc": 12801.49,
    "pc": 22182.27
  },
  {
    "name": "Phoenix, Arizona",
    "vc": 10823.15,
    "pc": 23027.95
  },
  {
    "name": "Pittsburgh, Pennsylvania",
    "vc": 12801.49,
    "pc": 22182.27
  },
  {
    "name": "Portland, Oregon",
    "vc": 3664.57,
    "pc": 12161.6
  },
  {
    "name": "Raleigh, North Carolina",
    "vc": 14078.35,
    "pc": 27944.4
  },
  {
    "name": "Sacramento, California",
    "vc": 45146.66,
    "pc": 95362.74
  },
  {
    "name": "San Antonio, Texas",
    "vc": 47087.950000000004,
    "pc": 82476.35
  },
  {
    "name": "San Diego, California",
    "vc": 45146.66,
    "pc": 95362.74
  },
  {
    "name": "San Francisco, California",
    "vc": 45146.66,
    "pc": 95362.74
  },
  {
    "name": "San Jose, California",
    "vc": 45146.66,
    "pc": 95362.74
  },
  {
    "name": "Seattle, Washington",
    "vc": 9288.89,
    "pc": 27117.64
  },
  {
    "name": "St. Louis, Missouri",
    "vc": 8953.880000000001,
    "pc": 16970.36
  },
  {
    "name": "Tampa, Florida",
    "vc": 33240.35,
    "pc": 64068.51
  },
  {
    "name": "Washington, D.C., District of Columbia",
    "vc": 9123,
    "pc": 19970
  }
]

const Hint = ({ value, position }) => {
  const width = 140
  const style = {
    left: position.x - (width / 2),
    top: position.y + 75,
    width,
  }

  const rates = data.find(d => d.name === value)

  return (
    <div
      className='
        inline-block absolute border-box bg-navy white
        p1 h6 line-height-3 rounded'
      style={style}
    >
      <div className='mb1 h5'>{value}</div>

      <div
        className='mb1 flex flex-baseline border-bottom border-white'
        style={{ paddingBottom: 3 }}
      >
        <div className='flex-auto bold' style={{ fontSize: 9 }}>2014 RATES</div>
        <div className='italic' style={{ fontSize: 7 }}>per 100k people</div>
      </div>

      <div className='mb2' style={{ fontSize: 9 }}>
        <div className='flex'>
          <div className='flex-auto'>Violent Crime</div>
          <div className='bold'>{fmt(rates.vc)}</div>
        </div>
        <div className='flex'>
          <div className='flex-auto'>Property Crime</div>
          <div className='bold'>{fmt(rates.pc)}</div>
        </div>
      </div>

      <img src='srs.png' width='15' style={{ marginRight: 4 }} />
      <img src='nibrs.png' width='15' style={{ marginRight: 4 }} />

    </div>
  )
}

export default Hint
