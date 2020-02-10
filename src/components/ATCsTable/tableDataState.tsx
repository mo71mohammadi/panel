import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    tableDatA: defaultValue,
    setTableDatA: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [tableDatA, setTableDatA] = React.useState(defaultValue);
    return <ctx.Provider value={{ tableDatA, setTableDatA }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = { enName: "", enRoute: "", atc: { code: "" } };

export const [TableData, TableDataProvider] = createCtxUseState(State);
