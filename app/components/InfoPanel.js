import React from 'react'

var InfoPanel = React.createClass({
  render: function() {
    return (
      <div id="info-panel">
        <div>Health: 100</div>
        <div>Weapon: stick</div>
        <div>Attack: 7</div>
        <div>Level: 0</div>
        <div>Next Level: 60</div>
        <div>Dungeon: 0</div>
        <button onClick={onClick()}>Toggle Darkness</button>
      </div>
    );
  }
});

export default InfoPanel
