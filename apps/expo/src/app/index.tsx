import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import entries from "assets/entry.json";
import { Link, Stack } from "expo-router";
import Fuse from "fuse.js";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "~/components/ui/search-bar";
import type { Entry } from "~/types/entry";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "english.word",
    // "english.definition"
  ],
};

const _storeData = async () => {
  try {
    console.log("setting storage");
    await AsyncStorage.setItem("TASKS", "I like to save it.");
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

const _retrieveData = async () => {
  try {
    console.log("getting storage");
    const value = await AsyncStorage.getItem("TASKS");
    console.log("value", value);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
    console.error(error);
  }
};

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <TouchableOpacity>
            <Text className="text-xl font-semibold text-pink-400">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-white">{props.post.content}</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <TouchableOpacity onPress={props.onDelete}>
        <Text className="font-bold uppercase text-pink-400">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreatePost() {
  const utils = api.useContext();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
    },
  });

  return (
    <View className="mt-4">
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <TouchableOpacity
        className="rounded bg-teal-400 p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="font-semibold text-white">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
}
const fuse = new Fuse(entries as Entry[], fuseOptions);

// TODO: preload index
// Fuse.createIndex(["english.word"], entries as Entry[]);

const Index = () => {
  // const utils = api.useContext();
  // const deletePostMutation = api.post.delete.useMutation({
  //   onSettled: () => utils.post.all.invalidate(),
  // });

  const [searchResults, setSearchResults] = useState<Entry[]>([]);

  const handleSearch = (searchText: string) => {
    console.log('doing a search')
    const results = fuse.search<Entry>(searchText);
    const r = results.slice(0, 10).map((r) => r.item);
    setSearchResults(r);
  };

  return (
    <SafeAreaView className="bg-[#04364A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Learn Korean with <Text className="text-teal-400">HanByte</Text>
        </Text>

        <SearchBar onSearch={handleSearch} />
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
