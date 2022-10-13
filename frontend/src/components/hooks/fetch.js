import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useToken from "./token";
import { updateToken } from "../../actions";

function useFetch() {
    let access_token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getToken = useToken();
    
    async function fetch(url, method='get', config) {
        // Check if there is a token and header, if not get a token.
        if (!access_token && !config?.token) {
            access_token = await getToken();
            dispatch(updateToken(access_token));
        }
        
        // Default headers
        const token = config?.token || access_token;
        const data = config?.data || "";
        const headers = config?.headers || {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        }
        
        // Add a response interceptor
        const myInterceptor = axios.interceptors.response.use( response => {
            return response;
        }, async error => {
            error = error?.response;
            console.log("interceptors", error);
            
            // Check if error is due to being Unauthorized
            if (error?.status === 401) {
                // If the refresh token was declined send the person to login again
                if (error?.data?.messages[0]?.token_type !== "access") {
                    navigate('/login');
                    return
                }
                
                // if the access token was declined get a new one and try again
                const token = await getToken();
                dispatch(updateToken(token));
                console.log("intercepted");
                fetch(url, method, {
                    ...config,
                    token: token,
                });
                return
            }
            return Promise.reject(error);
        });
    
        try {
            const response = await axios({
                url: url,
                baseURL: 'http://localhost:8000/api',
                method: method,
                data: data ,
                headers: headers,
                timeout: 10000,
                onUploadProgress: progressEvent => { return },
                onDownloadProgress: progressEvent => { return },
                maxContentLength: 25000000,
            });
            
            console.log("fetch", response);
            axios.interceptors.response.eject(myInterceptor);
            return response
        } catch (e) {
            console.log("fetch", e);
            axios.interceptors.response.eject(myInterceptor);
        }
    }
    
    return fetch;
}

export default useFetch;