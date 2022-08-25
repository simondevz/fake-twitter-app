

function Navbar() {
    return (
        <>
            <nav className="nav-extended">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Logo</a>
                    <a href="#" 
                        onClick={() => { alert('clicked') }}
                        data-target="mobile-demo" 
                        className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
            
            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
        </>
    )
}

export default Navbar;