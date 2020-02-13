import React from 'react'
import { ATCsTable } from '../../components/ATCsTable'
// import { Columns } from '../../components/ATCsTable/columns'

import { TableDataProvider } from '../../components/ATCsTable/tableDataState'


export default function ATCsPage(params:any) {
    return(
        <TableDataProvider>
            {/*{Columns().ModalExport}*/}
            <ATCsTable/>
        </TableDataProvider>
    )
}