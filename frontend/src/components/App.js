import axios from 'axios';
import {useState, useEffect} from 'react';


function App() {
    const [state, setState] = useState({
        posts: null,
    })
    
    useEffect(() => {
        
    }, []);
    
    function ListPosts() {
        const {posts} = state;
        if (!posts) {
            return (
                <li> No posts yet...</li>
            )
        }
        
        const list = posts.map(post => {
            return (
                <li key={post.id}>
                    <div>
                    <span>{post.id
                    </div>
                </li>
            )
        })
    }
    
    return (
        <>
            <h1>Twitter Clone</h1>
            <ul>
                <ListPosts />
            </ul>
        </>
    )
}

export default App;