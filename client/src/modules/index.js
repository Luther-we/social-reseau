import { combineReducers } from 'redux'
import counter from './counter'
import { reducer as formReducer } from 'redux-form'
import input from '../component/input/services/inputReducer'
import * as reducers from '../reducers'

export default combineReducers({
  ...reducers,
  form: formReducer,
  inputs: input
})
