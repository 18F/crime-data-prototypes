import React from 'react'

const RefineBox = ({
  agency_name,
  agency_type,
  city_name,
  county_name,
  onClear,
  onChange,
  onSubmit,
}) => (
  <div
    className='mt05 p2 absolute col-12 border-box bg-white border rounded'
    style={{ minHeight: 280 }}
  >
    <label className='mb05 h5 bold block'>Agency name / ORI number</label>
    <input
      className='mb2 col-12 field'
      type='text'
      name='agency_name'
      value={agency_name}
      onChange={onChange}
    />

    <label className='mb05 h5 bold block'>Agency type</label>
    <input
      className='mb2 col-12 field'
      type='text'
      name='agency_type'
      value={agency_type}
      onChange={onChange}
    />

    <label className='mb05 h5 bold block'>City name</label>
    <input
      className='mb2 col-12 field'
      type='text'
      name='city_name'
      value={city_name}
      onChange={onChange}
    />

    <label className='mb05 h5 bold block'>County name</label>
    <input
      className='mb2 col-12 field'
      type='text'
      name='county_name'
      value={county_name}
      onChange={onChange}
    />

    <div className='mt1 clearfix'>
      <div className='left'>
        <button className='btn px0 navy underline' onClick={onClear}>
          Clear
        </button>
      </div>
      <div className='right'>
        <button className='btn btn-primary bg-navy' onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  </div>
)

export default RefineBox
