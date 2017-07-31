import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({ value, onClick }) => {

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {value}
    </a>
  )
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Counter
