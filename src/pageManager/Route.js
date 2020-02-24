import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// import propTypes from 'prop-types'

export default function RouteWrapper({
    component: Component,
    ...rest
}) {
    const signed = false;

    // if (isPrivate && !signed) {
    //     return <Redirect to='/Interaction' />;
    // }
    // if (!isPrivate && signed) {
    //     return <Redirect to='/Interaction' />;
    // }

    return <Route {...rest} render={props => {
        if (!signed) return <Redirect to='/Login'/>
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