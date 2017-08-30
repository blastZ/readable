export const SHOULD_SHOW_NEW_POST_VIEW = "SHOULD_SHOW_NEW_POST_VIEW",
             SHOULD_SHOW_NEW_COMMENT_VIEW = "SHOULD_SHOW_NEW_COMMENT_VIEW",
             SHOULD_SHOW_EDIT_POST_VIEW = "SHOULD_SHOW_EDIT_POST_VIEW",
             SHOULD_SHOW_EDIT_COMMNET_VIEW = "SHOULD_SHOW_EDIT_COMMNET_VIEW",
             CHANGE_POSTS_ORDER_METHOD = "CHANGE_POSTS_ORDER_METHOD";

export function shouldShowNewPostView() {
    return {
        type: SHOULD_SHOW_NEW_POST_VIEW
    }
}

export function shouldShowNewCommentView() {
    return {
        type: SHOULD_SHOW_NEW_COMMENT_VIEW
    }
}

export function shouldShowEditPostView() {
    return {
        type: SHOULD_SHOW_EDIT_POST_VIEW
    }
}

export function shouldShowEditCommentView() {
    return {
        type: SHOULD_SHOW_EDIT_COMMNET_VIEW
    }
}

export function changePostsOrderMethod(orderMethod) {
    return {
        type: CHANGE_POSTS_ORDER_METHOD,
        orderMethod
    }
}
