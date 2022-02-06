import React, { Component } from "react";
import Header from "../../../components/Header/Header";
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
            <div>
                <Header
                    userData={this.state.user}
                    userIsLoggedIn={this.state.isLoggedIn}
                />
                <br />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row ">User Id</th>
                            <td>{this.state.user.id}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Full Name</th>
                            <td>{this.state.user.name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Email</th>
                            <td>{this.state.user.email}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Phone</th>
                            <td>{this.state.user.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Home;
