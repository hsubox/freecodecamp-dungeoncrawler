import { connect } from 'react-redux'
import { toggleDarkness } from '../actions'
import ToggleButton from '../components/ToggleButton'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: () => {
      toggleDarkness()
    }
  }
}

const ToggleButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleButton)

export default ToggleButtonContainer
