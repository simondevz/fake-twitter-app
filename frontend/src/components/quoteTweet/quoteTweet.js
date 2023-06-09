import PostMedia from "../postMedia/postMedia";
import useUrl from "../hooks/useUrl";
import { getTime } from "../utils";
import "./quoteTweet.sass";

function QuoteTweet({ post }) {
  const url = useUrl();

  return (
    <div className="quote_tweet">
      <span className="profile_picture">
        <img src={url(post.userId.profile_picture)} alt="Profile" />

        <span className="card-title">
          <span>{post.userId.name}</span>@{post.userId.username}
          <span>{getTime(post)}</span>
        </span>
      </span>

      {post.text ? <p className="text">{post.text}</p> : null}

      {post?.media?.[0] ? (
        <p className="media">
          <PostMedia mediaArr={post.media} />
        </p>
      ) : null}
    </div>
  );
}

export default QuoteTweet;
