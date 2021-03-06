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
  id: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
};

export default ToggleButton;
