import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { updateSignup } from "../../actions"
import "./signup.sass";

function Signup({ signupForm, updateSignup }) {
    const navigate = useNavigate();
    
    function submit(event) {
        async function postData() {
            try {
                const response = await axios.post('http://localhost:8000/api/auth/registration/', signupForm);
                if (response.status === 201) {
                    navigate("/")
                }
            } catch (e) {
                console.log(e);
                if (e.response.status === 400) {
                    return
                }
            }
        }
        postData();
        event.preventDefault();
    }
    
    function handleClick(event, key) {
        updateSignup({
            ...signupForm,
            [key]: event.target.value,
        });
    }
    
    return (
        <div className="container">
            <form className="container" onSubmit={ submit }>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    value={signupForm.username} 
                    onChange={
                        event => { handleClick(event, "username") }
                    }
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={signupForm.email} 
                    onChange={
                        event => { handleClick(event, "email") }
                    }
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={signupForm.password1} 
                    onChange={
                       event => { handleClick(event, "password1") }
                    }
                />
                <input 
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={signupForm.password2} 
                    onChange={
                        event => {
                            const payload = {
                                ...signupForm,
                                password2: event.target.value,
                            }
                            updateSignup(payload);
                            
                            const checkPassword = event => {
                                if (payload.password2 === signupForm.password1) {
                                    event.target.style.borderColor = "black";
                                    event.target.onfocus = () => { this.style.borderColor = "green" }
                                } else {
                                    event.target.style.borderColor = "red";
                                }
                            }
                            checkPassword(event);
                        }
                    }
                />
                <button>Sign Up</button>
            </form>
            <button>Sign Up With Google</button>
        </div>
    )
}

function mapState(state) {
    return {
        signupForm: state.signupForm,
    }
}

function mapDispatch(dispatch) {
    return {
        updateSignup: payload => { dispatch(updateSignup(payload)) }
    }
}

export default connect(mapState, mapDispatch) (Signup)