/*
 *
 * Redux Store
 *
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'

import combinedReducers from './combinedReducers'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routingMiddleware = routerMiddleware(history)

const middleware = [routingMiddleware]

const __DEV__ = process.env.NODE_ENV !== 'production'

if (__DEV__) {
  middleware.push(createLogger())
}

// redux devtools
const composeEnhancer = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const enhancer = composeEnhancer(applyMiddleware(...middleware))

const store = createStore(combinedReducers, enhancer)

export default store
