import { SHOULD_SHOW_NEW_POST_VIEW,
         SHOULD_SHOW_NEW_COMMENT_VIEW,
         SHOULD_SHOW_EDIT_POST_VIEW,
         SHOULD_SHOW_EDIT_COMMNET_VIEW,
         CHANGE_POSTS_ORDER_METHOD} from '../actions/app_action';

const initState = {
    postsOrderMethod: 'vote-score',
    commentsOrderMethod: 'vote-score',
    fetchOptions: {
        defaultURL: 'http://localhost:5001/',
        headers: {
            'Authorization': 'Basic'
        },
        postHeaders: {
            'Authorization': 'Basic',
            'Content-Type': 'application/json'
        },
    },
    popupsState: {
        showNewPostView: false,
        showNewCommentView: false,
        showEditPostView: false,
        showEditCommentView: false
    }
}

function appReducer(state=initState, action) {
    const { orderMethod } = action;
    switch(action.type) {
        case SHOULD_SHOW_NEW_POST_VIEW: {
            return {
                ...state,
                popupsState: {
                    ...state.popupsState,
                    showNewPostView: !state.popupsState.showNewPostView
                }
            }
        }
        case SHOULD_SHOW_NEW_COMMENT_VIEW: {
            return {
                ...state,
                popupsState: {
                    ...state.popupsState,
                    showNewCommentView: !state.popupsState.showNewCommentView
                }
            }
        }
        case SHOULD_SHOW_EDIT_POST_VIEW: {
            return {
                ...state,
                popupsState: {
                    ...state.popupsState,
                    showEditPostView: !state.popupsState.showEditPostView
                }
            }
        }
        case SHOULD_SHOW_EDIT_COMMNET_VIEW: {
            return {
                ...state,
                popupsState: {
                    ...state.popupsState,
                    showEditCommentView: !state.popupsState.showEditCommentView
                }
            }
        }
        case CHANGE_POSTS_ORDER_METHOD: {
            return {
                ...state,
                postsOrderMethod: orderMethod
            }
        }
        default: return state;
    }
}

export default appReducer;
