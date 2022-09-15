import { connect } from "react-redux";
import { useRef } from "react";

function Login({ loginForm }) {
    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    
    function showMail() {
        if (usernameInput.current.type === "hidden") {
            usernameInput.current.type = "text";
            emailInput.current.type = "hidden";
            return
        }
        
        usernameInput.current.type = "hidden";
        emailInput.current.type = "email";
        return
    }
    
    return (
        <div className="container">
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    ref={usernameInput}
                    value={loginForm.username}
                />
                <input 
                    type="hidden"
                    name="email"
                    placeholder="Email"
                    ref={emailInput}
                    value={loginForm.email}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginForm.password}
                />
                <a href="#" onClick={ showMail }>Log in with {emailInput.type === "hidden" ? "Email" : "Username"}</a>
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
    return
}

export default connect(mapState, mapDispatch) (Login);