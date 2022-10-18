import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import PostMedia from "../postMedia/postMedia";
import { updateComments, updateCount, updateCreatePostInfo } from "../../actions";
import useFetch from "../hooks/fetch";
import Retweet from "../retweet/retweet";
import Thread from "../thread/thread";
import "./post.sass";

function Post() {
    const apiHost = useSelector(state => state.apiHost);
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const location = useLocation()
    const fetch = useFetch();
    
    const fetchRef = useRef(fetch);
    const countRef = useRef(count);
    const post = location.state;
    const [display, setDisplay] = useState("none");
    
    /*dispatch(updateCount({
        ...count,
        retweets: post.retweets,
    }));*/
    
    useLayoutEffect(() => {
        fetchRef.current = fetch;
        countRef.current = count;
    }, [fetch, count]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetchRef.current(`comments/${post.id}/`)
            dispatch(updateComments(response.data));
            dispatch(updateCount({
                ...countRef.current,
                comments: response.data.length,
            }));
        }
        fetchPosts();
    }, [post.id, dispatch, countRef, fetchRef])
    
    return(
        <>
            <div className="container" >
                <span>
                    <img 
                        src={apiHost + post.userId.profile_picture} 
                        alt="Profile" />
                </span>
                
                <span className="card-title">
                    <span>{post.userId.name}</span>
                    @{post.userId.username}
                    <span>{post.date_posted } { post.time_posted}</span>
                </span>
                
                { post.text ? (
                    <p className="text">{post.text}</p>
                ) : null }
                
                { post.media[0] ? (
                    <p className="media">
                        <PostMedia mediaArr={post.media} />
                    </p>
                ) : null }
                
            </div>
                <p 
                    onClick={() => {
                        dispatch(updateCreatePostInfo({
                            post_type: "comment",
                            postId: post.id,
                        }));
                        navigate("comment", {state: post})
                    }}
                >
                    comment {count.comments}
                </p>
                <p 
                    onClick={() => setDisplay("block")}
                >
                    retweet {count.retweets}
                </p>
                <p>like</p>
            <div className="divider"></div>
            
            <Retweet display={display} post={post} />
            { post.threadHead && <Thread postId={post.id} /> }
            <Outlet />
        </>
    )
}

export default Post;