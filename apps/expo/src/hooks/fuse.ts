import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { getJSON } from "~/utils/storage";
import { DICT } from "~/utils/constants";

export const useFuse = <T>(fuseOptions: Fuse.IFuseOptions<T>, key: keyof typeof DICT): [Fuse<T>, any] => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<any>(null);
  const fuse = new Fuse(data, fuseOptions);

  useEffect(() => {
    if (data.length === 0) {
      getJSON(key)
        .then(value => setData(value))
        .catch(error => {
          setError(error);
          console.error('hello', error)
        });
    }
  }, []);

  return [fuse, error];
};
