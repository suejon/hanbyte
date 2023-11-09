import React from "react";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
import { Stack } from "expo-router";

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
      // initialRouteName="/root/lookup/index"
      >
        {/* <Stack.Screen name="root" /> */}
      </Stack>
      <StatusBar />
    </TRPCProvider>
  );
};
export default RootLayout;
