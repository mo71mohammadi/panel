import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    valueState: defaultValue,
    setValueState: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [valueState, setValueState] = React.useState(defaultValue);
    return <ctx.Provider value={{ valueState, setValueState }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const State = {
  gtn: [""],
  irc: [""],
  _id: "",
  eRx: "",
  packageCode: "",
  packageType: "",
  genericCode: "",
  strength: "",
  enRoute: "",
  faRoute: "",
  enForm: "",
  faForm: "",
  atcCode: "",
  upToDateId: "",
  medScapeId: "",
  faBrandName: "",
  enName: "",
  faName: "",
  volume: "",
  licenseOwner: "",
  countryBrandOwner: "",
  brandOwner: "",
  countryProducer: "",
  producer: "",
  conversationalName: "",
  priceHistory: [""]
};

export const [ValueState, ValueStateProvider] = createCtxUseState(State);
