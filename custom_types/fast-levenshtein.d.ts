declare module 'fast-levenshtein' {
  const levenshtein: {
    get: (value: string, other: string) => number;
  };
  export = levenshtein;
}
