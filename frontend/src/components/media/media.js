import { Gif } from '@giphy/react-components';

function Media({ media }) {
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