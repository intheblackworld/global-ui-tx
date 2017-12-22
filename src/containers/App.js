import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { map } from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import routes from '../routes'

import './App.scss'

class App extends Component {

  render() {
    return (
      <div>
        <Header title="腾讯数字彩" routes={routes} />
        <Switch>
          {
            map(route => <Route key={route.path} {...route} />, routes)
          }
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
