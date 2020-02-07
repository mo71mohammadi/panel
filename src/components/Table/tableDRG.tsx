import React from "react";
import { TableDataProvider } from "./StateManager/tableDataState";
import { SearchProvider } from "./StateManager/searchState";
import { PaginationProvider } from "./StateManager/paginationState";
import { MainTable } from "./maintable";
import { CountProvider } from "./StateManager/countState";
import { DrawerProvider } from "./StateManager/drawerState";
import { UnicStateProvider } from "./StateManager/unicState";
import { EditStateProvider } from "./StateManager/editState";
import { ValueStateProvider } from "./StateManager/valueState";

export default function TableDRG() {
  return (
    <>
      <TableDataProvider>
        <UnicStateProvider>
          <SearchProvider>
            <PaginationProvider>
              <CountProvider>
                <DrawerProvider>
                  <EditStateProvider>
                    <ValueStateProvider>
                      <div
                        style={{
                          padding: 24,
                          background: "#fff",
                          minHeight: 360
                        }}
                      >
                        <MainTable />
                      </div>
                    </ValueStateProvider>
                  </EditStateProvider>
                </DrawerProvider>
              </CountProvider>
            </PaginationProvider>
          </SearchProvider>
        </UnicStateProvider>
      </TableDataProvider>
    </>
  );
}
