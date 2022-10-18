import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";

import { login, updateToken, updateUser } from "../../actions";
import useFetch from "../hooks/fetch";
import "./login.sass";

function Login() {
    // Get data from redux store and dispatch function
    const loginForm = useSelector(state => state.loginForm);
    const dispatch = useDispatch();
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const fetch = useFetch();
    
    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const [loginText, setLoginText] = useState("Email");
    
    // Toggle between using username to login and using email
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
    
    // Fires the login function that updates loginForm
    function handleClick(event, key) {
        dispatch(login({
            ...loginForm,
            [key]: event.target.value,
        }));
    }
    
    function submit(event) {
        async function postData() {
            const config = {
                data: loginForm,
                headers: {"Content-Type": "application/json"},
            };
            const response = await fetch('auth/login/', 'post', config);
            console.log("login", response);
            
            if (response?.status === 200) {
                cookie.set('refresh_token', response.data.refresh_token, {
                    path: '/',
                    secure: false,
                    sameSite: false,
                });
                
                dispatch(updateToken(response.data.access_token));
                dispatch(updateUser(response.data.user));
                navigate('/posts');
            }
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

export default Login;