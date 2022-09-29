import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import profile from "../images/profile_pic/profile3.png"

function SideBar({showMenu}) {
    const navigate = useNavigate();
    
    function logout() {
        async function postData() {
            try {
                console.log("Called");
                const response = await axios.post("http://127.0.0.1:8000/api/auth/logout/", {})
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
                    <img src={profile} alt="profile" />
                </div>
            </div>
            <div>
                <ul>
                    <li>Profile</li>
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

function mapStateToProps(state) {
    return {
        showMenu: state.showMenu,
    }
}

export default connect(mapStateToProps) (SideBar);