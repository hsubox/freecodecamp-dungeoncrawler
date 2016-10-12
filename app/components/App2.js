import React, { PropTypes } from 'react'

const App2 = ({ player , level, }) => {
  return (
    <div id = 'game'>
      <ul id = 'ui'>
        <li id = 'health'><span className = 'label'>Health:</span> {player.health}</li>
        <li id = 'weapon'><span className = 'label'>Weapon:</span> {player.weapon}</li>
        <li id = 'attack'><span className = 'label'>Attack:</span> {player.attack}</li>
        <li id = 'playerLevel'><span className = 'label'>Level:</span> {player.level}</li>
        <li id = 'xp'><span className = 'label'>Next Level:</span> {player.toNextLevel} XP</li>
        <li id = 'level'><span className = 'label'>Dungeon:</span> {level}</li>
      </ul>
      <div className = 'buttons'>
        <ToggleButtonContainer
          label = 'Toggle Darkness'
          id = 'toggleDarkness' />
      </div>
      <div id = 'board'>
        {rows}
      </div>
    </div>
  )
}

InfoPanel.propTypes = {
  player: React.PropTypes.shape({
    health: React.PropTypes.number.isRequired,
    weapon: React.PropTypes.string.isRequired,
    attack: React.PropTypes.number.isRequired,
    level: React.PropTypes.number.isRequired,
    toNextLevel: React.PropTypes.number.isRequired
  })
  level: React.PropTypes.number.isRequired
};

export default InfoPanel;
