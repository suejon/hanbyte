import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'lookup/index',
};

const RootLayout = () => {

  return (
    <TRPCProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerLabelStyle: {
              // color: "#fff"
            },
            headerStyle: {
              backgroundColor: "#04364A",
            },
            drawerStyle: {
              // backgroundColor: "#565656",
            },
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
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
              headerTintColor: "#fff",
              drawerItemStyle: {
                display: "none"
              }
            }}
          />
          <Drawer.Screen
            name="lookup/[id]"
            options={{
              drawerLabel: "-",
              title: "-",
              headerTintColor: "#fff",
              drawerItemStyle: {
                display: "none"
              }
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar />
    </TRPCProvider>
  );
};

export default RootLayout;
