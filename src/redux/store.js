import { createStore, combineReducers } from 'redux'
import { CollapsedReducer } from './reducers/CollapsedReducers.js'
import { LoadingReducer } from './reducers/LoadingReducer.js'

// 合并
const reducer = combineReducers({
  CollapsedReducer,
  LoadingReducer
})

const store = createStore(reducer)

export default store

/*
  store.dispatch()

  store.subscribe()

*/