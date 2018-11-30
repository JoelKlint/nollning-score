import {
  createStore
} from 'redux'
import { data } from './Reducer'


let _store = null

// TODO: inject redux logger middleware

const initStore = () => {
  _store = createStore(data)
  // TODO: implement hot module reloading
}

export const getStore = () => {
  if(_store === null) {
    initStore()
  }
  return _store
}
