import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack } from "expo-router";

import { useEntry } from "~/hooks/get-entry";

export default function EntryContainer({ id }: { id: string }) {
  const entry = useEntry(id);
  return (
    <View className="p-4">
      <Stack.Screen
        options={{ title: entry?.english?.word, headerTintColor: "white" }}
      />
      {entry ? (
        <View>
          <Text className="pb-2 text-5xl font-bold text-teal-400">
            {entry?.korean?.word}{" "}
            <Text className="font-normal text-white">
              ({entry?.chinese?.word})
            </Text>
          </Text>
          <Text className="text-3xl text-teal-400">{entry?.english?.word}</Text>
          <Text className="text-xl text-white">
            {entry?.english?.definition}
          </Text>
          <View className="h-4" />
          <View>
            <Text className="text-3xl font-bold text-white">Examples</Text>
            <ScrollView>
              <View>
                {entry?.korean?.examples?.map((e, index) => (
                  <View key={index}>
                    <View className="flex flex-row rounded-lg bg-white/10 p-4">
                      <View className="flex-grow">
                        <TouchableOpacity>
                          <Text className="text-2xl text-white">{e.value}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="h-2" />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
}
