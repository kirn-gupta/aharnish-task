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
            <>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <Link
                        to="/dashboard"
                        className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
                    >
                        Aharnish Task
                    </Link>
                    <button
                        className="navbar-toggler position-absolute d-md-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="nav">
                        {this.state.isLoggedIn ? (
                            <>
                                <div className="nav-item text-nowrap">
                                    <a
                                        className="nav-link px-3 text-white"
                                        href="#"
                                        onClick={this.logOut}
                                    >
                                        Sign out
                                    </a>
                                </div>
                            </>
                        ) : (
                            ""
                        )}

                        {!this.state.isLoggedIn ? (
                            <>
                                <div className="nav-item text-nowrap">
                                    <Link
                                        to="/login"
                                        className="nav-link px-3  text-white"
                                    >
                                        Login
                                    </Link>
                                </div>
                                <div className="nav-item text-nowrap">
                                    <Link
                                        to="/register"
                                        className="nav-link px-3  text-white"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </header>
            </>
        );
    }
}
export default withRouter(Header);
