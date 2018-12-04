import {
  createStore,
  applyMiddleware,
} from 'redux'
import { createLogger } from 'redux-logger'
import { data } from './Reducer'


let _store = null

const initStore = () => {
  const logger = createLogger({
    collapsed: true
  })
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
