import axios from 'axios';
import {useEffect} from 'react';
import { connect } from 'react-redux';


function App({posts, updatePosts}) {
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://dummyjson.com/posts');
            console.log('My response');
            console.log(res);
            updatePosts(res.data.posts);
        }
        fetchData();
    }, [updatePosts]);
    
    function ListPosts() {
        if (!posts[0]) {
            return (
                <li> No posts yet...</li>
            )
        }
        
        const list = posts.map(post => {
            return (
                <li key={post.id}>
                    <div>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                    </div>
                </li>
            )
        });
        return list
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

function mapStateToProps(state) {
    return {
        posts: state.posts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePosts: (posts) => {
            console.log('UPDATE_POSTS');
            console.log(posts);
            return dispatch({type: 'UPDATE_POSTS', payload: posts})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);