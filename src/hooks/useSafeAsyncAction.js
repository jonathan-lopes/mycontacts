import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback(
    (cb) => {
      if (isMounted()) {
        cb();
      }
    },
    [isMounted],
  );

  return runSafeAsyncAction;
}
