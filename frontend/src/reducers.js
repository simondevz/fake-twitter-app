
// Initial State incase there is no current state
const initState = {
    posts: [],
    showMenu: false,
    signupForm: {
        username: "",
        email: "",
        password1: "",
        password2: "",
    },
}

// Object of actions to use in my reducer
const actionMap = {
    UPDATE_POSTS: (state, action) => {
        return {
            ...state,
            posts: action.payload
        }
    },
    TOGGLE_MENU: (state, action) => {
        return {
            ...state,
            showMenu: action.payload
        }
    },
    UPDATE_SIGNUP: (state, action) => {
        return {
            ...state,
            signupForm: action.payload,
        }
    }
}

// My reducer looks up the required action
// and uses that to update the state
function reducer(state = initState, action) {
    const handler = actionMap[action.type];
    return handler ? handler(state, action) : state;
}

export default reducer;