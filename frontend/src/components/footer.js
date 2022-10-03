import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container">
                <i className="fa-solid fa-house fa-xl"></i>
                <Link to="/createpost/">
                    <i className="fa-solid fa-circle-plus fa-xl"></i>
                </Link>
                <i className="fa-solid fa-bell fa-xl"></i>
            </div>
        </footer>
    )
}

export default Footer;