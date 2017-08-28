import { SET_POSTS } from '../actions/posts_action';

const initState = {
    posts: []
}

function postsReducer(state=initState, action) {
    const { posts } = action;
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                posts
            }
        }
        default: return state;
    }
}

export default postsReducer;
