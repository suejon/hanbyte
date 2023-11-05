import React from "react";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
const RootLayout = () => {
  return (
    <TRPCProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer initialRouteName="lookup/page" screenOptions={{
          headerStyle: {
            backgroundColor: "#04364A",
          }
        }}>
          <Drawer.Screen
            name="lookup/page" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "Home",
              headerTintColor: "#fff",
            }}
          />
          <Drawer.Screen
            name="dictionaries/page" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Dictionaries",
              title: "Dictionaries",
              headerTintColor: "#fff",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar />
    </TRPCProvider>
  );
};

export default RootLayout;
