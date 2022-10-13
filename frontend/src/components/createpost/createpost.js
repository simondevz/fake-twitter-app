import {  useSelector, useDispatch } from "react-redux";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useRef, useEffect, useLayoutEffect } from "react";
import jwt_decode from "jwt-decode";
import { GiphyFetch } from '@giphy/js-fetch-api';

import useFetch from "../hooks/fetch";
import useToken from "../hooks/token";
import QuoteTweet from "../quoteTweet/quoteTweet";
import { updatePostForm, updatePostsToSend, updateCount } from "../../actions";

function CreatePost() {
    const { post_type, postId, commentId, quoteId, comment_quoteId } = useSelector(state => state.createPost_info);
    const postsToSend = useSelector(state => state.postsToSend);
    const postForm = useSelector(state => state.postForm);
    const count = useSelector(state => state.count);
    const user = useSelector(state => state.user);
    
    const webSDK = useSelector(state => state.webSDK);
    let token = useSelector(state => state.token);
    const getToken = useToken();
    const dispatch = useDispatch();
    
    const fetch = useFetch();
    const location = useLocation();
    const postFormRef = useRef(postForm);
    const locationStateRef = useRef(location.state);
    
    useLayoutEffect(() => {
        postFormRef.current = postForm;
        locationStateRef.current = location.state;
    }, [postForm, location.state]);
    
    useEffect(() => {
        async function showGif() {
            const gf = new GiphyFetch(webSDK);
            let { data } = await gf.gif(locationStateRef.current?.gif);
            
            dispatch(updatePostForm({
                ...postFormRef.current,
                media: [...postFormRef.current.media, {
                    gif: data,
                }]
            }));
        }
        showGif();
    }, [webSDK, locationStateRef, postFormRef, dispatch])
    
    async function handleSubmit(event) {
        // Set user id
        event.preventDefault();
        let user_id = user?.id;
        if (!user_id) {
            token = await getToken();
            let decoded = jwt_decode(token);
            user_id = decoded.user_id;
        }
        postForm.post.userId = user_id;
        
        // Set required fields if a comment
        if (post_type === "comment") {
            postForm.post.postId = postId;
            if (commentId) postForm.post.commentId = commentId;
        }
        
        // Set certain field if applicable
        if (post_type === "tweet") {
            if (quoteId) postForm.post.quoteId = quoteId;
            if (comment_quoteId) postForm.post.comment_quoteId = comment_quoteId;
        }
        
        // Add the current post to array of postsToSend
        const arrToUse = [...postsToSend.arr, postForm];
        dispatch(updatePostsToSend({
            ...postsToSend,
            arr: arrToUse,
            inUse: true,
        }));
        
        // loop through and send posts one at a time
        let threadHead = true, response;
        for (let post of arrToUse) {
            // indicate threadheads
            if (arrToUse.length > 1) {
                post.post.threadHead = threadHead;
                threadHead = false;
            }
            
            // Update thread id
            if (response?.status === 201) {
                post.post.thread = response.data.id;
            }
            const data = post.post;
            response = await fetch(`${ post_type === "tweet" ? `posts/${user_id}/` : `comments/${postId}/`}`, "post", {data});
            
            // Update comment count if a succesful request
            if (post_type === "comment" && response?.status ===201) {
                dispatch(updateCount({
                    ...count,
                    comments: count.comments +1,
                }))
            }
            
            // If the post was sent successfully send its media files
            if (response?.status === 201 && post.media[0]) {
                for (let media of post.media) {
                    console.log("media", media);
                    if (!media.media && !media.gif) break;
                    
                    token = token || await getToken();
                    const headers = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + token,
                    }
                    
                    let key = post_type === "tweet" ? "postId" : "commentId";
                    const data = {
                        ...media,
                        gif: media.gif.id,
                        [key]: response.data.id,
                    };
                    const mediaResponse = await fetch(`posts/${user_id}/media/`, "post", {data, headers});
                    console.log("media", mediaResponse);
                }
            }
            
            if (response.status > 399) {
                // Handle Error
                break;
            }
        }
    }
    
    // Updates form on change
    function handleChange(event, key) {
        dispatch(updatePostForm({
            ...postForm,
            post: {
                ...postForm.post,
                [key]: event.target.value,
            }
        }));
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                { post_type === "tweet" && <button>draft</button> }
                <button>{ post_type === "tweet" ? "Tweet" : "Reply" }</button>
                
                <textarea 
                    placeholder={
                        location.pathname === "/createpost/polls" ? (
                            "Ask a question"
                        ) : (
                            "What's happening"
                        )
                    }
                    value={postForm.text}
                    onChange={ 
                        event => handleChange(event, "text")
                    }
                />
                
                <Outlet />
                { location.state?.post && <QuoteTweet post={location.state.post} />}
                
                <input
                    type="file"
                    multiple
                    onChange={ 
                        event => {
                            const files = event.target.files;
                            const objURL = files[0];
                            dispatch(updatePostForm({
                                ...postForm,
                                media: [...postForm.media, {
                                    media: objURL
                                }],
                            }))
                        }
                    }
                />
                
                <p>who can reply</p>
                <Link to="/gifs">gif</Link><br />
                <Link to="polls">polls</Link>
                <p>add location tag</p>
                <p>bar for text length warning</p>
                <p>make thread</p>
            </form>
        </>
    )
}

export default CreatePost;