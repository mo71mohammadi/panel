import React from 'react'
import { RoleTable } from '../../components/Role'
import { ModalProvider } from '../../components/Role/editState'


export default function RolePage(params: any) {
    return (
        <div>
            <ModalProvider>
                <RoleTable />
            </ModalProvider>
        </div>
    )
}