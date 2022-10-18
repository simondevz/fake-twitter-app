import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import useToken from "./token";
import { updateUser } from "../../actions";

// Returns getUser which can be used to get current user
function useUser() {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const getToken = useToken();
    
    async function getUser() {
        if (!user) {
            let token = await getToken();
            let decoded = jwt_decode(token);
            user = decoded.user;
            
            dispatch(updateUser(user));
            return user;
        }
    }
    return getUser
}

export default useUser;