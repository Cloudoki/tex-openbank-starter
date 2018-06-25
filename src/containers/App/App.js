import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Navigation from 'components/Navigation'
import routes from './routes'

class App extends Component {
  componentDidMount () {
    const accessToken = localStorage.getItem('accessToken')
    const appToken = localStorage.getItem('appToken')
    if (accessToken && appToken) {
      this.props.authenticateSuccess({ accessToken, appToken })
    }
  }

  navigate = path => event => {
    this.props.history.push(path)
  }

  renderNav = () =>
    <Navigation key='navigation' title='TEX'>
      <button onClick={this.navigate('/payments')}>Payments</button>
    </Navigation>

  render () {
    return [
      this.renderNav(),
      routes()
    ]
  }
}

App.propTypes = {
  history: object.isRequired,
  authenticateSuccess: func.isRequired
}

export default App
