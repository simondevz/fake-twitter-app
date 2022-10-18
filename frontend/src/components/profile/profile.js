import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { 
    useLayoutEffect,
    useEffect,
    useState, 
    useRef,
} from "react";

import { updateUserPosts } from "../../actions"
import ListPosts from "../listPosts/listPosts";
import Loading from "../loading/loading";
import useFetch from "../hooks/fetch";
import useToken from "../hooks/token";
import useUrl from "../hooks/useUrl";
import "./profile.sass";

function Profile() {
    const [ isOwner, setIsOwner ] = useState(false);
    const user = useSelector(state => state.user);
    const user_posts = useSelector(state => state.user_posts);
    const dispatch = useDispatch();
    
    const getToken = useToken();
    const fetch = useFetch();
    const url = useUrl();
    
    const location = useLocation();
    const [owner, setOwner] = useState(location.state);
    
    // To stop infinite re-rendering
    const fetchRef = useRef(fetch);
    const getTokenRef = useRef(getToken);
    const userRef = useRef(user);
    const ownerRef = useRef(owner);
    
    // force update to the refs
    useLayoutEffect(() => {
        fetchRef.current = fetch;
        getTokenRef.current = getToken;
        userRef.current = user;
        ownerRef.current = owner;
    }, [fetch, getToken, user, owner]);
    
    console.log(user, location, isOwner);
    
    useEffect(() => {
        // Get user's posts
        const fetchPost = async () => {
            // Check for owner, if none get one
            let data;
            if (!ownerRef.current) {
                data = await fetchRef.current(`/users${location.pathname}/`);
                setOwner(owner => data.data);
            }
            
            const id = ownerRef.current ? ownerRef.current.id : data?.data.id;
            const response = await fetchRef.current(`/users/${id}/posts/`);
            dispatch(updateUserPosts(response.data));
            
            // if there isn't already a user object in store
            // run getToken to put one there and
            // then find out if current user is also the profile's owner
            if (!userRef.current) await getTokenRef.current();
            if (userRef.current?.username === ownerRef.current.username) {
                setIsOwner(isOwner => true);
            } else {
                setIsOwner(isOwner => false);
            }
        }
        fetchPost();
        
        // return clean up function to remove posts from store
        return () => dispatch(updateUserPosts([]))
    }, [fetchRef, getTokenRef, ownerRef, location.pathname, userRef, dispatch])
    
    return (
        <>
            { owner ? (
                <><nav>
                </nav>
                <div>
                    <span>
                        <img 
                            src={url(owner.cover_photo)} 
                            alt="cover" />
                    </span>
                    
                    <span>
                        <img
                            src={url(owner.profile_picture)}
                            alt="Profile" />
                    </span>
                    
                    { isOwner ? (
                        <button>Edit Profile</button>
                    ) : null }
                    
                    <span>{owner.name}</span>
                    <span>@{owner.username}</span>
                    
                    { owner.bio ? (
                        <p>{owner.bio}</p>
                    ) : null }
                    
                    { owner.date_of_birth ? (
                        <span>{owner.date_of_birth}</span>
                    ) : null }
                    <span>{owner.date_joined}</span>
                </div>
                <ListPosts posts={user_posts} /></>
            ) : (<Loading />) }
        </>
    )
}

export default Profile