import { combineReducers } from 'redux'
import health from './simulationTime'
import weapon from './simulationSize'
import darknessFilter from './simulationWidth'

const reducers = combineReducers({
  health,
  weapon,
  darkness_filter
})

export default reducers
