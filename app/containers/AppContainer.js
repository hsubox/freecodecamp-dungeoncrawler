import { connect } from 'react-redux'
import {damage, heal, move, setLocation, switchWeapon, addEntity, removeEntity, resetBoard, setMap, increaseLevel, resetLevel, setWindowSize, gainXp, levelUp, resetMap, addBoss, toggleDarkness
} from '../actions/'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    state
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
