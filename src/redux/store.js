import { createStore, combineReducers } from 'redux'
import { CollapsedReducer } from './reducers/CollapsedReducers.js'
import { LoadingReducer } from './reducers/LoadingReducer.js'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'chc',
  storage,
  blacklist: ['LoadingReducer'],
}

// 合并
const reducer = combineReducers({
  CollapsedReducer,
  LoadingReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }

/*
  store.dispatch()

  store.subscribe()

*/
