import { applyMiddleware, createStore } from 'redux';

import { emitAction } from './plugin/listener';
import reducer from './reducers/index';
import initialState from './reducers/initial-state';

const store = applyMiddleware(emitAction)(createStore)(reducer, initialState);

export default store;
