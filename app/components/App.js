import React from 'react'
import Hammer from 'hammerjs'
import { tileType, weaponTypes, reverseLookup, ENEMY, PLAYER, ATTACK_VARIANCE } from '../constants/'
import { damage, heal, move, setLocation, switchWeapon, addEntity, removeEntity, resetBoard, setMap, increaseLevel, resetLevel, setWindowSize, gainXp, levelUp, resetMap, addBoss, toggleDarkness
} from '../actions/'
import createMap from './CreateMap' // This is the algorithm for creating the map.
import ToggleButtonContainer from '../containers/ToggleButtonContainer'
import store from '../store'

class App extends React.Component {
  componentWillMount() {
    this._setupGame();
  }
  componentDidMount() {
    if (this.props.player.toNextLevel <= 0) this._playerLeveledUp();
    window.addEventListener('keydown', this._handleKeypress.bind(this));
    window.addEventListener('resize', setWindowSize);
    // Setup touch controls
    const touchElement = document.getElementById('root');
    const hammertime = new Hammer(touchElement);
    hammertime.get('swipe').set({direction: Hammer.DIRECTION_ALL});
    hammertime.on('swipe', this._handleSwipe.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeypress.bind(this));
    window.removeEventListener('resize', setWindowSize);
  }

  _playerLeveledUp() {
    const currLevel = this.props.player.level + 1;
    levelUp(currLevel * PLAYER.attack, currLevel * PLAYER.health,
              (currLevel + 1) * PLAYER.toNextLevel);
  }

  _setupGame() {
    resetMap(createMap());
    this._fillMap();
    setWindowSize();
  }

  _getEmptyCoords() {
    const {map, occupiedSpaces} = store.getState();
    let coords, x, y;
    do {
      x = Math.floor(Math.random() * map.length);
      y = Math.floor(Math.random() * map[0].length);
      if (map[x][y] === tileType.FLOOR && !occupiedSpaces[x + 'x' + y]) {
        coords = {x: x, y: y};
      }
    } while (!coords);
    return coords;
  }

  _fillMap() {
    // Place player
    setLocation('player', this._getEmptyCoords());
    // Place items
    const state = store.getState();
    const weapon = weaponTypes[state.level];
    addEntity(weapon.entityName, 'weapon', weapon.health, weapon.attack, this._getEmptyCoords());
    // Place heath and enemies
    const NUM_THINGS = 5,
          HEALTH_VAL = 20,
          LEVEL_MULT = state.level + 1;
    for (let i = 0; i < NUM_THINGS; i++) {
      addEntity('health'+i, 'health', HEALTH_VAL, 0, this._getEmptyCoords());
      addEntity('enemy'+i, 'enemy', LEVEL_MULT * ENEMY.health,
        LEVEL_MULT * ENEMY.attack, this._getEmptyCoords());
    }
    // Place exit if not last level
    if (state.level < 4) addEntity('exit', 'exit', 0, 0, this._getEmptyCoords());
    // Place boss on last (fifth) level
    if (state.level === 4) addBoss(125, 500, this._getEmptyCoords());
  }

  _addVector(coords, vector) {
    return {x: coords.x + vector.x, y: coords.y + vector.y};
  }

  _handleKeypress(e) {
    let vector = '';
    switch (e.keyCode) {
      case 37:
        vector = {x: -1, y: 0};
        break;
      case 38:
        vector = {x: 0, y: -1};
        break;
      case 39:
        vector = {x: 1, y: 0};
        break;
      case 40:
        vector = {x: 0, y: 1};
        break;
      default:
        vector = '';
        break;
    }
    if (vector) {
      e.preventDefault();
      this._handleMove(vector);
    }
  }
  _handleSwipe(e) {
    let vector;
    const {overallVelocity, angle} = e;
    if (Math.abs(overallVelocity) > .75) {
      // swipe up
      if (angle > -100 && angle < -80) {
        vector = {x: 0, y: -1};
      }
      // swipe right
      if (angle > -10 && angle < 10) {
        vector = {x: 1, y: 0};
      }
      // swipe down
      if (angle > 80 && angle < 100) {
        vector = {x: 0, y: 1};
      }
      // swipe left
      if (Math.abs(angle) > 170) {
        vector = {x: -1, y: 0};
      }
    }
    if (vector) {
      e.preventDefault();
      this._handleMove(vector);
    }
  }

  _handleMove(vector) {
    const state = store.getState();
    const player = state.entities.player;
    const map = state.map;
    const newCoords = this._addVector({x: player.x, y: player.y}, vector);
    if (newCoords.x > 0 && newCoords.y > 0 && newCoords.x < map.length &&
        newCoords.y < map[0].length &&
        map[newCoords.x][newCoords.y] !== tileType.WALL) {
      // Tile is not a wall, determine if it contains an entity
      const entityName = state.occupiedSpaces[newCoords.x + 'x' + newCoords.y];
      // move and return if empty
      if (!entityName) {
        move('player', vector);
        return;
      }
      // handle encounters with entities
      const entity = state.entities[entityName];
      switch (entity.entityType) {
        case 'weapon':
          switchWeapon(entityName, entity.attack);
          move('player', vector);
          break;
        case 'boss':
        case 'enemy':
          const playerAttack = Math.floor((Math.random() * ATTACK_VARIANCE) + player.attack - ATTACK_VARIANCE);
          const enemyAttack = Math.floor((Math.random() * ATTACK_VARIANCE) + entity.attack - ATTACK_VARIANCE);
          // Will hit kill enemy?
          if (entity.health > playerAttack) {
            // Will rebound hit kill player?
            if (enemyAttack > player.health) {
              notifier.error('You died. Better luck next time!');
              this._setupGame();
              return;
            }
            damage(entityName,playerAttack);
            damage('player',enemyAttack);
          } else {
            // Is the enemy a boss?
            if (entityName === 'boss') {
              notifier.success('A winner is you!');
              this._setupGame();
              return;
            }
            gainXp((state.level + 1) * ENEMY.xp);
            removeEntity(entityName);
          }
          break;
        case 'health':
          heal('player', entity.health);
          removeEntity(entityName);
          move('player', vector);
          break;
        case 'exit':
          resetBoard();
          setMap(createMap());
          setLocation('player', this._getEmptyCoords());
          increaseLevel();
          this._fillMap();
          break;
        default:
          break;
      }
    }
  }

  render() {
    const {map, entities, occupiedSpaces, level, player, windowHeight,
           windowWidth, winner, darkness} = this.props,
          SIGHT = 7,
          // This should match the css height and width in pixels
          tileSize = document.getElementsByClassName('tile').item(0) ? document.getElementsByClassName('tile').item(0).clientHeight : 10;
    // Get start coords for current viewport
    const numCols = Math.floor((windowWidth / tileSize) - 5),
          numRows = Math.floor((windowHeight/ tileSize) - 17);
    let startX = Math.floor(player.x - (numCols/2));
    let startY = Math.floor(player.y - (numRows/2));
    // Make sure start isn't less than 0
    if (startX < 0) startX = 0;
    if (startY < 0) startY = 0;
    // Set end coords
    let endX = startX + numCols;
    let endY = startY + numRows;
    // Final validation of start and end coords
    if (endX > map.length) {
      startX = numCols > map.length ? 0 : startX - (endX - map.length);
      endX = map.length;
    }
    if (endY > map[0].length) {
      startY = numRows > map[0].length ? 0 : startY - (endY - map[0].length);
      endY = map[0].length;
    }

    // Create visible gameboard
    let rows = [], tileClass, row;
    for (let y = startY; y < endY; y++) {
      row = [];
      for (let x = startX; x < endX; x++) {
        let entity = occupiedSpaces[`${x}x${y}`];
        if (!entity) {
          tileClass = reverseLookup[map[x][y]];
        } else {
          tileClass = entities[entity].entityType;
        }
        if (darkness) {
          // check if it should be dark
          const xDiff = player.x - x,
                yDiff = player.y - y;
          if (Math.abs(xDiff) > SIGHT || Math.abs(yDiff) > SIGHT) {
            tileClass += ' dark';
          } else if (Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) >= SIGHT) {
            tileClass += ' dark';
          }
        }
        row.push(React.createElement('span', {className: 'tile ' + tileClass, key: x + 'x' + y}, ' '));
      }
      rows.push(React.createElement('div', {className: 'boardRow', key: 'row' + y}, row))
    }

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
    );
  }
}

export default App
