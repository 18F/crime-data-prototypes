import axios from 'axios'
import React from 'react'

import Table from './Table'


class App extends React.Component {
  state = { data: [], search: '', isFetching: true }

  componentDidMount() {
    axios.get('/data/ori.json')
      .then(response => response.data)
      .then(data => this.setState({ data, isFetching: false }))
      .catch(error => console.log(error))
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  render() {
    const { data, search, isFetching } = this.state

    const searchUpper = search.toUpperCase()
    const dataFiltered = data.filter(d => {
      const words = `
        ${d['NAME']} ${d['COUNTYNAME']} ${d['STATENAME']}
        ${d['ADDRESS_ZIP']} ${d['ADDRESS_CITY']}
      `.toUpperCase()

      return words.includes(searchUpper)
    })

    return (
      <div className='px2 py3 container'>
        <input
          type="text"
          className='mb2 sm-col-5 field'
          placeholder='Start typing...'
          value={search}
          onChange={this.handleChange}
        />
        {isFetching ? <div>Loading...</div> : (
          <div>
            <h3 className='mt0'>{dataFiltered.length} results</h3>
            <Table
              data={dataFiltered.slice(0, 100)}
              keys={[
                'ORI7', 'ORI9', 'NAME', 'ADDRESS_CITY',
                'COUNTYNAME', 'ADDRESS_ZIP', 'STATENAME'
              ]}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App
