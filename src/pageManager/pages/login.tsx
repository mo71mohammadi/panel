import React from 'react'
import Login from '../../components/Profile/login'


export default function InteractionPage(params:any) {
    return(
        <div>
            <Login props={params}/>
        </div>
    )
}