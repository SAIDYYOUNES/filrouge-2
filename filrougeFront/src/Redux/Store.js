import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { postsReducer } from './Posts/reducer';
import { usersReducer } from './Users/reducer';
import { adminReducer } from './Admin/reducer';
const blogreducers = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    admin :adminReducer
    
});
const store = createStore(blogreducers,applyMiddleware(thunk));
export default store;