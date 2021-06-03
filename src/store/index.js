import { createStore, applyMiddleware } from 'redux';
import incrementReducer from '../../src/reducers/index';
import createSagaMiddleware from 'redux-saga';
import { watchIncrementAsync } from '../../src/sagas/index';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync)
export default store;
