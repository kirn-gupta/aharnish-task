import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class NotFound extends Component {
    render() {
        return <h1>Not Found</h1>;
    }
}
export default withRouter(NotFound);
