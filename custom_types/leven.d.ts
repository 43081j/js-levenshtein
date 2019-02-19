declare module 'leven' {
  const levenshtein: (a: string, b: string) => number;
  export = levenshtein;
}
