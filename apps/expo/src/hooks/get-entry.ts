
import { useEffect, useState } from "react";
import { getJSON } from "~/utils/storage";
import { DICT } from "~/utils/constants";
import { Entry } from "~/types/entry";

export const useEntry = (key: string): Entry | undefined => {
  const [data, setData] = useState<Map<string, Entry>>();

  useEffect(() => {
    if (!data) {
      getJSON(DICT.BASIC_MAP)
        .then(value => setData(value))
        .catch(error => console.error(error));
    }
  }, []);
  return data?.[key];
};
