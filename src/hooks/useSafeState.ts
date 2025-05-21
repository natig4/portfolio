import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
  useRef,
} from "react";

export function useSafeState<T>(
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback((value: SetStateAction<T>) => {
    if (mountedRef.current) {
      setState(value);
    } else {
      console.warn("Attempted state update on unmounted component");
    }
  }, []);

  return [state, safeSetState];
}
