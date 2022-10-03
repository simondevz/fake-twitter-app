import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "./fetch";

function SideBar() {
    const showMenu = useSelector(state => state.showMenu);
    const user = useSelector(state => state.user);
    const fetch = useFetch();
    const navigate = useNavigate();
    
    function logout() {
        async function postData() {
            try {
                console.log("Called");
                const response = await fetch("/auth/logout/")
                console.log(response);
                if (response.status === 200) {
                    navigate("/login")
                }
            } catch (e) {console.log(e)}
        }
        postData();
    }
    
    return (
        <div className={
                "menu " +
                (showMenu ? "hover " : null)
            } >
            <div className="card">
                <div className="card-image">
                    <img src={user?.profile_picture} alt="profile" />
                </div>
            </div>
            <div>
                <ul>
                    <li>
                        <Link 
                            to={`../${user?.username}`}
                            state={user}
                        >
                            Profile
                        </Link>
                    </li>
                    <li>Bookmarks</li>
                    <li>Settings</li>
                    <li>Create New Account</li>
                    <li>Add Existing Account</li>
                </ul>
            </div>
            <div>
                {/*dark mode logo*/}
                <span onClick={ logout }>Log Out</span>
            </div>
        </div>
        
    )
}

export default SideBar;