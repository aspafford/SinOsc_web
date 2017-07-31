import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import count from './count'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  count
})

export default todoApp