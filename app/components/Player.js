var Player = React.createClass({
  getInitialState: function() {
    return {
      health: 100,
      weapon: "stick",
      attack: 7,
      level: 0,
      nextlevel: 60
    };
  },
  updateHealth: function(change) {
    this.setState({health: this.state.health + change});
  },
  updateWeapon: function(newWeapon) {
    this.setState({weapon: newWeapon});
  },
  updateAttack: function(change) {
    this.setState({attack: this.state.attack + change});
  },
  updateLevel: function() {
    this.setState({level: this.state.level + 1});
  },
  render: function() {
    return (
      <div id="player" class="tile">a</div>
    )
  }
});

export default Player
