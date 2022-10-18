import HomeLogo from "../../icons/home_logo";
import BellLogo from "../../icons/bell_logo";
import "./footer.sass";

function Footer() {
    return (
        <footer className="footer" >
            <div className="container">
                <span className="home_logo_span" >
                    <HomeLogo className="home_logo" />
                </span>
                
                <span className="bell_logo_span">
                    <BellLogo className="bell_logo" />
                </span>
            </div>
        </footer>
    )
}

export default Footer;