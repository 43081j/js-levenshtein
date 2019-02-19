declare module 'levenshtein-edit-distance' {
  const levenshtein: (value: string, other: string) => number;
  export = levenshtein;
}
