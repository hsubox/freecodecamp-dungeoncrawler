import React, { PropTypes } from 'react'

const ToggleButton = ({ id, handleClick, label }) => {
  return (
    <button
      className="toggleButton"
      id={id}
      onClick={handleClick}>{label}
    </button>
  )
}

ToggleButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default ToggleButton;
