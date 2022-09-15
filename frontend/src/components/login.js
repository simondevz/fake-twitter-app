import { connect } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { login } from "../actions";

function Login({ loginForm, login }) {
    const navigate = useNavigate();
    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const [loginText, setLoginText] = useState("Email");
    
    function showMail() {
        if (usernameInput.current.type === "hidden") {
            usernameInput.current.type = "text";
            emailInput.current.type = "hidden";
            setLoginText("Email");
            return
        }
        
        usernameInput.current.type = "hidden";
        emailInput.current.type = "email";
        setLoginText("Username")
        return
    }
    
    function handleClick(event, key) {
        login({
            ...loginForm,
            [key]: event.target.value,
        });
    }
    
    function submit(event) {
        async function postData() {
            try {
                const response = await axios.post("http://localhost:8000/api/auth/login/", loginForm);
                console.log(response);
                if (response.status === 200) {
                    navigate(`/${response.data.user.username}`, {state: response.data.user})
                }
            } catch (e) {console.log(e);}
        }
        postData();
        event.preventDefault();
    }
    
    return (
        <div className="container">
            <form onSubmit={ submit }>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    ref={usernameInput}
                    value={loginForm.username}
                    onChange={
                        event => { handleClick(event, "username") }
                    }
                />
                <input 
                    type="hidden"
                    name="email"
                    placeholder="Email"
                    ref={emailInput}
                    value={loginForm.email}
                    onChange={
                        event => { handleClick(event, "email") }
                    }
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={
                        event => { handleClick(event, "password") }
                    }
                />
                <span onClick={ showMail }>Log in with { loginText }</span>
                <button>Login</button>
            </form>
        </div>
    )
}

function mapState(state) {
    return {
        loginForm: state.loginForm,
    }
}

function mapDispatch(dispatch) {
    return {
        login: payload => { dispatch(login(payload)) }
    }
}

export default connect(mapState, mapDispatch) (Login);