import React from 'react'
import { Route, Switch } from 'react-router'

import HomePage from 'containers/HomePage'
import Payments from 'containers/Payments'
import NotFound from 'components/NotFound'

/**
 * Add routes here
 */
export const routesConfig = [
  { path: '/', exact: true, component: HomePage },
  { path: '/payments', exact: true, component: Payments },
  { component: NotFound }
]

export default () => [
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <Route
        key={`routes-${indx}`}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    )}
  </Switch>
]
