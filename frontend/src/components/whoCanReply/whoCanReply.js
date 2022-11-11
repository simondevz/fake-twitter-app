import { useState, useRef, useLayoutEffect } from "react";

import "./whoCanReply.sass";
import EarthLogo from "../../icons/earth_logo";
import CheckedPersonLogo from "../../icons/checked_person_logo";
import AtLogo from "../../icons/at_logo";

function WhoCanReply() {
    // Options for who can reply
    const options = {
        everyone: {
            logo: <EarthLogo className="WhoCanReply_logo" />,
            text: "Everyone can reply",
        },
        following: {
            logo: <CheckedPersonLogo className="WhoCanReply_logo" />,
            text: "People you follow",
        },
        mentions: {
            logo: <AtLogo className="WhoCanReply_logo" />,
            text: "People you mentioned",
        }
    }
    
    // Local state, state.option is the currently picked option
    const [state, setState] = useState({
        display: false,
        option: options.everyone,
    });
    
    // A ref to keep track of current option between renders
    const currentOption = useRef(state.option);
    useLayoutEffect(() => { // Updates the ref when needed
        currentOption.current = state.option;
    }, [state.option])
    
    // Formats the options and returns it
    function ListOptions() {
        let returnArray = [];
        
        for (let option in options) {
            returnArray = [...returnArray, (
                <span 
                    key={options[option].text.length}
                    className="optionsSpan"
                    // Sets picked option
                    onClick={() => {
                        setState({
                            display: false,
                            option: options[option],
                        })
                    }}
                >
                    <span className="logoSpan">
                        { options[option].logo }
                    </span>
                    <span 
                        // Indicates the picked option
                        style={{visibility: currentOption.current?.text === options[option]?.text ? "visible" : "hidden"}}
                        className="picked"
                    >
                        &#10003;
                    </span>
                    <span className="textSpan">{ options[option].text }</span>
                </span>
            )];
        }
        return returnArray;
    }
    
    return (
        <>{
            state.display ? (
                <div 
                    className="WhoCanReply2_cover"
                    onClick={event => {
                        if (event.target.classList[0] !== "WhoCanReply2_cover") return;
                        setState({
                            ...state,
                            display: false,
                        })
                    }}
                >
                    <div className="WhoCanReply2">
                        <h2>Who can reply?</h2>
                        <p>
                            Pick who can reply to this Tweet. Keep in mind that
                            anyone mentioned in this Tweet can always reply.
                        </p>
                        <div className="listOptions">
                            <ListOptions />
                        </div>
                    </div>
                </div>
            ) : (
                <div 
                    className="WhoCanReply1"
                    onClick = {() => 
                        setState({
                            ...state,
                            display: true
                        })}
                >
                    <span className="logo">{ state.option.logo }</span>
                    <span className="text">{ state.option.text }</span>
                </div>
            )
        }</>
    )
}

export default WhoCanReply