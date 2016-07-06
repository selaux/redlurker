import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import subreddits from './reducers/subreddits';
import request from './reducers/requests';
const rootReducer = combineReducers({
    request,
    subreddits,
    routing: routerReducer
});

export default function createRootStore(DevTools) {
    return createStore(
        rootReducer,
        DevTools.instrument(),
        applyMiddleware(thunkMiddleware)
    );
}
