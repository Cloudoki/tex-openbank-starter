
import { connect } from 'react-redux'
import App from './App'
import { authenticateSuccess } from 'containers/Auth/ducks'

const mapDispatchToProps = (dispatch) => ({
  authenticateSuccess: (data) => dispatch(authenticateSuccess(data))
})

export default connect(null, mapDispatchToProps)(App)
