import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    pagi: defaultValue,
    setPagi: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [pagi, setPagi] = React.useState(defaultValue);
    return <ctx.Provider value={{ pagi, setPagi }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  pageSize: 20,
  pageCurrent: 1
};

export const [pagination, PaginationProvider] = createCtxUseState(State);
