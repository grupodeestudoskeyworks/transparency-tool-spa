import {createStore, compose, applyMiddleware} from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, logger];
}

export default compose(applyMiddleware(...middleware))(createStore)(root);
