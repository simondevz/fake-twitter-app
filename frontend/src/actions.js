

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

export function updateSignup(payload) {
    return {
        type: 'UPDATE_SIGNUP',
        payload: payload,
    }
}

export function login(payload) {
    return {
        type: 'LOGIN',
        payload: payload,
    }
}