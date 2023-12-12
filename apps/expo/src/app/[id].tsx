import React, { Suspense } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import EntryContainer from "~/components/ui/entry-container";
import type { Entry } from "~/types/entry";

export default function Entry() {
  const { id } = useGlobalSearchParams();

  if (!id) {
    console.log("No id in params");
    // throw new Error("Something broke");
    return;
  }

  return (
    // TODO: use suspense fallback
    <SafeAreaView className="h-full bg-[#04364A]">
      <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
        <EntryContainer id={id as string} />
      </Suspense>
    </SafeAreaView>
  );
}
