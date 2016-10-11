import React from 'react'

var InfoPanel = React.createClass({
  toggleDarkness: function() {
    console.log("to implement"); // to implement
    adjDarknessFilter();
  },
  render: function() {
    return (
      <div id="info-panel">
        <div>Health: 100</div>
        <div>Weapon: stick</div>
        <div>Attack: 7</div>
        <div>Level: 0</div>
        <div>Next Level: 60XP</div>
        <div>Dungeon: 0</div>
        <button onClick={this.toggleDarkness}>Toggle Darkness</button>
      </div>
    );
  }
});

export default InfoPanel
