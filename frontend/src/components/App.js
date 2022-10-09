// TODO: Implement lazy loading
// TODO: Replace Link with Navlink
import { 
    BrowserRouter, 
    Routes, 
    Route
} from "react-router-dom";

import RouteGuard from "./routeGuard";
import Home from "./home";
import Post from "./post";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";
import CreatePost from "./createpost";
import Gifs from "./gifs";
import Form from "./form";
import PollsForm from "./pollsForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route element={<RouteGuard />} >
                    <Route index element={<Home />} />
                    <Route path="posts" element={<Home />} >
                        <Route path=":postID" element={<Post />} />
                    </Route>
                    <Route path="createpost" element={<CreatePost />} >
                        <Route index element={<Form />} />
                        <Route path="form" element={<Form />} />
                        <Route path="polls" element={<PollsForm />} />
                    </Route>
                    <Route path="gifs" element={<Gifs />} />
                    <Route path=":username" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;