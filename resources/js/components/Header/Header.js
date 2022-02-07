import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn,
        };
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {},
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push("/login");
    }
    render() {
        const aStyle = {
            cursor: "pointer",
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Index
                            </Link>
                        </li>
                        {this.state.isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">
                                        Contact
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href=""
                                        onClick={this.logOut}
                                        className="nav-link"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        ) : (
                            ""
                        )}
                        {!this.state.isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}
export default withRouter(Header);
