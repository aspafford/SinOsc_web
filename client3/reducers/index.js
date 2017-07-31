import { combineReducers } from 'redux'
import count from './count'

const counterApp = combineReducers({
  count
})

export default counterApp