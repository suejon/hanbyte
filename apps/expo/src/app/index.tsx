import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import entries from "assets/entry.json";
import { Link, Stack } from "expo-router";
import Fuse from "fuse.js";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "~/components/ui/search-bar";
import type { Entry } from "~/types/entry";

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.2,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "english.word",
    // "korean.word",
    // "english.definition"
  ],
};


const fuse = new Fuse(entries as Entry[], fuseOptions);

// TODO: preload index
// Fuse.createIndex(["english.word"], entries as Entry[]);

const Index = () => {
  // const utils = api.useContext();
  // const deletePostMutation = api.post.delete.useMutation({
  //   onSettled: () => utils.post.all.invalidate(),
  // });

  // const [clipboardContent, setClipboardContent] = useState('');
  //
  // const readFromClipboard = async () => {
  //   const content = await Clipboard.getString();
  //   setClipboardContent(content);
  // };

  const [searchResults, setSearchResults] = useState<Entry[]>([]);

  const handleSearch = (searchText: string) => {
    const results = fuse.search<Entry>(searchText);
    const r = results.slice(0, 10).map((r) => r.item);
    setSearchResults(r);
  };

  return (
    <SafeAreaView className="bg-[#04364A]">
      <Stack.Screen options={{ title: "HanByte" }} />
      <View className="h-full w-full px-4">
        <Text className="mx-auto text-center pb-2 text-5xl font-bold text-white">
          Learn Korean with <Text className="text-teal-400">HanByte</Text>
        </Text>
        <SearchBar onSearch={handleSearch} />
        <View className="h-2" />
        {/* <Button title="Copy to Clipboard" onPress={() => Clipboard.setString('안녕하세요')} /> */}
        {/* <Button title="Read from Clipboard" onPress={readFromClipboard} /> */}
        {/* <Text className="text-white">Clipboard Content: {clipboardContent}</Text> */}
        {/* <Link href={{ */}
        {/*   pathname: "/clipboard", */}
        {/*   params: { text: "안녕하세요" }, */}
        {/* }}>Go to Clipboard</Link> */}

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
  );
};

export default Index;
