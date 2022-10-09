import { useSelector } from "react-redux";
import { Gif } from '@giphy/react-components';

function Form() {
    const postForm = useSelector(state => state.postForm);
    
    function previewMedia(files) {
        const preview = files.map(file => {
            return (
                <embed 
                    key={Number(file.lastModified) + Math.random()}
                    src={URL.createObjectURL(file)} 
                />
            )
        })
        return preview
    }
    
    return (
        <fieldset>
            {postForm.media[0] && previewMedia(postForm.media)}
            {postForm.gif && <Gif gif={postForm.gif} width={200}/>}
        </fieldset>
    )
}

export default Form;