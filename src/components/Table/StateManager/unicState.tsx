import React from "react";

function createCtxUseState<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    unicState: defaultValue,
    setUnicState: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [unicState, setUnicState] = React.useState(defaultValue);

    return <ctx.Provider value={{ unicState, setUnicState }} {...props} />;
  }
  return [ctx, Provider] as const;
}

export const State = [
  {
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
  }
];

export const STATE = [
  {
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
  }
];

export const [UnicState, UnicStateProvider] = createCtxUseState(State);
