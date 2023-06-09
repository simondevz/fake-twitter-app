import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState, useLayoutEffect } from "react";

import { toggleMenu } from "../../actions";
import Sidebar from "../sidebar/sidebar";
import useUser from "../hooks/useUser";
import useUrl from "../hooks/useUrl";
import TwitterLogo from "../../icons/twitter";
import ThreeStarsLogo from "../../icons/three_stars";
import "./navbar.sass";

function Navbar() {
  const showMenu = useSelector((state) => state.showMenu);
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const getUser = useUser();
  const navRef = useRef(null);
  const getUserRef = useRef(getUser);
  const url = useUrl();

  useLayoutEffect(() => {
    getUserRef.current = getUser;
  }, [getUser]);

  useEffect(() => {
    // Get user onload
    async function gettingUser() {
      let user_info = await getUserRef.current();
      setUser((user) => user_info);
    }
    gettingUser();
  }, [getUserRef]);

  useEffect(() => {
    // Hide Navbar while scrolling up.
    let prevNavPos = window.pageYOffset;
    window.addEventListener("scroll", () => {
      let currentNavPos = window.pageYOffset;

      if (navRef?.current) {
        if (prevNavPos < currentNavPos) {
          navRef.current.style.top = "-4em";
        } else {
          navRef.current.style.top = "0";
        }
      }

      prevNavPos = currentNavPos;
    });
  });

  window.addEventListener("click", (event) => {
    // Hide sidebar onclick, anywhere except the sidebar itself
    if (event.target.classList[0] !== "menu") {
      if (showMenu) {
        dispatch(toggleMenu(false));
      }
    }
  });

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="container">
          <span
            className="icon profile_pic"
            style={{ backgroundImage: `url(${url(user?.profile_picture)})` }}
            // The time out lets the hide sidebar function run
            // and evaluate before running
            onClick={() => {
              setTimeout(() => {
                dispatch(toggleMenu(true));
              }, 50);
            }}
          />
          <TwitterLogo className="icon twitter_logo" />
          <ThreeStarsLogo className="icon three_stars" />
        </div>
      </nav>
      <Sidebar />
    </>
  );
}

export default Navbar;
