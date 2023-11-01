import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clipboard } from "react-native";

const readFromClipboard = async () => {
  const content = await Clipboard.getString();
  return content;
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
