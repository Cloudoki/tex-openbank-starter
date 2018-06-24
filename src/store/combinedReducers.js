/*
 *
 * Combine all reducers in the this file
 * and export them.
 *
 */

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import payments from 'containers/Payments/ducks'
import auth from 'containers/Auth/ducks'

export default combineReducers({
  routing,
  payments,
  auth
})
