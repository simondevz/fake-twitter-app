import { useSelector, useDispatch } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import { 
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";

import { updatePosts } from "../actions"
import Navbar from "./navbar"
import Footer from "./footer"
import useFetch from "./fetch"

function ListPosts() {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const fetch = useFetch();
    
    // Use useRef to store the refrence to the function
    // by doing this it stops the infinite re-render,
    const fetchRef = useRef(fetch);
    
    // but it does not update the function when it changes,
    // so, i used useLayoutEffect to force an update when ever it changes
    useLayoutEffect(() => {
        fetchRef.current = fetch;
    }, [fetch])
    
    useEffect(() => {
        // Get posts from api onload
        const fetchPosts = async () => {
            const data = await fetchRef.current("/posts/");
            console.log("data", data);
            dispatch(updatePosts(data.data));
        }
        fetchPosts();
    }, [fetchRef, dispatch]);
    
    // Map data to a proper format for display
    function List() {
        // If the data has not be retrieved yet
        if (!posts[0]) {
            return (
                <div style={{
                    height: "100vh",
                }}>
                    loading...
                </div>
            )
        }
        
        const list = posts.map(post => {
            // Only show first post in threads
            if (!post.thread) return (
                <li key={post.id + Math.random()} className="section" >
                    <Link to={generatePath("/post/:id", {id: post.id})}>
                        <div className="container" >
                            <span><img src={post.userId.profile_picture} alt="Profile" /></span>
                            <span className="card-title">
                                <span>{post.userId.name}</span>
                                @{post.userId.username}
                                <span>{post.date_posted } { post.time_posted}</span>
                            </span>
                            { post.text ? (
                                <p className="text">{post.text}</p>
                                ) : null }
                            { post.media ? (
                                <p className="media">
                                    <embed src={post.media} />
                                </p>
                                ) : null }
                            { post.threadHead ? (
                                <span>show thread</span>
                                ): null }
                        </div>
                        <div className="divider"></div>
                    </Link>
                </li>
            )
            
            return "";
        });
        return list;
    }
    
    return (
        <>
            <Navbar />
            <ul className="container" >
                <List />
            </ul>
            <Footer />
        </>
    );
}

export default ListPosts;