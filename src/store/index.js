import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import incrementReducer from './num/reducer';
import { watchIncrementAsync } from '../../src/sagas/index';
import { demoReducer } from './demo/reducer'

export const reducers = combineReducers({
    demoReducer,
    incrementReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducers)
const sagaMiddleware = createSagaMiddleware()
const store = createStore(persistedReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchIncrementAsync)


export default store;
