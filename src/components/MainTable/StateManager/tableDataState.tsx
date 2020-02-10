import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    tableData: defaultValue,
    setTableData: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [tableData, setTableData] = React.useState(defaultValue);
    return <ctx.Provider value={{ tableData, setTableData }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State: any[] = [] ;

export const [TableData, TableDataProvider] = createCtxUseState(State);
