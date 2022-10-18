import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./gifs.sass";

function Gifs() {
    const webSDK = useSelector(state => state.webSDK);
    const navigate = useNavigate();
    const gf = new GiphyFetch(webSDK);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Show trending gifs when searchTerm is empty
    const fetchGifs = searchTerm === "" ? (
        (offset: number) => gf.trending({ offset, limit: 25 })
    ) : (
        (offset: number) => gf.search(searchTerm, { offset, limit: 25 })
    );
    
    function onGifClick(event) {
        navigate("/createpost/", {
            state: {gif: event.id},
        });
    }
    
    return (
        <>
            <form onSubmit={event => event.preventDefault()}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={ event => setSearchTerm(event.target.value) }
                />
            </form>
            <Grid 
                width={350} 
                columns={2}
                fetchGifs={fetchGifs} 
                key={searchTerm} 
                noLink={true}
                onGifClick={onGifClick}
            />
        </>
    )
}

export default Gifs;