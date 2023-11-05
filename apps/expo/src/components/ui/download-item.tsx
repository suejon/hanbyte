import { Text, View } from "react-native";
import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
import { useState } from "react";
import DownloadButton from "./download-button";

interface Props extends ViewProps {
  name: string;
  description: string;
  onComplete: Function;
}

const DownloadItem = ({ className, ...props }: Props) => {

  console.log("className", className)
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const state = completed ? "downloaded" : downloading ? "downloading" : "none";

  return (
    <View className="flex-row justify-between p-4 border-b-2 border-gray-600">
      <View className="gap-2">
        <Text className="text-teal-400">{props.name}</Text>
        <Text className="text-white">{props.description}</Text>
      </View>
      <DownloadButton onPress={() => {
        setDownloading(true)
        setTimeout(() => {
          setCompleted(true)
          setDownloading(false)
        }, 5000)
      }} state={state} />
    </View>
  )
}
export default DownloadItem;
