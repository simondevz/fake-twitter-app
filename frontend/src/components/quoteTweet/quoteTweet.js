import { useSelector } from "react-redux";
import PostMedia from "../postMedia/postMedia";

function QuoteTweet({ post }) {
    const apiHost = useSelector(state => state.apiHost);
    
    return (
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
            
            { post?.media?.[0] ? (
                <p className="media">
                    <PostMedia mediaArr={post.media} />
                </p>
            ) : null }
            
        </div>
    )
}

export default QuoteTweet;