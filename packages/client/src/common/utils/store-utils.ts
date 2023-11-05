import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Create a store for a single value with setter function.
 * The implementation is similar to {@link useState} React hook.
 * @param storeName {String} zustand store name.
 * @param initialValue {String} initial value.
 */
export const singleValueStoreCreator = <TValue = unknown>(storeName: string, initialValue: TValue) =>
  create<{
    value: TValue;
    setValue: (newValue: TValue) => void;
  }>()(
    devtools(
      (set) => ({
        value: initialValue,
        setValue: (newValue: TValue) => set(() => ({ value: newValue })),
      }),
      {
        name: storeName,
      },
    ),
  );
