import { createStore, compose, applyMiddleware } from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default compose(applyMiddleware(logger, thunk))(createStore)(root);
