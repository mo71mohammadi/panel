import React, { useEffect, useContext } from "react";
// import Logout from '../../components/logout/logout'
import { LoginState } from "../../components/login/loginState";
import { useHistory } from "react-router-dom";


export default function InteractionPage(params: any) {

    const { login, setLogin } = useContext(LoginState);
    let history = useHistory();
    history.push('/Login')
    setLogin({ isAuthenticated: false, authorization: undefined })

    // useEffect(()=>{
    //     // setLogin({isAuthenticated: false, authorization: undefined})
    //     // console.log(login)
    //     history.push('/Login')
    // }, [])
    // return (
    //     <div>
    //         <Logout />
    //     </div>
    // )
}