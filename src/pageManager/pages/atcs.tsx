import React from "react";
import { ATCsTable } from "../../components/ATCsTable";
import { TableDataProvider } from "../../components/ATCsTable/tableDataState";

export default function ATCsPage(params: any) {
  return (
    <div>
      <TableDataProvider>
        <ATCsTable />
      </TableDataProvider>
    </div>
  );
}
