import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    count: defaultValue,
    setCount: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [count, setCount] = React.useState(defaultValue);

    return <ctx.Provider value={{ count, setCount }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = { total: 0 };
export const [CountState, CountProvider] = createCtxUseState(State);
