import { combineReducers } from 'redux'
import health from './health'
import weapon from './weapon'
import darknessFilter from './darknessFilter'

const reducers = combineReducers({
  health,
  weapon,
  darknessFilter
})

export default reducers
