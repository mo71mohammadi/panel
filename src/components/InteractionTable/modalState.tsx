import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    modal: defaultValue,
    setModal: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [modal, setModal] = React.useState(defaultValue);

    return <ctx.Provider value={{ modal, setModal }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  isModal: false,
  isConfirm: false,
  isChangeUp: false,
  isChangeMed: false,
  isRecord: {
    enName: undefined,
    enRoute: undefined,
    upToDateId: undefined,
    medScapeId: undefined
  },
  upId: { name: "", id: "" },
  medId: { name: "", id: "" },
  upToDateValue: "",
  medScapeValue: ""
};
export const [ModalState, ModalProvider] = createCtxUseState(State);
