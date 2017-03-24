import React from 'react'

class App extends React.Component {
  state = { data: [], search: '' }

  componentDidMount() {
    fetch('/data/ori_ny.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.log(error))
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  render() {
    const { data, search } = this.state
    const dataFiltered = data.filter(d => (
      d['NAME'].includes(search.toUpperCase())
    ))

    return (
      <div className='px2 py3 container'>
        <input
          type="text"
          className='mb2 sm-col-5 field'
          placeholder='Start typing...'
          value={search}
          onChange={this.handleChange}
        />
        <h2 className='mt0'>{dataFiltered.length} results</h2>
        {dataFiltered.slice(0, 100).map((d, i) => (
          <p key={i}>{JSON.stringify(d)}</p>
        ))}
      </div>
    )
  }
}

export default App
