
import { Text, View, ActivityIndicator } from "react-native";
import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
import { AntDesign } from '@expo/vector-icons';

interface Props extends ViewProps {
  onPress: Function;
  state: "none" | "downloading" | "downloaded"
}

const DownloadButton = ({ state, onPress }: Props) => {
  return (
    <View>
      {state === "none" && (<AntDesign name="download" size={24} color="white" onPress={onPress} />)}
      {state === "downloading" && (
        <ActivityIndicator size="large" color="white" />
      )}
      {state === "downloaded" && (<AntDesign name="checkcircle" size={24} color="white" />)}
    </View>
  )
}
export default DownloadButton;
