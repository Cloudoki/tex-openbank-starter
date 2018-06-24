import update from 'immutability-helper'

/**
* Constants
*/
export const AUTHENTICATE_SUCCESS = 'Payments/AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'Payments/AUTHENTICATE_ERROR'

/**
* Payments state
*/
const initialState = {
  auth: {}
}

/**
 * Reducer
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return update(state, {
        auth: { $set: action.data }
      })
    default:
      return state
  }
}

/**
 * request action creator
 */
export function authenticateSuccess (data) {
  return { type: AUTHENTICATE_SUCCESS, data }
}
export function authenticateError (error) {
  return { type: AUTHENTICATE_ERROR, error }
}
