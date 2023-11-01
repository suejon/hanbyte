import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Clipboard() {
  const { text } = useGlobalSearchParams();
  return (
    <View className="p-2">
      <Text className="">{text}</Text>
    </View>
  )
}
