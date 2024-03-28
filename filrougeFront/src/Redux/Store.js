import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { postsReducer } from './Posts/reducer';
import { usersReducer } from './Users/reducer';
const blogreducers = combineReducers({
    posts: postsReducer,
    users: usersReducer
});
const store = createStore(blogreducers,applyMiddleware(thunk));
export default store;