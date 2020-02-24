import React from 'react'
import Login from '../../components/login/login'
import { LoginProvider } from '../../components/login/loginState'


export default function InteractionPage(params: any) {
    return (
        <div>
            {/* <LoginProvider> */}
            <Login />
            {/* </LoginProvider> */}
        </div>
    )
}