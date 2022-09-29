// TODO: Implement lazy loading
import { 
    BrowserRouter, 
    Routes, 
    Route
} from "react-router-dom";

import RouteGuard from "./routeGuard";
import ListPosts from "./listPosts";
import Post from "./post";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route element={<RouteGuard />} >
                    <Route index element={<ListPosts />} />
                    <Route path="posts" element={<ListPosts />} >
                        <Route path=":postID" element={<Post />} />
                    </Route>
                    <Route path=":userID" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;