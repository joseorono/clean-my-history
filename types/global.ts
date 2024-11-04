// Generic for anything that can be null
type Nullable<T> = T | null;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
