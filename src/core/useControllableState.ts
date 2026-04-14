import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

const resolveValue = <T,>(value: SetStateAction<T>, previousValue: T): T =>
  typeof value === 'function' ? (value as (previousValue: T) => T)(previousValue) : value;

export const useControllableState = <T,>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>, boolean] => {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as T) : internalValue;

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (nextValue) => {
      const resolvedValue = resolveValue(nextValue, currentValue);

      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      onChange?.(resolvedValue);
    },
    [currentValue, isControlled, onChange],
  );

  return [currentValue, setValue, isControlled];
};

export default useControllableState;
