import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function useToken() {
    const navigate = useNavigate();
    
    async function getToken() {
        /*
        This function returns a new access token and 
        its expiration date.
        It also saves the new refresh token to the browsers
        cookie
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
            
            return response.data.access;
            
        } catch (e) {
            // Go back login if token not valid
            if (e.response.status === 401 || e.response.data.code === "token_not_valid") {
                // TODO: add an error message to pass back
                navigate("/login/");
            }
        }
        
    }
    return getToken
}
export default useToken