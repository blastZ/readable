import { SHOULD_SHOW_NEW_POST_VIEW,
         SHOULD_SHOW_NEW_COMMENT_VIEW,
         SHOULD_SHOW_EDIT_POST_VIEW,
         SHOULD_SHOW_EDIT_COMMNET_VIEW,
         CHANGE_POSTS_ORDER_METHOD,
         SHOULD_SHOW_COMMENT_SELECT,
         SHOULD_SHOW_POST_SELECT,
         HANDLE_EDIT_COMMENT_VIEW_COMMENT,
         HANDLE_EDIT_POST_VIEW_POST,
         HANDLE_NEW_COMMENT_VIEW_COMMENT,
         HANDLE_NEW_POST_VIEW_POST} from '../actions/app_action';

const initState = {
    postsOrderMethod: 'vote-score',
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
    },
    commentOptionState: {
        showCommentSelect: false,
        currentCommentIndex: -1
    },
    postOptionState: {
        showPostSelect: false
    },
    controlledComponentState: {
        EditCommentView: {
            comment: {
                body: '',
                timestamp: 0
            }
        },
        EditPostView: {
            post: {
                body: '',
                title: ''
            }
        },
        NewCommentView: {
            comment: {
                author: '',
                body: '',
                id: 0,
                parentId: 0,
                timestamp: 0
            }
        },
        NewPostView: {
            post: {
                author: '',
                body: '',
                category: '',
                id: 0,
                timestamp: 0,
                title: ''
            }
        }
    }
}

function appReducer(state=initState, action) {
    const { orderMethod, currentCommentIndex, comment, post } = action;
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
        case SHOULD_SHOW_COMMENT_SELECT: {
            return {
                ...state,
                commentOptionState: {
                    showCommentSelect: !state.commentOptionState.showCommentSelect,
                    currentCommentIndex
                }
            }
        }
        case SHOULD_SHOW_POST_SELECT: {
            return {
                ...state,
                postOptionState: {
                    showPostSelect: !state.postOptionState.showPostSelect
                }
            }
        }
        case HANDLE_EDIT_COMMENT_VIEW_COMMENT: {
            return {
                ...state,
                controlledComponentState: {
                    ...state.controlledComponentState,
                    EditCommentView: {
                        ...state.controlledComponentState.EditCommentView,
                        comment
                    }
                }
            }
        }
        case HANDLE_EDIT_POST_VIEW_POST: {
            return {
                ...state,
                controlledComponentState: {
                    ...state.controlledComponentState,
                    EditPostView: {
                        ...state.controlledComponentState.EditPostView,
                        post
                    }
                }
            }
        }
        case HANDLE_NEW_COMMENT_VIEW_COMMENT: {
            return {
                ...state,
                controlledComponentState: {
                    ...state.controlledComponentState,
                    NewCommentView: {
                        ...state.controlledComponentState.NewCommentView,
                        comment
                    }
                }
            }
        }
        case HANDLE_NEW_POST_VIEW_POST: {
            return {
                ...state,
                controlledComponentState: {
                    ...state.controlledComponentState,
                    NewPostView: {
                        ...state.controlledComponentState.NewPostView,
                        post
                    }
                }
            }
        }
        default: return state;
    }
}

export default appReducer;
