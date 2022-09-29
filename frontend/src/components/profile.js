import { useLocation, Link } from "react-router-dom";

function Profile() {
    const location = useLocation();
    console.log(location);
    
    return (
        <>
            <h1>{location.state.username}</h1>
            <Link to="../posts">posts</Link>
        </>
    )
}

export default Profile