import { useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";

// This component orders posts, retweets and 
// comments for display
function ListPosts() {
    const posts = useSelector(state => state.posts);
    const apiHost = useSelector(state => state.apiHost);
    
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
    
    return posts.map(post => {
        // Only show first post in threads
        if (post.thread) return null;
        
        return (
            <li 
                key={post.id + Math.random()}
                className="section" >
                <Link to={generatePath("/post/:id", {id: post.id})}>
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
                        
                        { post.media ? (
                            <p className="media">
                                <embed src={apiHost + post.media} />
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
    });
}

export default ListPosts;