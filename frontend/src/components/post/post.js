import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

import PostMedia from "../postMedia/postMedia";
import useFetch from "../hooks/fetch";
import Retweet from "../retweet/retweet";
import Thread from "../thread/thread";
import Navbar from "../navbar/navbar";
import "./post.sass";

import { getTime } from "../utils";
import {
  updateComments,
  updateCount,
  updateCreatePostInfo,
} from "../../actions";

function Post() {
  const apiHost = useSelector((state) => state.apiHost);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
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
      const response = await fetchRef.current(`comments/${post.id}/`);
      dispatch(updateComments(response.data));
      dispatch(
        updateCount({
          ...countRef.current,
          comments: response.data.length,
        })
      );
    };
    fetchPosts();
  }, [post.id, dispatch, countRef, fetchRef]);

  return (
    <>
      <Navbar />
      <div className="posts">
        <span className="profile_pic">
          <img src={apiHost + post.userId.profile_picture} alt="Profile" />

          <span className="card-title">
            <span className="name">{post.userId.name}</span>
            <span className="username">@{post.userId.username}</span>
          </span>
        </span>

        {post.text ? <p className="text">{post.text}</p> : null}

        {post.media[0] ? (
          <p className="media">
            <PostMedia mediaArr={post.media} />
          </p>
        ) : null}

        <span className="time_details">{getTime(post)}</span>
      </div>

      <div className="react_to_post">
        <p
          className="comment"
          onClick={() => {
            dispatch(
              updateCreatePostInfo({
                post_type: "comment",
                postId: post.id,
              })
            );
            navigate("comment", { state: post });
          }}
        >
          <bold>{count.comments}</bold> comment
        </p>
        <p className="retweet" onClick={() => setDisplay("block")}>
          <bold>{count.retweets}</bold> retweet
        </p>
        <p className="like">like</p>
      </div>
      <div className="divider" />

      {post.threadHead && <Thread postId={post.id} />}
      <Retweet display={display} post={post} />
      <Outlet />
    </>
  );
}

export default Post;
