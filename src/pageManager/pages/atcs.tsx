import React from "react";
import { ATCsTable } from "../../components/ATCsTable";
import { TableDataProvider } from "../../components/ATCsTable/tableDataState";
import { ModalExport } from "../../components/ATCsTable/modalExp";
import { ModalProvider } from "../../components/ATCsTable/modalState";
import { ValueProvider } from "../../components/ATCsTable/valueState";

export default function ATCsPage(params: any) {
  return (
    <div>
      <TableDataProvider>
        <ModalProvider>
          <ValueProvider>
            <ModalExport />
            <ATCsTable />
          </ValueProvider>
        </ModalProvider>
      </TableDataProvider>
    </div>
  );
}
