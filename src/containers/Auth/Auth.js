import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import axios from 'axios'

class Auth extends Component {
  state = {
    appToken: '',
    accessToken: '',
    clientid: '',
    redirecturi: ''
  }

  showToaster = (message) => {
    this.setState({ message })
  }

  hideToaster = () => {
    this.setState({ message: null })
  }

  componentWillMount () {
    window.addEventListener('message', (e) => {
      this.getAccessToken(e.data)
    })
  }

  handleInputChange = (e) => {
    const newState = this.state
    newState[e.target.name] = e.target.value

    this.setState(newState)
  }

  // STEP 1: AUTHENTICATE APP
  authenticate = () => {
    const { clientid, redirecturi, appToken } = this.state
    if (appToken && redirecturi && clientid) {
      this.showToaster('Authenticating...')
      this.setState({authenticating: true})
    } else {
      this.showToaster('Authentication: All of the fields are mandatory!')
    }
  }

  // STEP 2: LOGIN AND GET USER ACCESS TOKEN
  getAccessToken = (code) => {
    if (!code || typeof code !== 'string' || code.startsWith('webpackHotUpdate')) {
      return
    }

    this.showToaster('Requesting Access Token...')

    const body = {
      'grant_type': 'authorization_code',
      code: code,
      'client_id': this.state.clientid,
      'redirect_uri': this.state.redirecturi
    }
    axios.post(`http://api-sandbox.innovationfactory.be:30005/oauth/token`, body, {
      'content_type': 'application/x-www-form-urlencoded'
    })
      .then(resp => {
        this.showToaster('Authentication successfull!')
        this.authenticateSuccess({
          accessToken: resp.access_token,
          clientid: this.state.clientid,
          redirecturi: this.state.redirecturi,
          appToken: this.state.appToken
        })
      })
      .catch(err => {
        this.showToaster('Authentication failure.')
        this.props.authenticateError(err)
      })
  }

  render () {
    const { authenticated } = this.props.auth
    const { clientid, appToken, redirecturi, authenticating, accessToken } = this.state
    return (
      <div>
        <h3>Step 1: Authenticate</h3>
        <h5>Authenticated: {authenticated ? 'true' : 'false'}</h5>

        <FormControl fullWidth>
          <InputLabel>Client ID</InputLabel>
          <Input name='clientid' value={clientid} onChange={this.handleInputChange} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Access Token</InputLabel>
          <Input name='appToken' value={appToken} onChange={this.handleInputChange} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Redirect URI</InputLabel>
          <Input name='redirecturi' value={redirecturi} onChange={this.handleInputChange} />
        </FormControl>
        <br />
        <br />
        { accessToken &&
          <Button onClick={this.authenticate} variant='contained'>Re-Authenticate</Button>
        }
        { !accessToken &&
          <Button onClick={this.authenticate} variant='contained'>Authenticate</Button>
        }
        <br />
        <br />

        {/* USER LOGIN IFRAME */}
        { authenticating &&
          <iframe className='login-iframe' src={`http://api-sandbox.innovationfactory.be:30005/oauth/authorize?response_type=code&client_id=${this.state.clientid}&redirect_uri=${this.state.redirecturi}`} />
        }
        <Snackbar
          open={this.state.message}
          onClose={this.hideToaster}
          autoHideDuration={2000}
          message={this.state.message}
        />
      </div>
    )
  }
}

Auth.propTypes = {
  auth: object,
  authenticateSuccess: func,
  authenticateError: func
}

export default Auth
