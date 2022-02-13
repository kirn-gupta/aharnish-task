import React, { Component } from "react";
import Header from "../../../components/Header/Header";
import Nav from "../Inc/Nav";
class Contact extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
        };
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);

            // console.log(AppState);

            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user,
            });
        }
    }

    render() {
        return (
            <>
                <Header
                    userData={this.state.user}
                    userIsLoggedIn={this.state.isLoggedIn}
                />
                <div className="container-fluid">
                    <div className="row">
                        <Nav />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="row">
                                <div className="col-md-12 my-5">
                                    <div className="card">
                                        <div className="card-header">
                                            Contact Component
                                        </div>
                                        <div className="card-body">
                                            I'm an Contact component!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </>
        );
    }
}
export default Contact;
