import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { updatePosts } from "../actions"
import Navbar from "./navbar"
import Footer from "./footer"

function ListPosts({posts, updatePosts}) {
    // Get posts from api onload
    useEffect(() => {
        async function fetchPosts() {
            try {
                const { data } = await axios.get("https://dummyjson.com/posts");
                updatePosts(data.posts);
            } catch (e) {
                let error;
                if (e.response.status === 404) {
                    error = {
                        id: "error",
                        message: e.message,
                        description: "Page not Found",
                        status: 404,
                    }
                }
                updatePosts(error);
            }
        }
        fetchPosts();
    }, [updatePosts]);
    
    // Map data to a proper format for display
    function List() {
        // If there was an error
        if (posts.id === "error") {
            return (
                <div style={{
                    height: "100vh",
                }}
                className="container">
                    <h3>{posts.message}</h3>
                    <h6>{posts.description}</h6>
                </div>
            )
        }
        
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
            return (
                <li key={post.id + Math.random()} className="section" >
                    <Link to={generatePath("/post/:id", {id: post.id})}>
                        <div className="container" >
                            {//<span></span>for profile picture
                            //<span></span>for users name
                            //<span><a></a></span>for username and link to profile
                            //<span></span>time since posts
                            }
                            <span className="card-title">{post.title}</span>
                            <p>{post.body}</p>
                        </div>
                        <div className="divider"></div>
                    </Link>
                </li>
            )
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

// Adds posts to my props for ListPosts
function mapStateToProps(state) {
    return {
        posts: state.posts,
    }
}

// Adds a funtion to use in updating props.posts to props
function mapDispatchToProps(dispatch) {
    return {
        updatePosts: payload => { dispatch(updatePosts(payload)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListPosts);