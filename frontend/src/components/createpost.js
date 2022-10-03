import {  useSelector, useDispatch } from "react-redux";
import useFetch from "./fetch";
import { updatePostForm } from "../actions";

function CreatePost() {
    const postForm = useSelector(state => state.postForm);
    const dispatch = useDispatch();
    const fetch = useFetch();
    
    async function handleSubmit() {
        const response = await fetch();
    }
    
    // Updates form on change
    function handleChange(event, key) {
        dispatch(updatePostForm({
            ...postForm,
            [key]: event.target.value,
        }));
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <button>draft</button>
                <button>tweet</button>
                <textarea 
                    placeholder="What's happening"
                    value={postForm.text}
                    onChange={ 
                        event => handleChange(event, "text")
                    }
                />
                <input 
                    type="hidden"
                    value={ new Date(Date.now()).toISOString() }
                />
                <input 
                    value={postForm.media}
                />
                <input
                    type="file"
                    value={postForm.media}
                    onChange={ 
                        event => handleChange(event, "media")
                    }
                />
                <p>who can reply</p>
                <p>gif</p>
                <p>polls</p>
                <p>add location tag</p>
                <p>bar for text length warning</p>
                <p>make thread</p>
            </form>
            { postForm.media ? (
                <embed src={postForm.media} />
            ) : null }
        </>
    )
}

export default CreatePost;