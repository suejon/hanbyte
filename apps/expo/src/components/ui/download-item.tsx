import { Text, View } from "react-native";
import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
import { useState } from "react";
import DownloadButton from "./download-button";

interface Props extends ViewProps {
  name: string;
  description: string;
  downloaded: boolean;
  onPress: Function;
  onComplete: Function;
}

const DownloadItem = ({ className, downloaded = false, ...props }: Props) => {

  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(downloaded);

  const state = completed || downloaded ? "downloaded" : downloading ? "downloading" : "none";

  return (
    <View className="flex-row justify-between p-4 border-b-2 border-gray-600">
      <View className="gap-2">
        <Text className="text-teal-400">{props.name}</Text>
        <Text className="text-white">{props.description}</Text>
      </View>
      <DownloadButton onPress={async () => {
        setDownloading(true)
        await props.onPress()
        setCompleted(true)
        setDownloading(false)
      }} state={state} />
    </View>
  )
}
export default DownloadItem;
