import React from 'react'
import { InteractionTable } from '../../components/InteractionTable'
import { ModalProvider } from '../../components/InteractionTable/modalState'


export default function InteractionPage(params: any) {
    return (
        <div>
            <ModalProvider>
                <InteractionTable />
            </ModalProvider>
        </div>
    )
}