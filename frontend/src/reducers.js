
const initState = {
    posts: [],
}

const actionMap = {
    UPDATE_POSTS: (state, action) => {
        return {
            ...state,
            posts: action.payload
        }
    },
    
}

function reducer(state = initState, action) {
    const handler = actionMap[action.type];
    return handler ? handler(state, action) : state;
}

export default reducer;