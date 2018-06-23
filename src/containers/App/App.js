import React, { Component } from 'react'
import { object } from 'prop-types'
import Navigation from 'components/Navigation'
import routes from './routes'

class App extends Component {
  navigate = path => event => {
    this.props.history.push(path)
  }

  renderNav = () =>
    <Navigation key='navigation' title='TEX'>
      <button onClick={this.navigate('/home')}>HOME</button>
    </Navigation>

  render () {
    return [
      this.renderNav(),
      routes()
    ]
  }
}

App.propTypes = {
  history: object.isRequired
}

export default App
