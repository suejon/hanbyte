import { useNavigation } from "expo-router/src/useNavigation";
import React from "react";
// import { useStoreKeys } from "~/hooks/get-store-keys";

const Index = () => {
  const nav = useNavigation()
  nav.navigate("lookup/index")
  // const keys = useStoreKeys();


  return <></>
};

export default Index;
