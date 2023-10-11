import entrymap from "assets/entrymap.json";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import type { Entry } from "~/types/entry";

export default function Entry() {
  const { id } = useGlobalSearchParams();
  const entry: Entry = entrymap[id] || {};

  return (
    <View>
      <Text>Entry {id}</Text>
      <Text>{entry.korean.word}</Text>
      <Text>{entry.english.word}</Text>
      <Text>{entry.english.definition}</Text>
    </View>
  );
}
