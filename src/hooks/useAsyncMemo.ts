import {DependencyList, useEffect, useState} from 'react'

export function useAsyncMemo<T>(factory: () => Promise<T>, deps: DependencyList, initial: T): T {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    factory().then((val) => {
      setVal(val)
    });
  }, deps);
  return val;
}