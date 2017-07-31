import React from 'react'
import PropTypes from 'prop-types'

const Decrementer = ({ onClick }) => {

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      down
    </a>
  )
}

Decrementer.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Decrementer
