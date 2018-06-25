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
    clientsecret: '',
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

    if (this.props.auth.appToken) {
      this.setState({ appToken: this.props.auth.appToken })
    }
  }

  handleInputChange = (e) => {
    const newState = this.state
    newState[e.target.name] = e.target.value

    this.setState(newState)
  }

  // STEP 1: AUTHENTICATE APP
  authenticate = () => {
    const { clientid, redirecturi, appToken, clientsecret } = this.state
    if (appToken && redirecturi && clientid && clientsecret) {
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

    const authorization = `Basic ${btoa(`${this.state.clientid}:${this.state.clientsecret}`)}`
    const formData = new FormData()
    formData.append('grant_type', 'authorization_code')
    formData.append('code', code)
    formData.append('redirect_uri', this.state.redirecturi)

    // axios.post(`http://services.innofactory.io:30005/oauth/token`, formData, {
    axios.post(`https://api.dev.openbankportal.be/sandbox/uaa/oauth/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorization
      }
    })
      .then(resp => {
        const data = {
          accessToken: resp.data.access_token,
          appToken: this.state.appToken
        }
        this.showToaster('Authentication successfull!')
        this.saveToLocalStorage(data)
        this.props.authenticateSuccess(data)
      })
      .catch(err => {
        this.showToaster('Authentication failure.')
        this.props.authenticateError(err)
      })
  }

  saveToLocalStorage = (data) => {
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('appToken', data.appToken)
  }

  render () {
    const { accessToken } = this.props.auth
    const { clientid, clientsecret, appToken, redirecturi, authenticating } = this.state

    return (
      <div>
        <h3>Step 1: Authenticate</h3>
        <h5>Authenticated: {(accessToken && appToken) ? 'true' : 'false'}</h5>

        <FormControl fullWidth>
          <InputLabel>Client ID</InputLabel>
          <Input name='clientid' value={clientid} onChange={this.handleInputChange} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Client Secret</InputLabel>
          <Input name='clientsecret' value={clientsecret} onChange={this.handleInputChange} />
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
          <iframe className='login-iframe' src={`http://services.innofactory.io:30005/oauth/authorize?response_type=code&client_id=${this.state.clientid}&redirect_uri=${this.state.redirecturi}`} />
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
