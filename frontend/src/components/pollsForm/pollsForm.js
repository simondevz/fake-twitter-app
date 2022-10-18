import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { updatePostForm, updateDurationDisplay } from "../../actions";
import Duration from "../duration/duration";
import "./pollsForm.sass";

function PollsForm() {
    const postForm = useSelector(state => state.postForm);
    const dispatch = useDispatch();
    const [num, setNum] = useState(2);
    
    // Updates form on change
    function handleChange(event, key) {
        dispatch(updatePostForm({
            ...postForm,
            polls: {
                ...postForm.polls,
                [key]: event.target.value,
            }
        }));
    }
    
    function formatDuration() {
        const duration = postForm.polls.duration;
        let day = Math.floor(duration/86400000);
        let dayStr = day > 1 ? `${day} Days ` : `${day} Day `;
        
        let remainder = duration - (day*86400000);
        let hour = Math.floor(remainder/3600000);
        let hourStr = hour > 1 ? `${hour} Hours ` : `${hour} Hour `;
        
        remainder -= (hour*3600000);
        let minute = Math.floor(remainder/60000);
        let minuteStr = minute > 1 ? `${minute} Minutes` : `${minute} Minute`;
        
        if (day === 0) dayStr = "";
        if (hour === 0) hourStr = "";
        if (minute === 0) minuteStr = "";
        
        return dayStr+hourStr+minuteStr;
    }
    
    function poll() {
        let i = 0;
        let return_array = [];
        
        if (num > 4) {
            setNum(2);
            dispatch(updatePostForm({
                ...postForm,
                polls: {
                    ...postForm.polls,
                    2: null,
                    3: null,
                }
            }));
        }
        
        while (i < num) {
            let number = i.toString();
            return_array = [...return_array, (
                <div key={i}>
                    <input 
                        type="text"
                        value={postForm.polls?.[number] }
                        onChange={
                            event => handleChange(event, number)
                        }
                    />
                </div>
            )]
            i++;
        }
        
        return return_array;
    }
    
    return (
        <fieldset>
            <div>
                {poll()}
                <span
                    onClick={() => {
                        setNum(num +1)
                    }}
                >
                    /"_'-+-'_"/
                </span>
            </div>
            <Duration />
            <div>
                <div onClick={() => dispatch(updateDurationDisplay(true))}>
                    {formatDuration()}
                </div>
            </div>
        </fieldset>
    )
}

export default PollsForm;