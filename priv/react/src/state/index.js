import {
  createStore,
  applyMiddleware,
} from 'redux'
import logger from 'redux-logger'
import { data } from './Reducer'


let _store = null

const initStore = () => {
  _store = createStore(
    data,
    applyMiddleware(logger)
  )
  // TODO: implement hot module reloading
}

export const getStore = () => {
  if(_store === null) {
    initStore()
  }
  return _store
}
