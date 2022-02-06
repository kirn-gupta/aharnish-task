import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import FlashMessage from "react-flash-message";
class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            error: "",
            errorMessage: "",
            formSubmitting: false,
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                phone: "",
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
        if (this.state.isRegistered) {
            return this.props.history.push("/dashboard");
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
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;
        // console.log(userData);
        axios
            .post("/api/auth/signup", userData)
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
                        activation_token: json.data.activation_token,
                    };
                    let appState = {
                        isRegistered: true,
                        user: userData,
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isRegistered: appState.isRegistered,
                        user: appState.user,
                    });
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

    handleName(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                name: value,
            },
        }));
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

    handlePasswordConfirm(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                password_confirmation: value,
            },
        }));
    }

    handlePhone(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                phone: value,
            },
        }));
        // console.log(this.state.user);
    }
    render() {
        let errorMessage = this.state.errorMessage;
        let arr = [];
        Object.values(errorMessage).forEach((value) => arr.push(value));
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 my-5">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Create Account</h2>
                                {this.state.isRegistered ? (
                                    <FlashMessage
                                        duration={60000}
                                        persistOnHover={true}
                                    >
                                        <h5 className={"alert alert-success"}>
                                            Registration successful
                                        </h5>
                                    </FlashMessage>
                                ) : (
                                    ""
                                )}
                                {this.state.error ? (
                                    <FlashMessage
                                        duration={900000}
                                        persistOnHover={true}
                                    >
                                        <h5 className={"alert alert-danger"}>
                                            Error: {this.state.error}
                                        </h5>
                                        <ul>
                                            {arr.map((item, i) => (
                                                <li key={i}>
                                                    <h5
                                                        style={{ color: "red" }}
                                                    >
                                                        {item}
                                                    </h5>
                                                </li>
                                            ))}
                                        </ul>
                                    </FlashMessage>
                                ) : (
                                    ""
                                )}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group my-3">
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            className="form-control"
                                            required
                                            onChange={this.handleName}
                                        />
                                    </div>
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
                                    <div className="form-group my-3">
                                        <input
                                            id="password_confirm"
                                            type="password"
                                            name="password_confirm"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            required
                                            onChange={
                                                this.handlePasswordConfirm
                                            }
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <input
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            className="form-control"
                                            required
                                            onChange={this.handlePhone}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        name="singlebutton"
                                        className="btn btn-primary mb-5"
                                        disabled={
                                            this.state.formSubmitting
                                                ? "disabled"
                                                : ""
                                        }
                                    >
                                        Create Account
                                    </button>
                                </form>
                                <div className="d-flex justify-content-between">
                                    <p className="text-dark">
                                        Already have an account?
                                        <Link
                                            to="/login"
                                            className="text-yellow"
                                        >
                                            {" "}
                                            Log In
                                        </Link>
                                    </p>
                                    <span className="pull-right">
                                        <Link to="/" className="text-dark">
                                            Back to Home
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterContainer);
