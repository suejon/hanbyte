import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStoreKeys = (): readonly string[] => {
  const [keys, setKeys] = useState<readonly string[]>([]);

  useEffect(() => {
    if (keys.length === 0) {
      AsyncStorage
        .getAllKeys()
        .then(value => setKeys(value))
        .catch(error => console.error(error))
    }
  }, [keys]);
  return keys;
};
