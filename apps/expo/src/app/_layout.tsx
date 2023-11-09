import React from "react";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'lookup/index',
};

const RootLayout = () => {
  return (
    <TRPCProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#04364A",
          },
          headerTintColor: "#fff"
        }}
      />
      <StatusBar />
    </TRPCProvider>
  );
};
export default RootLayout;
