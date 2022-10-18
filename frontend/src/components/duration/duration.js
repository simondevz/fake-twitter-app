import { updatePostForm, updateDurationDisplay } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import "./duration.sass";

function Duration() {
    const postForm = useSelector(state => state.postForm);
    const display = useSelector(state => state.durationDisplay);
    const dispatch  = useDispatch();
    
    const dayInputRef = useRef(null);
    const hourInputRef = useRef(null);
    const minInputRef = useRef(null);
    
    // set timer to value from postForm.polls.duration
    const duration = postForm.polls.duration;
    const getValue = field => {
        let day = Math.floor(duration/86400000);
        if (field === "days") return day;
        
        let remainder = duration - (day*86400000);
        let hour = Math.floor(remainder/3600000);
        if (field === "hours") return hour;
        
        remainder -= (hour*3600000);
        let minute = Math.floor(remainder/60000);
        return minute;
    }
    
    // local state
    const [state, setState] = useState({
        days: getValue("days"),
        hours: getValue("hours"),
        min: getValue(),
        maxDay: 7,
        maxHour: 23,
        maxMin: 59,
    });
    
    let startY, moveY;
    const touchStart = event => {
        startY = event.touches[0].clientY;
    }
    
    const touchmove = event => {
        moveY = event.touches[0].clientY;
    }
    
    const touchend = (event, max, key) => {
        // Handle swipe up
        if (startY-25 > moveY) {
            setTimeout(() => {
                // enforce maximum amount of days
                if (state.days === state.maxDay) {
                    setState({
                        ...state,
                        min: 0,
                        hours: 0,
                    })
                    return
                }
                
                if (state[key] === max) {
                    setState({
                        ...state,
                        [key]: 0,
                    });
                    return
                }
                
                setState({
                    ...state,
                    [key]: state[key] +1,
                });
            }, 200);
        }
        
        // handle swipe down
        if (startY+25 < moveY) {
            setTimeout(() => {
                // minimum of 5 minutes
                if (state.days === 0 && state.hours === 0) {
                    setState({
                        ...state,
                        min: 5,
                    })
                    return
                }
                
                if (state[key] === 0) {
                    setState({
                        ...state,
                        [key]: max,
                    });
                    return
                }
                setState({
                    ...state,
                    [key]: state[key] -1,
                });
            }, 200);
        }
    }
    
    const handleChange = (event, max, key) => {
        // days is at max set hours and minutes to 0
        if (state.days === state.maxDay) {
            setState({
                ...state,
                hours: 0,
                min: 0,
            })
            return
        }
        
        // if value not within range set to 0
        if (event.target.value > max || event.target.value < 0) {
            setState({
                ...state,
                [key]: 0,
            })
            return
        }
        
        setState({
            ...state,
            [key]: Number(event.target.value),
        })
    }
    
    const handleSet = event => {
        // convert to milliseconds
        const daysMili = state.days * 86400000;
        const hoursMili = state.hours * 3600000;
        const minMili = state.min * 60000;
        const total = daysMili + hoursMili + minMili;
        event.preventDefault();
        
        // if not within range don't set
        if (total > 604800000 || total < 300000) return;
        dispatch(updatePostForm({
            ...postForm,
            polls: {
                ...postForm.polls,
                duration: total,
            }
        }));
        dispatch(updateDurationDisplay(false));
    }
    
    const cancel = event => {
        event.preventDefault();
        dispatch(updateDurationDisplay(false))
    }
    
    return (
        <div 
            style={{
                display: display ? "block" : "none",
            }}
            className="duration_container"
        >
            <div className="duration">
                <h2>Set Length</h2>
                <div className="inner_container">
                    <div className="days">
                        <span className="duration_header">Days</span>
                        <div 
                            className="numbers"
                            onTouchEnd={event => touchend(event, state.maxDay, "days")}
                            onTouchStart={touchStart}
                            onTouchMove={touchmove}
                        >
                            <span 
                                className="digit">
                                {state.days -1 < 0 || NaN ? state.maxDay : state.days -1}
                            </span>
                            <input 
                                type="number"
                                ref={dayInputRef}
                                onChange={event => handleChange(event, state.maxDay, "days")}
                                className="digit"
                                value={state.days}
                            />
                            <span
                                className="digit">
                                {state.days +1 > state.maxDay ? 0 : Number(state.days +1)}
                            </span>
                            <span 
                                onClick={() => dayInputRef.current.focus()}
                                className="choosen_time"
                            />
                        </div>
                    </div>
                    <div className="hours">
                        <span className="duration_header">Hours</span>
                        <div 
                            className="numbers"
                            onTouchStart={touchStart}
                            onTouchEnd={event => touchend(event, state.maxHour, "hours")}
                            onTouchMove={touchmove}
                        >
                            <span 
                                className="digit">
                                {state.hours -1 < 0 ? state.maxHour : state.hours -1}
                            </span>
                            <input 
                                type="number"
                                ref={hourInputRef}
                                onChange={event => handleChange(event, state.maxHour, "hours")}
                                className="digit"
                                value={state.hours}
                            />
                            <span
                                className="digit">
                                {state.hours +1 > state.maxHour ? 0 : Number(state.hours +1)}
                            </span>
                            <span
                                onClick={() => minInputRef.current.focus()}
                                className="choosen_time"
                            />
                        </div>
                    </div>
                    <div className="min">
                        <span className="duration_header">Min</span>
                        <div 
                            className="numbers"
                            onTouchStart={touchStart}
                            onTouchEnd={event => touchend(event, state.maxMin, "min")}
                            onTouchMove={touchmove}
                        >
                            <span 
                                className="digit">
                                {state.min -1 < 0 ? state.maxMin : state.min -1}
                            </span>
                            <input 
                                type="number"
                                ref={minInputRef}
                                onChange={event => handleChange(event, state.maxMin, "min")}
                                className="digit"
                                value={state.min}
                            />
                            <span
                                className="digit">
                                {state.min +1 > state.maxMin ? 0 : Number(state.min +1)}
                            </span>
                            <span 
                                onClick={() => hourInputRef.current.focus()}
                                className="choosen_time"
                            />
                        </div>
                    </div>
                </div>
                <button 
                    onClick={cancel}
                    className="cancel"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSet}
                    className="set"
                >
                    Set
                </button>
            </div>
        </div>
    )
}

export default Duration;