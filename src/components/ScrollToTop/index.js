import React from 'react'

import Scroll from 'react-scroll'

import './index.scss'

const scroll = Scroll.animateScroll

const ScrollToTopButtn = (props) => {
  return (
    <div className="scroll-top-btn" onClick={scroll.scrollToTop}></div>
  )
}

export default ScrollToTopButtn