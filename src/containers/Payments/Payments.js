import React, { Component } from 'react'
import { object } from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Auth from 'containers/Auth'
import axios from 'axios'
import { SANDBOX_URL } from 'constants/endpoints'

// PAYMENT REQUEST MOCK
const paymentMock = (state) => ({
  Data: {
    Initiation: {
      InstructionIdentification: 'DUMMY001',
      EndToEndIdentification: 'ETOE001',
      InstructedAmount: {
        Amount: state.amount.toString(),
        Currency: 'EUR'
      },
      DebtorAccount: {
        SchemeName: 'IBAN',
        Identification: state.debtoriban,
        Name: state.debtorname
      },
      CreditorAccount: {
        SchemeName: 'IBAN',
        Identification: state.creditoriban,
        Name: state.creditorname
      },
      RemittanceInformation: {
        Reference: 'FRESCO-001',
        Unstructured: 'Dummy Code 001'
      }
    }
  },
  Risk: {
    PaymentContextCode: 'PersonToPerson'
  }
})

class Payments extends Component {
  state = {
    debtoriban: '',
    debtorname: '',
    creditoriban: '',
    creditorname: '',
    amount: 0
  }

  handleInputChange = (e) => {
    const newState = this.state
    newState[e.target.name] = e.target.value

    this.setState(newState)
  }

  // STEP 1: MAKE PAYMENT
  initiatePayment = () => {
    const body = paymentMock(this.state)

    axios.post(`${SANDBOX_URL}/payment/payments`, body, {
      headers: { 'Authorization': `Bearer ${this.state.appToken}` }
    })
      .then(resp => {
        const data = resp.data.Data
        this.showToaster('Payment initiated...')
        if (data && data.PaymentId) {
          this.createPaymentSubmission(data.PaymentId)
        }
      })
  }

  // STEP 2: SUBMIT PAYMENT
  createPaymentSubmission = (paymentId) => {
    const body = paymentMock(this.state)
    body.Data.PaymentId = parseInt(paymentId)

    axios.post(`${SANDBOX_URL}/payment/payment-submissions`, body, {
      headers: { 'Authorization': `Bearer ${this.state.access_token}` }
    })
      .then(resp => {
        this.showToaster('Payment confirmation successfull')
      })
  }

  showToaster = (message) => {
    this.setState({ message })
  }

  hideToaster = () => {
    this.setState({ message: null })
  }

  render () {
    const { accessToken } = this.props.auth
    const authenticated = accessToken ? true : false
    return (
      <div>
        <div className='payments-wrapper'>
          {/* AUTHENTICATION */}
          <div className='payments-settings'>
            <Auth />
          </div>

          {/* PAYMENTS */}
          <div className='payments-content'>
            <h3>Step 2: Make payment</h3>
            <FormControl fullWidth>
              <InputLabel>Debtor (IBAN)</InputLabel>
              <Input name='debtoriban' value={this.state.debtoriban} onChange={this.handleInputChange} disabled={!authenticated} />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Debtor (Name)</InputLabel>
              <Input name='debtorname' value={this.state.debtorname} onChange={this.handleInputChange} disabled={!authenticated} />
            </FormControl>
            <br /><br />
            <FormControl fullWidth>
              <InputLabel>Creditor (IBAN)</InputLabel>
              <Input name='creditoriban' value={this.state.creditoriban} onChange={this.handleInputChange} disabled={!authenticated} />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Creditor (Name)</InputLabel>
              <Input name='creditorname' value={this.state.creditorname} onChange={this.handleInputChange} disabled={!authenticated} />
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel>Amount (EUR)</InputLabel>
              <Input name='amount' value={this.state.amount} onChange={this.handleInputChange} disabled={!authenticated} />
            </FormControl>
            <br />
            <br />
            <Button onClick={this.initiatePayment} variant='contained' color='primary' disabled={!authenticated}>Make payment</Button>
          </div>
        </div>
        <div className='payments-footer'>
          <p>Checkout the documentation behind this flow in the <strong>Payments API</strong> tab, on the <a target='_blank' href='https://appcenter.innofactory.io/docs/overview'>documentation page</a>.</p>
          <p>For more intel on this boilerplate, checkout the content on the <a href='/'>landing page</a>, or the README.md.</p>
        </div>
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

Payments.propTypes = {
  auth: object.isRequired
}

export default Payments
