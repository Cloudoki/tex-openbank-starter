import { connect } from 'react-redux'
import Payments from './Payments'

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Payments)
