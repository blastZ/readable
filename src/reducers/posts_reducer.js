import { GET_ALL_POSTS } from '../actions/posts_action';

const initState = {
    posts: []
}

function postsReducer(state=initState, action) {
    const { posts } = action;
    switch (action.type) {
        case GET_ALL_POSTS: {
            return {
                ...state,
                posts: posts
            }
        }
        default: return state;
    }
}

export default postsReducer;
