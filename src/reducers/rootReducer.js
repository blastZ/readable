import postsReducer from './posts_reducer';
import categoriesReducer from './categories_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    postsReducer,
    categoriesReducer
})
