
const initState = {
    posts: [],
    showMenu: false,
}

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
    
}

function reducer(state = initState, action) {
    const handler = actionMap[action.type];
    return handler ? handler(state, action) : state;
}

export default reducer;