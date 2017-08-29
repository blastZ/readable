import { SET_COMMENTS, SET_COMMENT } from '../actions/comments_action';

const initState = {
    comments: [],
    comment: {}
}

function commentsReducer(state=initState, action) {
    const { comments, comment } = action;
    switch (action.type) {
        case SET_COMMENTS: {
            return {
                ...state,
                comments
            }
        }
        case SET_COMMENT: {
            return {
                ...state,
                comment
            }
        }
        default: return state;

    }
}

export default commentsReducer;
