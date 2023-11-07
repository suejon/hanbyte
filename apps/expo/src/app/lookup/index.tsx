import { FlashList } from "@shopify/flash-list";
import { Link, Stack, router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "~/components/ui/search-bar";
import { Entry } from "~/types/entry";
import { useFuse } from "~/hooks/fuse";
import { DICT } from "~/utils/constants";
import { Drawer } from "expo-router/drawer";

const fuseOptions = {
  threshold: 0.2,
  shouldSort: true,
  keys: [
    "english.word",
    // "korean.word",
    // "english.definition"
  ],
};

export default function Lookup() {
  const [searchResults, setSearchResults] = useState<Entry[]>([]);
  const [fuse, error] = useFuse<Entry>(fuseOptions, DICT.BASIC_LOOKUP)

  const handleSearch = (searchText: string) => {
    const results = fuse
      .search<Entry>(searchText, { limit: 25 })
      .map((r) => r.item);
    setSearchResults(results);
  };

  useEffect(() => {
    if (error) { router.push("dictionaries") }
  }, [error])

  return (
    <SafeAreaView className="bg-[#04364A]">
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
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
                    pathname: "/lookup/[id]",
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
