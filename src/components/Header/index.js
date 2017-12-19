import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'rambda'
import { Link } from 'react-router-dom'

import './index.scss'

const Header = (props) => {
  const { title, routes } = props

  return (
    <div className="header">
      <div className="header-container">
        <h1>{title}</h1>
        <ul>
          {
            map(route => <Link className="header-link" to={route.path}>{route.title}</Link>, routes)
          }
        </ul>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf.isRequired,
}

export default Header
