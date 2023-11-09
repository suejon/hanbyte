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
  return (
    <Link href="/root/lookup">Go to search</Link>
  )
}
