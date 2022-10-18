import { useSelector, useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useRef } from "react";
import { updateThread } from "../../actions";
import useFetch from "../hooks/fetch";
import "./thread.sass";

function Thread({postId}) {
    const thread = useSelector(state => state.thread);
    const dispatch = useDispatch();
    const fetch = useFetch();
    const fetchRef = useRef(fetch);
    
    useLayoutEffect(() => {
        fetchRef.current = fetch;
    }, [fetch])
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetchRef.current(`posts/${postId}/thread/`)
            dispatch(updateThread(response.data));
        }
        fetchPosts();
        return () => dispatch(updateThread([]));
    }, [postId, dispatch, fetchRef])
    
    return thread.map(post => {
        return (
            <>
                <p>
                    {post.text}
                </p>
            </>
    )
    }) 
}

export default Thread