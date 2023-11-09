import { Alert, FlatList, SafeAreaView, View } from "react-native";
import DownloadItem from "~/components/ui/download-item";
import { DICT } from "~/utils/constants";
import { getData, saveData } from "~/utils/storage";
import { useStoreKeys } from "~/hooks/get-store-keys";
import { useEffect } from "react";

interface Data {
  id: string;
  title: string;
  description: string;
  data: {
    lookup: {
      key: string,
      url: string
    },
    map: {
      key: string,
      url: string
    }
  }
}
const data: Data[] = [
  {
    id: '1', title: 'Basic Dictionary', description: "english-to-korean dictionary", data: {
      lookup: {
        key: DICT.BASIC_LOOKUP,
        url: "https://uploadthing.com/f/db42023a-0e3e-4846-a975-824f1281453f-1ljxbm.json",
      },
      map: {
        key: DICT.BASIC_MAP,
        url: "https://uploadthing.com/f/1dee9589-1ea4-40f1-b32c-bd4006a75fd5-ymi6om.json"
      }
    }
  },
];

export default function Dictionaries() {

  const keys = useStoreKeys();

  const renderItem = ({ item }: { item: Data }) => {
    return (
      <DownloadItem
        className="p-4 border-b-2 border-gray-600" // gets swallowed somehow
        name={item.title}
        description={item.description}
        onPress={async () => {
          const lookup = await fetch(item.data.lookup.url)
          const map = await fetch(item.data.map.url)

          saveData(item.data.lookup.key, await lookup.text())
          saveData(item.data.map.key, await map.text())

          console.log("successfully downloaded map and lookup");
          const data = getData(item.data.lookup.key)
          console.log('data', data)

        }}
        onComplete={() => console.log('completed - this callback might not be needed')}
        downloaded={keys.includes(item.data.lookup.key)}
      />
    )
  };

  useEffect(() => {
    if (keys.length === 0) {
      Alert.alert("Welcome to Hanbyte!", "First download a dictionary to get started!")
    }
  }, [])

  return (
    <SafeAreaView className="bg-[#04364A]">
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

