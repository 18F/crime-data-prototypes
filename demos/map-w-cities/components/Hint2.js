import { format } from 'd3-format'
import React from 'react'

import participation from '../data/participation.json'


const slugify = str => str.toLowerCase().replace(/\s+/g, '-')
const formatNum = format(',.0f')
const formatRate = n => `${n > 0 ? '+' : ''}${format('.0%')(n)}`

const data = [
  {
    "name": "Alaska",
    "vc": 1788.860996,
    "pc": 2742.865973
  },
  {
    "name": "Alabama",
    "vc": 1884.407007,
    "pc": 2706.718822
  },
  {
    "name": "Arkansas",
    "vc": 1578.949654,
    "pc": 2593.852734
  },
  {
    "name": "Arizona",
    "vc": 1236.800087,
    "pc": 3109.938314
  },
  {
    "name": "California",
    "vc": 894.9990336,
    "pc": 2234.222022
  },
  {
    "name": "Colorado",
    "vc": 816.24674,
    "pc": 2395.770163
  },
  {
    "name": "Connecticut",
    "vc": 953.4634331,
    "pc": 1808.89193
  },
  {
    "name": "District of Columbia",
    "vc": 3460.956483,
    "pc": 5274.300987
  },
  {
    "name": "Delaware",
    "vc": 1918.312466,
    "pc": 2957.950608
  },
  {
    "name": "Florida",
    "vc": 1285.332441,
    "pc": 2927.825388
  },
  {
    "name": "Georgia",
    "vc": 1266.778795,
    "pc": 3047.009495
  },
  {
    "name": "Hawaii",
    "vc": 598.2131095,
    "pc": 1718.911692
  },
  {
    "name": "Iowa",
    "vc": 740.0086125,
    "pc": 1760.340585
  },
  {
    "name": "Idaho",
    "vc": 875.6387415,
    "pc": 1687.831607
  },
  {
    "name": "Illinois",
    "vc": 290.6856679,
    "pc": 1330.910565
  },
  {
    "name": "Indiana",
    "vc": 945.4505215,
    "pc": 2197.971609
  },
  {
    "name": "Kansas",
    "vc": 1354.638964,
    "pc": 2235.762069
  },
  {
    "name": "Kentucky",
    "vc": 802.5454876,
    "pc": 1900.890844
  },
  {
    "name": "Louisiana",
    "vc": 1545.699098,
    "pc": 3198.029282
  },
  {
    "name": "Massachusetts",
    "vc": 1020.234803,
    "pc": 1534.836736
  },
  {
    "name": "Maryland",
    "vc": 1221.369294,
    "pc": 2454.451312
  },
  {
    "name": "Maine",
    "vc": 737.6198134,
    "pc": 1686.503685
  },
  {
    "name": "Michigan",
    "vc": 1278.65361,
    "pc": 1682.442678
  },
  {
    "name": "Minnesota",
    "vc": 620.2662074,
    "pc": 2078.072291
  },
  {
    "name": "Missouri",
    "vc": 1135.89493,
    "pc": 2544.301733
  },
  {
    "name": "Mississippi",
    "vc": 806.6866649,
    "pc": 1812.40674
  },
  {
    "name": "Montana",
    "vc": 918.8347944,
    "pc": 2224.74279
  },
  {
    "name": "North Carolina",
    "vc": 1089.052615,
    "pc": 2554.715604
  },
  {
    "name": "North Dakota",
    "vc": 1129.304026,
    "pc": 1931.487176
  },
  {
    "name": "Nebraska",
    "vc": 993.7799727,
    "pc": 2320.325825
  },
  {
    "name": "New Hampshire",
    "vc": 1000.517782,
    "pc": 1499.533092
  },
  {
    "name": "New Jersey",
    "vc": 670.0249212,
    "pc": 1380.516716
  },
  {
    "name": "New Mexico",
    "vc": 1199.862676,
    "pc": 3376.004281
  },
  {
    "name": "Nevada",
    "vc": 1845.198072,
    "pc": 2633.898994
  },
  {
    "name": "New York",
    "vc": 746.2539552,
    "pc": 1598.274951
  },
  {
    "name": "Ohio",
    "vc": 1158.971113,
    "pc": 2169.962592
  },
  {
    "name": "Oklahoma",
    "vc": 1087.169818,
    "pc": 2583.926823
  },
  {
    "name": "Oregon",
    "vc": 710.0076343,
    "pc": 2784.719006
  },
  {
    "name": "Pennsylvania",
    "vc": 770.0898609,
    "pc": 1577.021225
  },
  {
    "name": "Rhode Island",
    "vc": 942.4047052,
    "pc": 2076.626297
  },
  {
    "name": "South Carolina",
    "vc": 1869.577579,
    "pc": 3188.858231
  },
  {
    "name": "South Dakota",
    "vc": 1079.028335,
    "pc": 1654.642951
  },
  {
    "name": "Tennessee",
    "vc": 2083.534371,
    "pc": 2762.853485
  },
  {
    "name": "Texas",
    "vc": 1343.679061,
    "pc": 2781.41547
  },
  {
    "name": "Utah",
    "vc": 987.7664972,
    "pc": 2677.323268
  },
  {
    "name": "Virginia",
    "vc": 1143.462592,
    "pc": 1811.082945
  },
  {
    "name": "Vermont",
    "vc": 341.527545,
    "pc": 1238.796123
  },
  {
    "name": "Washington",
    "vc": 1011.862868,
    "pc": 3491.084793
  },
  {
    "name": "Wisconsin",
    "vc": 606.8886078,
    "pc": 1815.785287
  },
  {
    "name": "West Virginia",
    "vc": 676.2592105,
    "pc": 1329.711629
  },
  {
    "name": "Wyoming",
    "vc": 953.6885028,
    "pc": 1759.47055
  },
  {
    "name": "Atlanta, Georgia",
    "vc": 2502.151823590145,
    "pc": 5648.700886593849
  },
  {
    "name": "Boston, Massachusetts",
    "vc": 1179.5894187518606,
    "pc": 1990.0575766067511
  },
  {
    "name": "Buffalo, New York",
    "vc": 1344.8385243135629,
    "pc": 2207.028225257294
  },
  {
    "name": "Chicago, Illinois",
    "vc": 481.8393697420634,
    "pc": 1500.2707520516863
  },
  {
    "name": "Cincinnati, Ohio",
    "vc": 2034.0432708660865,
    "pc": 3777.8705656473053
  },
  {
    "name": "Cleveland, Ohio",
    "vc": 1705.4056574725832,
    "pc": 3082.8609151363826
  },
  {
    "name": "Dallas, Texas",
    "vc": 1404.0159198741,
    "pc": 3097.7249936334656
  },
  {
    "name": "Denver, Colorado",
    "vc": 1068.7827227793853,
    "pc": 3113.841336600802
  },
  {
    "name": "Detroit, Michigan",
    "vc": 2140.6663818576585,
    "pc": 2994.9000429834045
  },
  {
    "name": "Houston, Texas",
    "vc": 1633.6054830222567,
    "pc": 3845.1838761545264
  },
  {
    "name": "Las Vegas, Nevada",
    "vc": 3543.092950895274,
    "pc": 4709.083324823873
  },
  {
    "name": "Los Angeles, California",
    "vc": 1107.9453647561095,
    "pc": 2831.279289729224
  },
  {
    "name": "Memphis, Tennessee",
    "vc": 3067.0007061454767,
    "pc": 5402.653706996553
  },
  {
    "name": "Miami, Florida",
    "vc": 1452.9461899139235,
    "pc": 5503.044262057978
  },
  {
    "name": "Milwaukee, Wisconsin",
    "vc": 717.4285497525176,
    "pc": 3449.2843101263147
  },
  {
    "name": "Minneapolis, Minnesota",
    "vc": 1207.303515567468,
    "pc": 3225.23802693906
  },
  {
    "name": "New York, New York",
    "vc": 1350.0341719540543,
    "pc": 2996.4368450720517
  },
  {
    "name": "Norfolk, Virginia",
    "vc": 2282.086716400674,
    "pc": 2686.8673506204664
  },
  {
    "name": "Philadelphia, Pennsylvania",
    "vc": 841.8411535724562,
    "pc": 2379.115110517708
  },
  {
    "name": "Phoenix, Arizona",
    "vc": 1736.6416636308998,
    "pc": 4764.739949703079
  },
  {
    "name": "Pittsburgh, Pennsylvania",
    "vc": 780.9112026907478,
    "pc": 2107.5190375742673
  },
  {
    "name": "Portland, Oregon",
    "vc": 1025.3692171205114,
    "pc": 3532.910668600757
  },
  {
    "name": "Raleigh, North Carolina",
    "vc": 1615.6629044983665,
    "pc": 3757.766276084544
  },
  {
    "name": "Sacramento, California",
    "vc": 1622.091226912016,
    "pc": 4042.8567652672346
  },
  {
    "name": "San Antonio, Texas",
    "vc": 1834.939383612112,
    "pc": 5444.750573418035
  },
  {
    "name": "San Diego, California",
    "vc": 1168.492573982821,
    "pc": 2684.833745783593
  },
  {
    "name": "San Francisco, California",
    "vc": 1662.0363476305392,
    "pc": 2949.1563569755167
  },
  {
    "name": "San Jose, California",
    "vc": 1425.7906022792188,
    "pc": 3819.9783918813773
  },
  {
    "name": "Seattle, Washington",
    "vc": 1733.2365693479799,
    "pc": 3745.3573486776368
  },
  {
    "name": "St. Louis, Missouri",
    "vc": 2000.3546604460973,
    "pc": 2565.16731013569
  },
  {
    "name": "Tampa, Florida",
    "vc": 1426.432218940865,
    "pc": 3711.686015506731
  },
  {
    "name": "Washington, D.C., District of Columbia",
    "vc": 3460.956483,
    "pc": 5274.300987
  }
]

const national = { vc: 1044.3, pc: 2244.1 }

const Hint = ({ value, position }) => {
  const width = 140
  const style = {
    left: position.x - (width / 2),
    top: position.y + 75,
    width,
    backgroundColor: '#244252'
  }

  const rates = data.find(d => d.name === value)
  const p = participation[slugify(value)] || {}
  const hasSrs = p.srs || p.srs === undefined
  const hasNibrs = !!p.nibrs

  return (
    <div
      className='
        inline-block absolute border-box white
        p1 h6 line-height-3 rounded'
      style={style}
    >
      <div className='mb1 h5'>{value}</div>
      <div
        className='mb1 border-bottom border-white'
        style={{ paddingBottom: 5, lineHeight: '1.4' }}
      >
        <div className='bold' style={{ fontSize: 10 }}>2014 RATES</div>
        <div className='italic' style={{ fontSize: 8 }}>relative to the United States</div>
      </div>
      <div className='mb2' style={{ fontSize: 11 }}>
        <div className='flex'>
          <div className='flex-auto'>Violent Crime</div>
          <div className='bold'>{formatRate((rates.vc / national.vc - 1))}</div>
        </div>
        <div className='flex'>
          <div className='flex-auto'>Property Crime</div>
          <div className='bold'>{formatRate((rates.pc / national.pc - 1))}</div>
        </div>
      </div>
      {hasSrs && <img src='srs.png' width='15' style={{ marginRight: 4 }} />}
      {hasNibrs && <img src='nibrs.png' width='15' style={{ marginRight: 4 }} />}
    </div>
  )
}

export default Hint
