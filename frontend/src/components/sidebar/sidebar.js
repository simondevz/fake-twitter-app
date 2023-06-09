import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/fetch";
import "./sidebar.sass";

function SideBar() {
  const showMenu = useSelector((state) => state.showMenu);
  const user = useSelector((state) => state.user);
  const fetch = useFetch();
  const navigate = useNavigate();

  function logout() {
    async function postData() {
      try {
        console.log("Called");
        const response = await fetch("/auth/logout/");
        console.log(response);
        if (response.status === 200) {
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    }
    postData();
  }

  return (
    <div className={"menu " + (showMenu ? "hover " : null)}>
      <div className="card">
        <div className="card-image">
          <img src={user?.profile_picture} alt="profile" />
        </div>
      </div>

      <div className="ul">
        <span>
          <Link to={`../${user?.username}`} state={user}>
            Profile
          </Link>
        </span>
        <span>
          <Link to="#">Bookmarks</Link>
        </span>
        <span>
          <Link to="#">Settings</Link>
        </span>
        <span>
          <Link to="#">Create New Account</Link>
        </span>
        <span>
          <Link to="#">Add Existing Account</Link>
        </span>
      </div>

      <div>
        {/*dark mode logo*/}
        <span className="logout" onClick={logout}>
          Log Out
        </span>
      </div>
    </div>
  );
}

export default SideBar;
