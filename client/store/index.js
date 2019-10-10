import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './reducers/user';
import sounds from './reducers/sounds';
import loops from './reducers/loops';
import sequences from './reducers/sequences';

const reducer = combineReducers({ user, sounds, loops, sequences });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/user';
