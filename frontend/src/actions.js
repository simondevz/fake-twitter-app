

export function updatePosts(payload) {
    return {
        type: 'UPDATE_POSTS',
        payload: payload,
    }
}

export function toggleMenu(payload) {
    return {
        type: 'TOGGLE_MENU',
        payload: payload,
    }
}