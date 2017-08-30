import postsReducer from './posts_reducer';
import appReducer from './app_reducer';
import categoriesReducer from './categories_reducer';
import commentsReducer from './comments_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    appReducer,
    postsReducer,
    categoriesReducer,
    commentsReducer
})
