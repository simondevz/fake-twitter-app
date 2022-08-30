import { connect } from "react-redux";
import { useRef,useEffect } from "react";
import { toggleMenu } from "../actions";

function Navbar({ showMenu, toggleMenu }) {
    const navRef = useRef(null);
    
    useEffect(() => {
        let prevNavPos = window.pageYOffset;
        window.addEventListener("scroll",() => {
            let currentNavPos = window.pageYOffset;
            if (prevNavPos < currentNavPos) {
                navRef.current.style.top = "-4em";
            } else {
                navRef.current.style.top = "0";
            }
            prevNavPos = currentNavPos;
        });
    })
    
    window.addEventListener("click", event => {
        if (event.target.classList[0] !== "menu") {
            if (showMenu) {
                toggleMenu(false)
            }
        }
    });
    
    return (
        <>
            <nav className="cyan accent-1" ref={navRef} >
                <div className="container">
                    <i className="fa-solid fa-bars"
                        onClick={() => { setTimeout(() => {toggleMenu(true)}, 50) }}
                    ></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </div>
            </nav>
            <div className={
                    "menu " +
                    "hide-on-med-and-up " +
                    (showMenu ? "hover " : null)
                } >        
                <div className="card-image">
                </div>
                <div>
                    <ul>
                        <li>one</li>
                        <li>two</li>
                        <li>three</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        showMenu: state.showMenu,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: payload => { dispatch(toggleMenu(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);