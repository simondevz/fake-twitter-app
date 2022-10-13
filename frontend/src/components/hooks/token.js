import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { updateUser } from "../../actions";

function useToken() {
    const apiHost = useSelector(state => state.apiHost);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function getToken() {
        /*
        This function returns a new access token and 
        its expiration date.
        It also saves the new refresh token to the browsers
        cookie
        And decodes the token and saves user data
        */
        const cookie = new Cookies();
        const refresh_token = cookie.get('refresh_token');
        
        try {
            const url = "http://localhost:8000/api/auth/token/refresh/";
            const data = { refresh: refresh_token };
            const response = await axios.post(url, data);
            
            console.log("response", response);
            cookie.set('refresh_token', response.data.refresh, {
                path: '/',
                secure: false,
                sameSite: false,
            });
            
            // decode token and update user
            const token = response.data.access;
            const decoded = jwt_decode(token);
            
            // Complete the user's profile and cover photo url
            const user = decoded.user;
            user.profile_picture = apiHost + user.profile_picture;
            user.cover_photo = apiHost + user.cover_photo;
            
            // update user
            dispatch(updateUser(decoded.user));
            return token;
            
        } catch (e) {
            // Go back login if token not valid
            if (e?.response?.status === 401 || e?.response?.data?.code === "token_not_valid") {
                // TODO: add an error message to pass back
                navigate("/login/");
            }
        }
        
    }
    return getToken
}
export default useToken