import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { updateCount, updateCreatePostInfo } from "../../actions";
import useToken from "../hooks/token";
import useFetch from "../hooks/fetch";
import "./retweet.sass";

function Retweet({ display, post }) {
  const user = useSelector((state) => state.user);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const getToken = useToken();
  const fetch = useFetch();

  async function handleRetweet() {
    // Get user's id
    let userId = user.id;
    if (!userId) {
      let token = await getToken();
      let decoded = jwt_decode(token);
      userId = decoded.user_id;
    }

    // Make the request
    const data = {
      userId: userId,
      postId: post.id,
    };
    const response = await fetch("retweet/", "post", { data });
    if (response.status === 201) {
      dispatch(
        updateCount({
          ...count,
          retweets: count.retweets + 1,
        })
      );
    }
  }

  function handleQuote() {
    dispatch(
      updateCreatePostInfo({
        post_type: "tweet",
        quoteId: post.id,
      })
    );
    navigate("/createpost/", {
      state: {
        post: post,
      },
    });
  }

  return (
    <div
      className="retweetBox"
      style={{
        height: "4rem",
        position: "fixed",
        bottom: "0",
        display: display,
      }}
    >
      <button onClick={handleRetweet}>Retweet</button>
      <button onClick={handleQuote}>Quote Tweet</button>
    </div>
  );
}

export default Retweet;
