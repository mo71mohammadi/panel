import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    login: defaultValue,
    setLogin: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [login, setLogin] = React.useState(defaultValue);

    return <ctx.Provider value={{ login, setLogin }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  isAuthenticated: false,
  authorization: undefined,
  username: "",
  password: "",
  email: "",
  role:""
};
export const [LoginState, LoginProvider] = createCtxUseState(State);
