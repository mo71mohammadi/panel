import React, { useState, useContext } from "react";
import { Redirect, Route } from 'react-router-dom'
// import propTimport { LoginState } from "./loginState";
import { LoginState } from "../components/login/loginState";

export default function RouteWrapper({
    component: Component,
    ...rest
}) {
    const signed = false;
    const { login, setLogin } = useContext(LoginState);


    // if (isPrivate && !signed) {
    //     return <Redirect to='/Interaction' />;
    // }
    // if (!isPrivate && signed) {
    //     return <Redirect to='/Interaction' />;
    // }

    return <Route {...rest} render={props => {
        console.log(props)
        if (!login.isAuthenticated) return <Redirect to='/Login'/>
        else if (props.location.pathname === '/Logout') setLogin({isAuthenticated: false, authorization: undefined})
        else return <Component {...props} />
    }} />;
}

// RouteWrapper.propTypes = {
//     isPrivate: propTypes.bool,
//     component: propTypes.oneOfType([propTypes.element, propTypes.func]).isRequired
// }

// RouteWrapper.defaultProps = {
//     isPrivate: true,
// }