import { useNavigate, NavLink } from "react-router-dom";
import useUrl from "../hooks/useUrl";
import PostMedia from "../postMedia/postMedia";
import QuoteTweet from "../quoteTweet/quoteTweet";
import CommentLogo from "../../icons/comment_logo";
import RetweetLogo from "../../icons/retweet_logo";
import LikeLogo from "../../icons/like_logo";
import "./listPosts.sass";

// This component orders posts, retweets and
// comments for display
function ListPosts({ posts }) {
    const navigate = useNavigate();
    const url = useUrl();

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
        <ul className="listPosts">
            {posts.map((post) => {
                // Only show first post in threads
                if (post.thread) return null;

                // Get how long it's been since it was date_posted
                function getTime() {
                    const time_posted = new Date(
                        `${post.date_posted} ${post.time_posted}`
                    );
                    let duration = Date.now() - time_posted;
                    console.log(duration);

                    const day = 86400000;
                    const hour = 3600000;
                    const min = 60000;
                    const sec = 1000;

                    if (duration > day * 10) {
                        const months = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                        ];
                        const num = time_posted.getMonth();
                        console.log(num);
                        console.log(time_posted.toString());

                        return `${time_posted.getDate()} ${months[num]}`;
                    }

                    if (duration >= day) {
                        return Math.round(duration / day) + "d";
                    }

                    if (duration >= hour) {
                        return Math.round(duration / hour) + "h";
                    }

                    if (duration >= min) {
                        return Math.round(duration / min) + "m";
                    }

                    if (duration >= sec) {
                        return Math.round(duration / sec) + "s";
                    }
                    return "0s";
                }

                return (
                    <li key={post.id + Math.random()} className="section">
                        <div
                            className="container"
                            onClick={() => {
                                navigate(`/post/${post.id}`, { state: post });
                            }}
                        >
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

                            <span className="post_details">
                                <span className="user">
                                    <span className="name">
                                        {post.userId.name}
                                    </span>
                                    <span className="username">
                                        {" "}
                                        @{post.userId.username}
                                    </span>
                                    <span className="time"> • {getTime()}</span>
                                </span>

                                {post.text && (
                                    <p className="text">{post.text}</p>
                                )}
                                {post.media?.[0] && (
                                    <PostMedia
                                        mediaArr={post.media}
                                        width={15}
                                        height={15}
                                    />
                                )}

                                {post.quoteId?.id && (
                                    <QuoteTweet post={post.quoteId} />
                                )}
                                <div className="divider">
                                    <CommentLogo className="comment_logo" />
                                    <RetweetLogo className="retweet_logo" />
                                    <LikeLogo className="like_logo" />
                                </div>
                                {post.threadHead && (
                                    <span className="show_thread">
                                        show thread
                                    </span>
                                )}
                            </span>
                        </div>
                    </li>
                );
            })}
            <NavLink to="/createpost/" className="createpostLink" />
            <span style={{ display: "block", height: "3.3rem" }} />
        </ul>
    );
}

export default ListPosts;
