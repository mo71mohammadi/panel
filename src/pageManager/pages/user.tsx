import React from 'react'
import { UserTable } from '../../components/User'
import { ModalProvider } from '../../components/User/modalState'


export default function UserPage(params: any) {
    return (
        <div>
            <ModalProvider>
                <UserTable />
            </ModalProvider>
        </div>
    )
}