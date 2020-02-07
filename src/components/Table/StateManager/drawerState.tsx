import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    openDrawer: defaultValue,
    setOpenDrawer: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [openDrawer, setOpenDrawer] = React.useState(defaultValue);

    return <ctx.Provider value={{ openDrawer, setOpenDrawer }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = false

export const [DrawerState, DrawerProvider] = createCtxUseState(State);
