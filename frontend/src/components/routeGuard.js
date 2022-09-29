import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

function RouteGuard() {
    // Redirect to login page if there is no refresh token
    const cookie = new Cookies();
    const refresh_token = cookie.get("refresh_token");
    if (!refresh_token) return <Navigate to="/login" Replace />;
    
    // Redirect to login page if token is expired
    const decoded = jwt_decode(refresh_token);
    const expiration_date = decoded.exp*1000;
    if (expiration_date < Date.now() ) return <Navigate to="/login" Replace />;
    
    // Else redirect to the protected path
    return <Outlet />
}

export default RouteGuard;