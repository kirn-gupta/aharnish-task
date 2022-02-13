import React, { Component } from "react";
import Header from "../../../components/Header/Header";
import Nav from "../Inc/Nav";
class Home extends Component {
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
                                            Welcome User
                                        </div>
                                        <div className="table-responsive p-4">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row ">
                                                            User Id
                                                        </th>
                                                        <td>
                                                            {this.state.user.id}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row ">
                                                            Full Name
                                                        </th>
                                                        <td>
                                                            {
                                                                this.state.user
                                                                    .name
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row ">
                                                            Email
                                                        </th>
                                                        <td>
                                                            {
                                                                this.state.user
                                                                    .email
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row ">
                                                            Phone
                                                        </th>
                                                        <td>
                                                            {
                                                                this.state.user
                                                                    .phone
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
export default Home;
