// TODO: Implement lazy loading
import { 
    BrowserRouter, 
    Routes, 
    Route
} from "react-router-dom";

import ListPosts from "./listPosts";
import Post from "./post";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/:userID" element={<Profile />} />
                <Route path="/" element={<ListPosts />} >
                    <Route path="/:postID" element={<Post />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;