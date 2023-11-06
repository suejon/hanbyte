import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { getJSON } from "~/utils/storage";
import { DICT } from "~/utils/constants";

export const useFuse = <T>(fuseOptions: Fuse.IFuseOptions<T>, key: keyof typeof DICT): Fuse<T> => {
  const [data, setData] = useState<T[]>([]);
  const fuse = new Fuse(data, fuseOptions);

  useEffect(() => {
    if (data.length === 0) {
      getJSON(key)
        .then(value => setData(value))
        .catch(error => console.error(error));
    }
  }, []);

  return fuse;
};
