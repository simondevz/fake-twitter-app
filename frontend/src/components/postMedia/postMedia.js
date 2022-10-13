import { useSelector } from "react-redux";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';

function PostMedia({ mediaArr }) {
    const webSDK = useSelector(state => state.webSDK);
    const apiHost = useSelector(state => state.apiHost);
    const mediaArrRef = useRef(mediaArr);
    const [state, setState] = useState({
        media: [],
    })
    
    useLayoutEffect(() => {
        mediaArrRef.current = mediaArr;
    }, [mediaArr])
    
    
    useEffect(() => {
        // Loop through the array and get gifs using their id
        // put them in an array along with any other media data already there
        // and set to state.
        async function showGif() {
            let return_arr = [];
            for (let media of mediaArrRef.current) {
                if (media.media) {
                    return_arr = [...return_arr, media];
                    continue;
                }
                
                const gf = new GiphyFetch(webSDK);
                let { data } = await gf.gif(media.gif);
                return_arr = [...return_arr, {gif: data}];
            }
            
            setState(state => {
                return {
                    ...state,
                    media: return_arr,
                }
            })
        }
        showGif();
    }, [webSDK, mediaArrRef])
    
    // returns this when state is updated with the array
    return state.media.map(media => {
        if (media.gif) {
            return (
                <Gif 
                    key={media.gif.id + Math.random()}
                    gif={media.gif}
                    width={200}
                />
            )
        }
        
        return (
            <embed 
                key={media.id + Math.random()}
                src={apiHost + media.media} 
            />
        )
    });
}

export default PostMedia