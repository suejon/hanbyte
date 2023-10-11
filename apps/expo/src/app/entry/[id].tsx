import entrymap from "assets/entrymap.json";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import type { Entry } from "~/types/entry";

export default function Entry() {
  const { id } = useGlobalSearchParams();
  const entry: Entry = entrymap[id] || {};

  return (
    <SafeAreaView className="bg-[#04364A] h-full">
      <View className="p-2">
        <Text className="pb-2 text-5xl font-bold text-teal-400">{entry.korean.word}{" "}<Text className="text-white font-semibold">({entry.chinese.word})</Text></Text>
        <Text className="text-3xl text-teal-400">{entry.english.word}</Text>
        <Text className="text-white text-xl">{entry.english.definition}</Text>
        <View className="h-4" />
        <View>
          <Text className="text-white text-3xl font-bold">Examples</Text>
          <ScrollView>
            <View>
              {entry.korean.examples.map((e, index) => (
                <View>
                  <View className="flex flex-row rounded-lg bg-white/10 p-4" key={index}>
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
    </SafeAreaView>
  );
}
