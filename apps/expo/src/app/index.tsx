import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import entries from 'assets/entry.json';
import Fuse from "fuse.js";
import SearchBar from "~/components/ui/search-bar";
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
	]
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

const fuse = new Fuse(entries, fuseOptions);

interface Entry {
  english: {
    word: string;
    definition: string;
  },
  korean: {
    word: string;
    definition: string;
  }
}

const Index = () => {
  // const utils = api.useContext();

  // const postQuery = api.post.all.useQuery();

  // const deletePostMutation = api.post.delete.useMutation({
  //   onSettled: () => utils.post.all.invalidate(),
  // });

  const [searchResults, setSearchResults] = useState<Entry[]>([]);

  const handleSearch = (searchText: string) => {
    const results = fuse.search<Entry>(searchText)
    // console.log('results', results.slice(0,10).map(r=>r.item).length)
    // Perform search here and update searchResults state
    // setSearchResults([...searchResults, searchText]);
    const r = results.slice(0,10).map(r=>r.item)
    setSearchResults(r);
  };


  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Learn Korean with <Text className="text-teal-400">HanByte</Text>
        </Text>

        {/* <Button title="store item" onPress={() => _storeData()} />
        <Button title="retrieve item" onPress={() => _retrieveData()} /> */}

        {/* <Button
          onPress={() => void utils.post.all.invalidate()}
          title="Refresh posts"
          color={"rgb(45 212 191)"}
        /> */}

        <SearchBar onSearch={handleSearch} />
        {searchResults.map((r, index) => (
          <View key={index}>
            <Link
              asChild
              href={{
                pathname: "/entry/[id]",
                params: { id: 1 },
              }}
            >
              <TouchableOpacity>
                <View>
              <Text className="text-white">{r.korean?.word}</Text>
              <Text className="text-white">{r.english?.word}</Text>
            </View>
              </TouchableOpacity>
            </Link>
            <View className="h-2" />
          </View>
        ))}

        {/* <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
        </View> */}

        {/* <FlashList
          data={searchResults}
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(r) => (
            <View>
              <Text className="text-white">{r.korean?.word}</Text>
              <Text className="text-white">{r.english?.word}</Text>
            </View>
          )}
        /> */}

        {/* <CreatePost /> */}
      </View>
    </SafeAreaView>
  );
};

export default Index;
