import { connect } from 'react-redux'
import Auth from './Auth'
import { authenticateSuccess, authenticateError } from './ducks'

const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = (dispatch) => ({
  authenticateSuccess: (data) => dispatch(authenticateSuccess(data)),
  authenticateError: (error) => dispatch(authenticateError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
