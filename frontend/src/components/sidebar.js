import { connect } from "react-redux";
import profile from "../images/profile_pic/profile3.png"

function SideBar({showMenu}) {
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
                Log Out
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