import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    editState: defaultValue,
    setEditState: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [editState, setEditState] = React.useState(defaultValue);

    return <ctx.Provider value={{ editState, setEditState }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const EditInit = { count: 0, data: [] };

export const [EditState, EditStateProvider] = createCtxUseState(EditInit);
