import React from 'react'

const Table = ({ cls, data, keys }) => (
  <div className='overflow-scroll'>
    <table className={`table-light border ${cls}`}>
      <thead>
        <tr>
          {keys.map((key, i) => (
            <th key={i}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {keys.map((key, j) => (
              <td key={j}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

Table.defaultProps = {
  cls: '',
  data: [],
  keys: [],
}

Table.propTypes = {
  cls: React.PropTypes.string,
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  keys: React.PropTypes.arrayOf(React.PropTypes.string),
}

export default Table
