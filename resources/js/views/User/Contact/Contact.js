import React, { Component } from "react";
import Header from "../../../components/Header/Header";
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
                <div className="container">
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
                </div>
            </>
        );
    }
}
export default Contact;
