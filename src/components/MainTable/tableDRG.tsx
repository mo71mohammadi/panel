import React from "react";
import { TableDataProvider } from "./StateManager/tableDataState";
import { SearchProvider } from "./StateManager/searchState";
import { PaginationProvider } from "./StateManager/paginationState";
import { MainTable } from "./maintable";
import { CountProvider } from "./StateManager/countState";
import { ValueStateProvider } from "./StateManager/valueState";

export default function TableDRG() {
  return (
    <>
      <TableDataProvider>
        <SearchProvider>
          <PaginationProvider>
            <CountProvider>
                <ValueStateProvider>
                  <MainTable />
                </ValueStateProvider>
            </CountProvider>
          </PaginationProvider>
        </SearchProvider>
      </TableDataProvider>
    </>
  );
}
