export const GET_ALL_POSTS = 'GET_ALL_POSTS';

export function getAllPosts(posts) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}
