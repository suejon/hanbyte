import React from "react";
import { Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";

export default function Entry() {
  const { id } = useGlobalSearchParams();
  return (
    <View>
      <Text>Entry {id}</Text>
    </View>
  );
}
