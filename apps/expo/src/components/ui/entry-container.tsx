import { Stack } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEntry } from "~/hooks/get-entry";


export default function EntryContainer({ id }: { id: string }) {
  const entry = useEntry(id)
  return (
    <View className="p-4">
      <Stack.Screen options={{ title: entry?.english?.word, headerTintColor: "white" }} />
      <Text className="pb-2 text-5xl font-bold text-teal-400">{entry?.korean?.word}{" "}
        <Text className="text-white font-normal">({entry?.chinese?.word})</Text>
      </Text>
      <Text className="text-3xl text-teal-400">{entry?.english?.word}</Text>
      <Text className="text-white text-xl">{entry?.english?.definition}</Text>
      <View className="h-4" />
      <View>
        <Text className="text-white text-3xl font-bold">Examples</Text>
        <ScrollView>
          <View>
            {entry?.korean?.examples?.map((e, index) => (
              <View key={index}>
                <View className="flex flex-row rounded-lg bg-white/10 p-4" >
                  <View className="flex-grow">
                    <TouchableOpacity>
                      <Text className="text-white text-2xl">
                        {e.value}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="h-2" />
              </View>
            ))}
          </View></ScrollView>
      </View>
    </View>
  )
}
