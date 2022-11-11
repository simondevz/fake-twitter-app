import { Gif } from '@giphy/react-components';
import "./media.sass";

function Media({ media }) {
    console.log(media);
    function previewMedia(files) {
        const preview = files.map(file => {
            if (file.gif) {
                return (
                    <Gif 
                        key={Math.random()}
                        gif={file.gif}
                        width={200}
                    />
                )
            }
            
            if(file.media.type.includes("image")) {
                return (
                    <img 
                        alt="someone's post"
                        key={Number(file.media.lastModified) + Math.random()}
                        src={URL.createObjectURL(file.media)} 
                    />
                )
            }
            
            if(file.media.type.includes("video")) {
                return (
                    <video
                        alt="someone's post"
                        key={Number(file.media.lastModified) + Math.random()}
                        src={URL.createObjectURL(file.media)} 
                    />
                )
            }
            
            return (
                <embed 
                    key={Number(file.media.lastModified) + Math.random()}
                    src={URL.createObjectURL(file.media)} 
                />
            )
        })
        return preview
    }
    
    return (
        <p className="media">
            {media[0] && previewMedia(media)}
        </p>
    )
}

export default Media;