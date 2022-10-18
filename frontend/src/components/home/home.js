import { useSelector, useDispatch } from "react-redux";
import { 
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";

import "./home.sass";
import { updatePosts } from "../../actions"
import Navbar from "../navbar/navbar"
import Footer from "../footer/footer"
import useFetch from "../hooks/fetch"
import ListPosts from "../listPosts/listPosts"

function Home() {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const fetch = useFetch();
    
    // Use useRef to store the refrence to the function
    // by doing this it stops the infinite re-render,
    const fetchRef = useRef(fetch);
    
    // but it does not update the function when it changes,
    // so, i used useLayoutEffect to force an update when ever it changes
    useLayoutEffect(() => {
        fetchRef.current = fetch;
    }, [fetch])
    
    useEffect(() => {
        // Get posts from api onload
        const fetchPosts = async () => {
            const data = await fetchRef.current("/posts/");
            dispatch(updatePosts(data.data));
        }
        fetchPosts();
    }, [fetchRef, dispatch]);
    
    return (
        <>
            <Navbar />
            <ListPosts posts={posts} />
            <Footer />
        </>
    );
}

export default Home;