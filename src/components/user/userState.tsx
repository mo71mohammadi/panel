import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    userInfo: defaultValue,
    setUserInfo: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [userInfo, setUserInfo] = React.useState(defaultValue);

    return <ctx.Provider value={{ userInfo, setUserInfo }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  username: "",
  password: "",
  email: "",
  userToken: ""
};
export const [UserState, UserProvider] = createCtxUseState(State);
