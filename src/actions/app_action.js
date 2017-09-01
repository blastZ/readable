export const SHOULD_SHOW_NEW_POST_VIEW = "SHOULD_SHOW_NEW_POST_VIEW",
             SHOULD_SHOW_NEW_COMMENT_VIEW = "SHOULD_SHOW_NEW_COMMENT_VIEW",
             SHOULD_SHOW_EDIT_POST_VIEW = "SHOULD_SHOW_EDIT_POST_VIEW",
             SHOULD_SHOW_EDIT_COMMNET_VIEW = "SHOULD_SHOW_EDIT_COMMNET_VIEW",
             CHANGE_POSTS_ORDER_METHOD = "CHANGE_POSTS_ORDER_METHOD",
             SHOULD_SHOW_COMMENT_SELECT = "SHOULD_SHOW_COMMENT_SELECT",
             SHOULD_SHOW_POST_SELECT = "SHOULD_SHOW_POST_SELECT",
             HANDLE_EDIT_COMMENT_VIEW_COMMENT = "HANDLE_EDIT_COMMENT_VIEW_COMMENT",
             HANDLE_EDIT_POST_VIEW_POST = "HANDLE_EDIT_POST_VIEW_POST",
             HANDLE_NEW_COMMENT_VIEW_COMMENT = "HANDLE_NEW_COMMENT_VIEW_COMMENT",
             HANDLE_NEW_POST_VIEW_POST = "HANDLE_NEW_POST_VIEW_POST";

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

export function shouldShowCommentSelect(currentCommentIndex) {
    return {
        type: SHOULD_SHOW_COMMENT_SELECT,
        currentCommentIndex
    }
}

export function shouldShowPostSelect() {
    return {
        type: SHOULD_SHOW_POST_SELECT
    }
}

export function handleEditCommentViewComment(comment) {
    return {
        type: HANDLE_EDIT_COMMENT_VIEW_COMMENT,
        comment
    }
}

export function handleEditPostViewPost(post) {
    return {
        type: HANDLE_EDIT_POST_VIEW_POST,
        post
    }
}

export function handleNewCommentViewComment(comment) {
    return {
        type: HANDLE_NEW_COMMENT_VIEW_COMMENT,
        comment
    }
}

export function handleNewPostViewPost(post) {
    return {
        type: HANDLE_NEW_POST_VIEW_POST,
        post
    }
}
