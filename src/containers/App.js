import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { map } from 'rambda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import routes from '../routes'

import './App.scss'


@connect(state => ({
  test: state.test,
}))
class App extends Component {
  static propTypes = {
    test: PropTypes.arrayOf.isRequired,
  }

  render() {
    return (
      <div>
        <Header title="腾讯数字彩" routes={routes} />
        {this.props.test}
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

export default App
