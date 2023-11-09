import React from "react";
import { Drawer } from "expo-router/drawer";
import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'lookup/index',
};

const RootLayout = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#04364A",
          },
          headerTintColor: "#fff",
        }}
      >
        <Drawer.Screen
          name="lookup/index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            headerTintColor: "#fff",
            // swipeEdgeWidth: -100,
            // header: () => null,
            // headerShown: false
            // drawerItemStyle: {
            //   display: "none"
            // }
          }}
        />
        <Drawer.Screen
          name="dictionaries/index"
          options={{
            drawerLabel: "Dictionaries",
            title: "Dictionaries",
            headerTintColor: "#fff",
          }}
        />
      </Drawer>
    </>
  );
};
export default RootLayout;
