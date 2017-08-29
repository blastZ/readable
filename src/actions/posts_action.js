export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';

export function setPosts(posts) {
    return {
        type: SET_POSTS,
        posts
    }
}

export function setPost(post) {
    return {
        type: SET_POST,
        post
    }
}
