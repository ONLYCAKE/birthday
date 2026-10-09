import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

export function useLocalStorage<T>(key: string, initial: T): [T, (value: T | ((current: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStorage(key, initial));

  const setStored = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, setStored];
}
