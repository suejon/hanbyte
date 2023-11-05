import { Stack } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DownloadItem from "~/components/ui/download-item";

const data = [
  { id: '1', title: 'Basic Dictionary', description: "english-to-korean dictionary" },
];

export default function Dictionaries() {

  const renderItem = ({ item }: { item: { title: string, description: string } }) => (
    <DownloadItem
      className="p-4 border-b-2 border-gray-600" // gets swallowed somehow
      name={item.title}
      description={item.description}
      onComplete={() => console.log('completed')}
    />
  );

  return (
    <SafeAreaView className="bg-[#04364A]">
      <Stack.Screen options={{ title: "Dictionaries" }} />
      <View className="h-full" >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

