import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    value: defaultValue,
    setValue: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [value, setValue] = React.useState(defaultValue);

    return <ctx.Provider value={{ value, setValue }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  L1: { enName: "", faName: "", shortName: "" },
  L2: { enName: "", faName: "", shortName: "" },
  L3: { enName: "", faName: "", shortName: "" },
  L4: { enName: "", faName: "", shortName: "" },
  L5: { enName: "", faName: "", shortName: "" },
  ddd: { admRoute: "", dose: "", unit: "" }
};
export const [ValueState, ValueProvider] = createCtxUseState(State);
