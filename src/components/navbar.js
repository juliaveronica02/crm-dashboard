import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expend-lg navbar-light bg-light border-bottom">
            <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>
            <div className="collapse navbar-collapse" id="navbarSypportedContnet">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Notification</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar