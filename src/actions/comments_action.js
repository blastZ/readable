export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENT = 'SET_COMMENT';

export function setComments(comments) {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export function setComment(comment) {
    return {
        type: SET_COMMENT,
        comment
    }
}
