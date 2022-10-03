import { useDispatch } from "react-redux";
import { 
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";

import { updatePosts } from "../actions"
import Navbar from "./navbar"
import Footer from "./footer"
import useFetch from "./fetch"
import ListPosts from "./listPosts"

function Home() {
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
        return () => dispatch(updatePosts([]))
    }, [fetchRef, dispatch]);
    
    return (
        <>
            <Navbar />
            <ul className="container" >
                <ListPosts />
            </ul>
            <Footer />
        </>
    );
}

export default Home;