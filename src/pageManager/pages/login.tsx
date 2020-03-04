import React from 'react'
import Login from '../../components/profile/login'


export default function InteractionPage(params:any) {
    return(
        <div>
            <Login props={params}/>
        </div>
    )
}