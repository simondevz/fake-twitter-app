import { GiphyFetch } from '@giphy/js-fetch-api'
import {  useSelector, useDispatch } from "react-redux";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useRef, useEffect, useLayoutEffect } from "react";

import useFetch from "./fetch";
import useToken from "./token";
import { updatePostForm, updatePostsToSend } from "../actions";

function CreatePost() {
    const postsToSend = useSelector(state => state.postsToSend);
    const postForm = useSelector(state => state.postForm);
    const webSDK = useSelector(state => state.webSDK);
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const getToken = useToken();
    
    const fetch = useFetch();
    const postFormRef = useRef(postForm);
    const location = useLocation();
    
    useLayoutEffect(() => {
        postFormRef.current = postForm;
    }, [postForm]);
    console.log(location);
    
    async function handleSubmit(event) {
        // Add the current post to array of postsToSend
        event.preventDefault();
        dispatch(updatePostsToSend({
            ...postsToSend,
            arr: [...postsToSend.arr, postForm],
            inUse: true,
        }));
        
        // loop through and send posts one at a time
        let thread = 0;
        for (let post of postsToSend.arr) {
            console.log(post);
            if (!user) await getToken();
            const data = {
                post: post,
                thread: thread,
            }
            const response = await fetch(`posts/${user.id}`, "post", data);
            console.log(response);
            thread = response.thread;
        }
    }
    
    useEffect(() => {
        async function showGif() {
            const gf = new GiphyFetch(webSDK);
            const { data } = await gf.gif(location.state?.gif_id);
            dispatch(updatePostForm({
                ...postFormRef.current,
                gif: data,
            }));
        }
        showGif();
        console.log(postFormRef.current.media);
    }, [postFormRef, webSDK, dispatch, location.state?.gif_id])
    
    // Updates form on change
    function handleChange(event, key) {
        dispatch(updatePostForm({
            ...postForm,
            [key]: event.target.value,
        }));
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <button>draft</button>
                <button>tweet</button>
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
                <input 
                    type="hidden"
                    value={ new Date(Date.now()).toISOString() }
                />
                <input
                    type="file"
                    multiple
                    onChange={ 
                        event => {
                            const files = event.target.files;
                            const objURL = files[0];
                            dispatch(updatePostForm({
                                ...postForm,
                                media: [...postForm.media, objURL],
                            }))
                        }
                    }
                />
                <p>who can reply</p>
                <Link to="/gifs">gif</Link>
                <Link to="polls">polls</Link>
                <p>add location tag</p>
                <p>bar for text length warning</p>
                <p>make thread</p>
            </form>
        </>
    )
}

export default CreatePost;