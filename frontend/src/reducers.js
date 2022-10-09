
// Initial State incase there is no current state
const initState = {
    webSDK: "QbQyuHLixx1rga1pJKvWvFmOhKat2Y7g",
    apiHost: "http://localhost:8000", // update during production
    posts: [],
    user: null,
    token: null,
    showMenu: false,
    durationDisplay: false,
    postsToSend: {
        arr: [],
        inUse: false,
    },
    postForm: {
        text: "",
        media: [],
        gif: null,
        polls: {
            first:null,
            duration: 86400000,
        },
        date_posted: null,
        time_posted: null,
        thread: null,
        threadHead: false,
        postId: null,
        commentId: null,
        retweetId: null,
    },
    signupForm: {
        username: "",
        email: "",
        password1: "",
        password2: "",
    },
    loginForm: {
        username: "",
        email: "",
        password: "",
    },
    // State for file support
    image_file: [".jpeg", ".jpg", ".svg", ".png", ".gif"],
    video_file: [".webm", ".ogg", ".mp4"],
}

// This function generates a function that 
// returns the updated state
const actionMap = () => {
    return (state, action) => {
        // The updated state
        return {
            ...state,
            [action.type]: action.payload,
        }
    }
}

// My reducer calls actionMap which returns a function to the handler
function reducer(state = initState, action) {
    const handler = actionMap();
    return handler ? handler(state, action) : state;
}

export default reducer;