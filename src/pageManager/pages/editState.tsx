import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    pageState: defaultValue,
    setPageState: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [pageState, setPageState] = React.useState(defaultValue);

    return <ctx.Provider value={{ pageState, setPageState }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const EditInit = 0;

export const [PageState, PageStateProvider] = createCtxUseState(EditInit);
