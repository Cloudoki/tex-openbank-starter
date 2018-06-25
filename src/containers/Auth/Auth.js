import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import qs from 'qs'
import axios from 'axios'

class Auth extends Component {
  state = {
    appToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInNjb3BlIjpbInNlcnZlciIsInBheW1lbnRzIiwicHJvZmlsZXMiLCJhY2NvdW50cyIsInRyYW5zYWN0aW9ucyIsInBheW1lbnQtc3VibWlzc2lvbnMiXSwiZXhwIjozNjc3MzE1OTcyLCJhdXRob3JpdGllcyI6WyJST0xFX1RSVVNURURfQ0xJRU5UIiwiUk9MRV9DTElFTlQiXSwianRpIjoiN2U3ZTA5OGEtMzc4Ny00OWJlLWExNmMtZGM4Y2FlZDU5YzdmIiwiY2xpZW50X2lkIjoiZkdxRjBBOWxJb3BrWE5RejFxWnkifQ.bFyg_iIZ7VfO50MBn9G5fwCRmEGxShrOpQJ7r5Zb0M8LzOdwi909mvYiHV-LSHZ-e0s4wofwZMUKav9GB-egNQo7g27kz74Orln-Vbk3US7AOaqRJ7adN-eIohXnY0aitOSnyTq4HpF8-WMEfZSuUIenJXFIKy9aYTpQNQoleuQ',
    accessToken: '',
    clientid: 'fGqF0A9lIopkXNQz1qZy',
    clientsecret: 'Fhs99izJdzarp4AAIuCpdIzK71GZHdHv5LilaheN',
    redirecturi: 'http://localhost:9001/auth.html'
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

    axios.post(`http://services.innofactory.io:30005/oauth/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorization
      }
    })
      .then(resp => {
        this.showToaster('Authentication successfull!')
        this.authenticateSuccess({
          accessToken: resp.access_token,
          clientid: this.state.clientid,
          clientsecret: this.state.clientsecret,
          redirecturi: this.state.redirecturi,
          appToken: this.state.appToken
        })
      })
      .catch(err => {
        this.showToaster('Authentication failure.')
        this.props.authenticateError(err)
      })
    // axios.get(`https://api.dev.openbankportal.be/authtest?authorization=${authorization}&code=${code}&redirect_uria=${this.state.redirecturi}`).then(resp => {
    //   console.log(resp)
    // })
  }

  render () {
    const { authenticated } = this.props.auth
    const { clientid, clientsecret, appToken, redirecturi, authenticating, accessToken } = this.state
    return (
      <div>
        <h3>Step 1: Authenticate</h3>
        <h5>Authenticated: {authenticated ? 'true' : 'false'}</h5>

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
