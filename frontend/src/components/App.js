import { connect } from 'react-redux';

import ListPosts from "./listPosts";
import Navbar from "./navbar";

function App({posts, updatePosts}) {
    
    return (
        <>
            <Navbar />
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