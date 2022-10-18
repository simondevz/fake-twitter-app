import { useSelector } from "react-redux";

function useUrl() {
    const apiHost = useSelector(state => state.apiHost);
    
    // Adds the domain name to the url if it doesn't have
    function url(path) {
        if (!path) return "";
        
        const text = path.substring(0, apiHost.length);
        return apiHost === text ? path : apiHost + path;
    }
    
    return url
}

export default useUrl;