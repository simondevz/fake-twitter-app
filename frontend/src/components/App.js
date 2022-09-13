// TODO: Implement lazy loading
import { 
    BrowserRouter, 
    Routes, 
    Route
} from "react-router-dom";

import ListPosts from "./listPosts";
import Post from "./post";
import Signup from "./signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ListPosts />} >
                    <Route path="/:postID" element={<Post />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;