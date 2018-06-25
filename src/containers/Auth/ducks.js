import update from 'immutability-helper'

/**
* Constants
*/
export const AUTHENTICATE_SUCCESS = 'Auth/AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'Auth/AUTHENTICATE_ERROR'

/**
* Auth state
*/
const initialState = {
  accessToken: null,
  appToken: null
}

/**
 * Reducer
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return update(state, {
        accessToken: { $set: action.data.accessToken },
        appToken: { $set: action.data.appToken }
      })
    case AUTHENTICATE_ERROR:
      return update(state, {
        error: { $set: action.error }
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
