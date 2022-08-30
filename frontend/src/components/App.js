import {useEffect} from "react";

import ListPosts from "./listPosts";
import Navbar from "./navbar";

function App() {
    useEffect(() => {
        console.log('rendered')
    })
    
    return (
        <>
            <Navbar />
            <ListPosts />
        </>
    )
}

export default App;