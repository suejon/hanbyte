import { Stack, useGlobalSearchParams } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { Suspense } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import EntryContainer from "~/components/ui/entry-container";
import type { Entry } from "~/types/entry";

export default function Entry() {
  const { id } = useGlobalSearchParams();

  if (!id) {
    console.log('No id in params');
    // throw new Error("Something broke");
    return
  }

  return (
    // TODO: use suspense fallback
    <SafeAreaView className="bg-[#04364A] h-full">
      <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
        <EntryContainer id={id as string} />
      </Suspense>
    </SafeAreaView>
  );
}
