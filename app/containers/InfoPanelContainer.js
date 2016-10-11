import { connect } from 'react-redux'
import InfoPanel from '../components/InfoPanel'
import { toggleDarkness } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    health: state.health,
    weapon: state.weapon.name,
    attack: state.weapon.damage,
    level: state.level,
    next_level: state.xptolevelup,
    dungeon: state.dungeon
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(toggleDarkness())
    }
  }
}

const InfoPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPanel)

export default InfoPanelContainer
