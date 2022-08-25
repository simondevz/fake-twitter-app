import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { updatePosts } from "../actions"

function ListPosts({posts, updatePosts}) {
    // Get posts from api onload
    useEffect(() => {
        async function fetchPosts() {
            const { data } = await axios.get("https://dummyjson.com/posts");
            updatePosts(data.posts);
        }
        fetchPosts();
    }, [updatePosts]);
    
    // Map data to a proper format for display
    function List() {
        const list = posts.map(post => {
            return (
                <li key={post.id} className="row" >
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content" >
                                {//<span></span>for profile picture
                                //<span></span>for users name
                                //<span><a></a></span>for username and link to profile
                                //<span></span>time since posts
                                }
                                <span>{post.title}</span>
                                <p>{post.body}</p>
                            </div>
                            {/*<div class="card-action">
                              <a href="#">Like</a>
                              <a href="#"></a>
                              <a href="#">Comment</a>
                            </div>*/}
                        </div>
                    </div>
                </li>
            )
        });
        return list;
    }
    
    return (
        <ul>
            <List />
        </ul>
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