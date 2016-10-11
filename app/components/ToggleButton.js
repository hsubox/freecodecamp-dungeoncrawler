import React from 'react'

const ToggleButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <button
        className="toggleButton"
        id={this.props.id}
        onClick={this.props.handleClick}>{this.props.label}
      </button>
    );
  }
});

export default ToggleButton;
