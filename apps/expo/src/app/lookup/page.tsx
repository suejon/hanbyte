import { FlashList } from "@shopify/flash-list";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "~/components/ui/search-bar";
import { Entry } from "~/types/entry";
import Fuse from "fuse.js";
import entries from 'assets/entry.json'

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: false,
  threshold: 0.2,
  keys: [
    "english.word",
    // "korean.word",
    // "english.definition"
  ],
};


const fuse = new Fuse(entries as Entry[], fuseOptions);

export default function Lookup() {
  const [searchResults, setSearchResults] = useState<Entry[]>([]);

  const handleSearch = (searchText: string) => {
    const results = fuse.search<Entry>(searchText);
    const r = results.slice(0, 10).map((r) => r.item);
    setSearchResults(r);
  };
  return (
    <SafeAreaView className="bg-[#04364A]">
      <View className="h-full w-full px-4 pt-4">
        <Text className="mx-auto text-center pb-2 text-5xl font-bold text-white">
          Learn Korean with <Text className="text-teal-400">HanByte</Text>
        </Text>
        <SearchBar onSearch={handleSearch} />
        <View className="h-2" />

        <FlashList
          data={searchResults}
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(r) => (
            <View className="flex flex-row rounded-lg bg-white/10 p-4">
              <View className="flex-grow">
                <Link
                  asChild
                  href={{
                    pathname: "/entry/[id]",
                    params: { id: r.item._id["$oid"] },
                  }}
                >
                  <TouchableOpacity>
                    <Text className="text-xl font-semibold text-teal-400">
                      {r.item.korean.word}
                    </Text>
                    <Text className="mt-2 text-white">
                      <Text className="text-teal-400">
                        {r.item.english.word}
                      </Text>
                      {" - "}
                      {r.item.english.definition}
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
