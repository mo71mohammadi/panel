import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    action: defaultValue,
    setAction: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [action, setAction] = React.useState(defaultValue);

    return <ctx.Provider value={{ action, setAction }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  // input: "",
  filters: {},
  // subject: "",
  initSubject:"Select Item",
  // isSearch: false,
  isReset: false,
  isDelete: false,
  isEdit: false,
  num: 0,
  isExport: false,
  isDraw:false,
  isAddNew: false
  
};
export const [SearchState, SearchProvider] = createCtxUseState(State);
