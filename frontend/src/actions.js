
// The action type corresponds with the state it updates
// so that the actionMap function in my reducer.js file can work
export function updatePosts(payload) {
    return {
        type: 'posts',
        payload: payload,
    }
}

export function updateUserPosts(payload) {
    return {
        type: 'user_posts',
        payload: payload,
    }
}

export function updateComments(payload) {
    return {
        type: 'comments',
        payload: payload,
    }
}

export function toggleMenu(payload) {
    return {
        type: 'showMenu',
        payload: payload,
    }
}

export function updateSignup(payload) {
    return {
        type: 'signupForm',
        payload: payload,
    }
}

export function login(payload) {
    return {
        type: 'loginForm',
        payload: payload,
    }
}

export function updateToken(payload) {
    return {
        type: 'token',
        payload: payload,
    }
}

export function updateUser(payload) {
    return {
        type: 'user',
        payload: payload,
    }
}

export function updatePostForm(payload) {
    return {
        type: 'postForm',
        payload: payload,
    }
}

export function updateDurationDisplay(payload) {
    return {
        type: 'durationDisplay',
        payload: payload,
    }
}

export function updatePostsToSend(payload) {
    return {
        type: 'postsToSend',
        payload: payload,
    }
}

export function updateThread(payload) {
    return {
        type: 'thread',
        payload: payload,
    }
}

export function updateCount(payload) {
    return {
        type: 'count',
        payload: payload,
    }
}

export function updateCreatePostInfo(payload) {
    return {
        type: 'createPost_info',
        payload: payload,
    }
}