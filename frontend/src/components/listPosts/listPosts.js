import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import useUrl from "../hooks/useUrl";
import PostMedia from "../postMedia/postMedia";
import QuoteTweet from "../quoteTweet/quoteTweet";
import CommentLogo from "../../icons/comment_logo";
import RetweetLogo from "../../icons/retweet_logo";
import LikeLogo from "../../icons/like_logo";
import Retweet from "../retweet/retweet";
import { getTime } from "../utils";
import "./listPosts.sass";

// This component orders posts, retweets and
// comments for display
function ListPosts({ posts }) {
  const navigate = useNavigate();
  const url = useUrl();
  const [retweetBoxState, setRetweetBoxState] = useState({
    display: "none",
    post: null,
  });

  // If the data has not be retrieved yet
  if (!posts?.[0]) {
    return (
      <div
        style={{
          height: "100vh",
        }}
      >
        loading...
      </div>
    );
  }

  return (
    <>
      <ul className="listPosts">
        {posts.map((post) => {
          // Only show first post in threads
          if (post.thread) return null;

          return (
            <li key={post.id + Math.random()} className="section">
              <div className="container">
                <span className="profile_section">
                  <span
                    className="profile_pic"
                    style={{
                      backgroundImage: `url(${url(
                        post.userId.profile_picture
                      )})`,
                    }}
                  />

                  {post.threadHead && (
                    <>
                      <span className="thread_line" />
                      <span
                        className="thread_profile_pic"
                        style={{
                          backgroundImage: `url(${url(
                            post.userId.profile_picture
                          )})`,
                        }}
                      />
                    </>
                  )}
                </span>
                <div className="tweet_content_section">
                  <span
                    onClick={() => {
                      navigate(`/post/${post.id}`, { state: post });
                    }}
                    className="post_details"
                  >
                    <span className="user">
                      <span className="name">{post.userId.name}</span>
                      <span className="username"> @{post.userId.username}</span>
                      <span className="time"> • {getTime(post)}</span>
                    </span>

                    {post.text && <p className="text">{post.text}</p>}
                    {post.media?.[0] && (
                      <PostMedia mediaArr={post.media} width={15} height={15} />
                    )}

                    {post.quoteId?.id && <QuoteTweet post={post.quoteId} />}
                  </span>

                  <div className="divider">
                    <CommentLogo className="comment_logo" />
                    <RetweetLogo
                      onClick={() =>
                        setRetweetBoxState({
                          ...retweetBoxState,
                          display: "block",
                          post: post,
                        })
                      }
                      className="retweet_logo"
                    />
                    <LikeLogo className="like_logo" />
                  </div>

                  {post.threadHead && (
                    <span className="show_thread">show thread</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
        <NavLink to="/createpost/" className="createpostLink" />
        <span style={{ display: "block", height: "3.3rem" }} />
      </ul>
      <Retweet display={retweetBoxState.display} post={retweetBoxState.post} />
    </>
  );
}

export default ListPosts;
