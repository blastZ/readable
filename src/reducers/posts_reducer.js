import { SET_POSTS, SET_POST } from '../actions/posts_action';

const initState = {
    posts: [],
    post: {}
}

function postsReducer(state=initState, action) {
    const { posts, post } = action;
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                posts
            }
        }
        case SET_POST: {
            return {
                ...state,
                post
            }
        }
        default: return state;
    }
}

export default postsReducer;
