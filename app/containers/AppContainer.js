import { connect } from 'react-redux'
import {damage, heal, move, setLocation, switchWeapon, addEntity, removeEntity, resetBoard, setMap, increaseLevel, resetLevel, setWindowSize, gainXp, levelUp, resetMap, addBoss, toggleDarkness
} from '../actions/'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.entities.player,
    entities: state.entities,
    map: state.map,
    occupiedSpaces: state.occupiedSpaces,
    level: state.level,
    windowHeight: state.windowHeight,
    windowWidth: state.windowWidth,
    darkness: state.darkness
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
