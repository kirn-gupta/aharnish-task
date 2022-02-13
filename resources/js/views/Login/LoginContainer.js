import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import FlashMessage from "react-flash-message";
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: "",
            formSubmitting: false,
            user: {
                email: "",
                password: "",
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }

    componentDidMount() {
        const { prevLocation } = this.state.redirect.state || {
            prevLocation: { pathname: "/dashboard" },
        };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userData = this.state.user;
        // console.log(userData);
        axios
            .post("/api/auth/login", userData)
            .then((response) => {
                return response;
            })
            .then((json) => {
                if (json.data.success) {
                    let userData = {
                        id: json.data.id,
                        name: json.data.name,
                        email: json.data.email,
                        phone: json.data.phone,
                        photo: json.data.photo,
                        access_token: json.data.access_token,
                    };

                    // console.log(userData);

                    let appState = {
                        isLoggedIn: true,
                        user: userData,
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user,
                        error: "",
                    });
                    location.reload();
                } else {
                    alert(`Our System Failed To Register Your Account!`);
                }
            })
            .catch((error) => {
                if (error.response) {
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false,
                    });
                } else if (error.request) {
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false,
                    });
                } else {
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false,
                    });
                }
            })
            .finally(this.setState({ error: "" }));
    }
    handleEmail(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                email: value,
            },
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                password: value,
            },
        }));
    }
    render() {
        const { state = {} } = this.state.redirect;
        const { error } = state;
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-lg-3 col-lg-6 col-md-12 col-sm-12 col-12 my-5">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-5">Log In</h2>
                                {this.state.isLoggedIn ? (
                                    <FlashMessage
                                        duration={60000}
                                        persistOnHover={true}
                                    >
                                        <h5 className={"alert alert-success"}>
                                            Login successful, redirecting...
                                        </h5>
                                    </FlashMessage>
                                ) : (
                                    ""
                                )}
                                {this.state.error ? (
                                    <FlashMessage
                                        duration={100000}
                                        persistOnHover={true}
                                    >
                                        <h5 className={"alert alert-danger"}>
                                            Error: {this.state.error}
                                        </h5>
                                    </FlashMessage>
                                ) : (
                                    ""
                                )}
                                {error && !this.state.isLoggedIn ? (
                                    <FlashMessage
                                        duration={100000}
                                        persistOnHover={true}
                                    >
                                        <h5 className={"alert alert-danger"}>
                                            Error: {error}
                                        </h5>
                                    </FlashMessage>
                                ) : (
                                    ""
                                )}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group my-3">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="E-mail"
                                            className="form-control"
                                            required
                                            onChange={this.handleEmail}
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="form-control"
                                            required
                                            onChange={this.handlePassword}
                                        />
                                    </div>
                                    <button
                                        disabled={this.state.formSubmitting}
                                        type="submit"
                                        name="singlebutton"
                                        className="btn btn-primary mb-5"
                                    >
                                        {" "}
                                        {this.state.formSubmitting
                                            ? "Logging You In..."
                                            : "Log In"}{" "}
                                    </button>
                                </form>
                                <div className="d-flex justify-content-between">
                                    <p className="text-dark">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/register"
                                            className="text-yellow"
                                        >
                                            {" "}
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginContainer);
