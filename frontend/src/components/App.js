// TODO: Implement lazy loading
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListPosts from "./listPosts";
import Post from "./post";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import Footer from "./footer";

function App() {
    return (
        <>
            <Navbar />
            <SideBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListPosts />} />
                    <Route path="/post" element={<Post />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    )
}

export default App;