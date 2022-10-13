// TODO: Implement lazy loading
// TODO: Replace Link with Navlink
import { 
    BrowserRouter, 
    Routes, 
    Route
} from "react-router-dom";
import { useSelector } from "react-redux";

import RouteGuard from "./routeGuard/routeGuard";
import Home from "./home/home";
import Post from "./post/post";
import Signup from "./signup/signup";
import Login from "./login/login";
import Profile from "./profile/profile";
import CreatePost from "./createpost/createpost";
import ListPosts from "./listPosts/listPosts";
import Gifs from "./gifs/gifs";
import Media from "./media/media";
import PollsForm from "./pollsForm/pollsForm";

function App() {
    const postForm = useSelector(state => state.postForm);
    const comments = useSelector(state => state.comments);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route element={<RouteGuard />} >
                    <Route index element={<Home />} />
                    <Route path="posts" element={<Home />} />
                    <Route path="post/:postID" element={<Post />} >
                        <Route index element={<ListPosts posts={comments} />} />
                        <Route path="comment" element={<CreatePost />} >
                            <Route index element={<Media media={postForm.media} />} />
                        </Route>
                    </Route>
                    <Route path="createpost" element={<CreatePost />} >
                        <Route index element={<Media media={postForm.media} />} />
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