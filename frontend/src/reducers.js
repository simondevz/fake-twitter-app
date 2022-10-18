
// Initial State incase there is no current state
const initState = {
    webSDK: "QbQyuHLixx1rga1pJKvWvFmOhKat2Y7g",
    apiHost: "http://localhost:8000", // update during production
    posts: [],
    user_posts: [],
    comments: [],
    createPost_info: {
        post_type: "tweet",
        postId: null, 
        commentId: null, 
        quoteId: null, 
        comment_quoteId: null,
    },
    thread: [],
    media: [],
    user: null,
    token: null,
    showMenu: false,
    durationDisplay: false,
    count: {
        comments: 0,
        retweets: 0,
        likes: 0,
    },
    postsToSend: {
        arr: [],
        inUse: false,
    },
    postForm: {
        post: {
            text: "",
            thread: null,
            threadHead: false,
            userId: null,
            quoteId: null,
            comment_quoteId: null,
            postId: null,
            commentId: null,
        },
        media: [],
        polls: {
            first:null,
            duration: 86400000,
        },
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