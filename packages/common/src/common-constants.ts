const emptyArray = Object.freeze([]);

const emptyObject = Object.freeze({});

export const EMPTY_ARRAY = <TValue = unknown>() => emptyArray as unknown as TValue;

export const EMPTY_OBJECT = <TValue = Record<string, unknown>>() => emptyObject as unknown as TValue;
