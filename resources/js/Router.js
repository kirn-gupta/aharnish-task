import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import NotFound from "./views/NotFound/NotFound";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "./views/User/Dashboard/Dashboard";
import About from "./views/User/About/About";
import Contact from "./views/User/Contact/Contact";
const Main = (props) => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/about" component={About} />
        <PrivateRoute path="/contact" component={Contact} />
        <Route component={NotFound} />
    </Switch>
);
export default Main;
