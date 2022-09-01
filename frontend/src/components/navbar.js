import { connect } from "react-redux";
import { useRef,useEffect } from "react";
import { toggleMenu } from "../actions";

function Navbar({ showMenu, toggleMenu }) {
    const navRef = useRef(null);
    
    useEffect(() => {
        // Hide Navbar while scrolling up.
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
        // Hide sidebar onclick, anywhere except the sidebar itself
        if (event.target.classList[0] !== "menu") {
            if (showMenu) {
                toggleMenu(false)
            }
        }
    });
    
    return (
        <nav ref={navRef} >
            <div className="container">
                <i className="fa-solid fa-bars"
                    // The time out lets the hide sidebar function run
                    // and evaluate before running
                    onClick={() => { setTimeout(() => {toggleMenu(true)}, 50) }}
                ></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </div>
        </nav>
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