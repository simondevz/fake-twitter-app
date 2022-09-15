import { useLocation } from "react-router-dom";

function Profile() {
    const location = useLocation();
    console.log(location);
    
    return (
        <>
            <h1>{location.state.username}</h1>
        </>
    )
}

export default Profile