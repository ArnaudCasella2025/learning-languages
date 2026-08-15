import { useCallback, useState } from "react";

export function usePersisted<T>(
  get: () => T,
  set: (value: T) => void,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(get);
  const update = useCallback(
    (next: T) => {
      set(next);
      setValue(next);
    },
    [set],
  );
  return [value, update];
}
