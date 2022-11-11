import {  useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { GiphyFetch } from '@giphy/js-fetch-api';

import "./createpost.sass";
import useFetch from "../hooks/fetch";
import useToken from "../hooks/token";
import useUser from "../hooks/useUser";
import useUrl from "../hooks/useUrl";
import AddPhotoLogo from "../../icons/add_photo_logo";
import AddGifLogo from "../../icons/add_gif_logo";
import AddThreadLogo from "../../icons/add_thread";
import LocationLogo from "../../icons/location_logo";
import PollsLogo from "../../icons/polls_logo";
import QuoteTweet from "../quoteTweet/quoteTweet";
import WhoCanReply from "../whoCanReply/whoCanReply";
import { updatePostForm, updatePostsToSend, updateCount } from "../../actions";

function CreatePost() {
    const { post_type, postId, commentId, quoteId, comment_quoteId } = useSelector(state => state.createPost_info);
    const postsToSend = useSelector(state => state.postsToSend);
    const postForm = useSelector(state => state.postForm);
    const count = useSelector(state => state.count);
    
    let user = useSelector(state => state.user);
    const url = useUrl();
    const getUser = useUser();
    const userRef = useRef(user);
    const getUserRef = useRef(getUser);
    const addPhotoRef = useRef(null);
    
    const webSDK = useSelector(state => state.webSDK);
    let token = useSelector(state => state.token);
    const getToken = useToken();
    const dispatch = useDispatch();
    const fetch = useFetch();
    
    const location = useLocation();
    const postFormRef = useRef(postForm);
    const locationStateRef = useRef(location.state);
    const textareaRef = useRef(null);
    const [state, setState] = useState({
        PBstyle: {
            backgroundImage: "linear-gradient(90deg, #8799A5 100%, transparent 0%)",
        },
        PBcount: null,
    });
    
    useLayoutEffect(() => {
        postFormRef.current = postForm;
        locationStateRef.current = location.state;
        userRef.current = user;
        getUserRef.current = getUser;
    }, [postForm, location.state, user, getUser]);
    
    useEffect(() => {
        async function checkUser() {
            if (!userRef.current) {
                await getUserRef.current();
            }
        }
        checkUser();
    }, [userRef, getUserRef]);
    
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
            user = await getUser;
            user_id = user.id;
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
    
    // Dealing with Textarea Height
    function handleTextarea(event) {
        // Update postForm
        handleChange(event, "text");
        event.target.style.height = event.target.scrollHeight + "px";
        updateProgress(event.target.value.length);
    }
    
    // Update the progress bar to show when text exceeds limit
    function updateProgress(len) {
        const progress = len/300 * 100;
        
        // The whole bar should be red if progress is 100%
        if (progress >= 100) {
            setState({
                ...state,
                PBstyle: {
                    backgroundImage: "linear-gradient(90deg, red 100%, transparent 0%)",
                },
                PBcount: 300 - len,
            })
            return
        }
        
        // When it reaches 92% change color to red and show numbers
        if (progress >= 92) {
            setState({
                ...state,
                PBstyle: {
                    backgroundImage: `linear-gradient(90deg, transparent 50%, red 50%), linear-gradient(${(360*progress/100) - 90}deg, #8799A5 50%, red 50%)`,
                },
                PBcount: 300 - len,
            })
            return
        }
        
        // When it reaches 75% change color to yellow
        if (progress >= 75) {
            setState({
                ...state,
                PBstyle: {
                    backgroundImage: `linear-gradient(90deg, transparent 50%, yellow 50%), linear-gradient(${(360*progress/100) - 90}deg, #8799A5 50%, yellow 50%)`,
                },
                PBcount: null,
            })
            return
        }
        
        // When it reaches half get the other half to start changing color instead
        if (progress >= 50) {
            setState({
                ...state,
                PBstyle: {
                    backgroundImage: `linear-gradient(90deg, transparent 50%, #1D9AF0 50%), linear-gradient(${(360*progress/100) - 90}deg, #8799A5 50%, #1D9AF0 50%)`,
                },
                PBcount: null,
            })
            return
        }
        
        // The bar should turn blue when progress reaches 1%
        setState({
            ...state,
            PBstyle: {
                backgroundImage: `linear-gradient(${(360*progress/100) + 90}deg, transparent 50%, #8799A5 50%), linear-gradient(90deg, #8799A5 50%, #1D9AF0 50%)`,
            },
            PBcount: null,
        })
        return
    }
    
    return (
        <form className="createpost" onSubmit={handleSubmit}>
            
            <fieldset className="form_navbar" >
                <NavLink to={-1} className="back">x</NavLink>
                { post_type === "tweet" && <button className="draft" >Draft</button> }
                <button className="tweet" >{ post_type === "tweet" ? "Tweet" : "Reply" }</button>
            </fieldset>
            
            <fieldset className="container" >
                <fieldset className="user_info" >
                    <span 
                        className="profile_pic"
                        style={{backgroundImage: `url(${url(user?.profile_picture)})`}}
                    />
                </fieldset>
                
                <fieldset className="form_data" >
                    <button className="filter_views">Public &#x25BC;</button>
                    <textarea 
                        className="textarea"
                        ref={textareaRef}
                        autoFocus
                        placeholder={
                            location.pathname === "/createpost/polls" ? (
                                "Ask a question"
                            ) : (
                                "What's happening?"
                            )
                        }
                        value={postForm.text}
                        onChange={handleTextarea}
                    />
                    
                    <Outlet />
                    { location.state?.post && <QuoteTweet post={location.state.post} />}
                </fieldset>
            </fieldset>
            
            <div className="form_footer_div">
                <WhoCanReply />
                <fieldset className="form_footer" >
                    <div className="container1">
                        <span 
                            className="add_photo_span"
                            onClick={() => addPhotoRef.current.click()}
                        >
                            <input
                                type="file"
                                multiple
                                ref={addPhotoRef}
                                onChange={ 
                                    event => {
                                        const files = event.target.files;
                                        if (files.length > 3) {
                                            alert("Only 4 files allowed")
                                            return
                                        }
                                        
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
                            <AddPhotoLogo
                                className="add_photo_logo"
                            />
                        </span>
                        
                        <NavLink className="logo_cover" to="/gifs">
                            <AddGifLogo className="add_gif_logo" />
                        </NavLink>
                        <NavLink className="logo_cover" to="polls">
                            <PollsLogo className="polls_logo" />
                        </NavLink>
                        
                        <span className="logo_cover">
                            <LocationLogo className="location_logo" />
                        </span>
                    </div>
                    
                    <div className="container2">
                        <span 
                            style={state.PBstyle}
                            className="progress_bar"
                        >
                            <span className="progress">{state.PBcount !== null ? state.PBcount : ""}</span>
                        </span>
                        <span className="line" />
                        <AddThreadLogo className="add_thread_logo" />
                    </div>
                </fieldset>
            </div>
        </form>
    )
}

export default CreatePost;