/**
 * Executes a given function across the provided dataset
 *
 * @param {Function} fn Function to execute
 * @param {string[]} data Dataset to execute provided function against
 * @return {void}
 */
export function performBench(fn: Function, data: string[]) {
  for (let i = 0; i + 1 < data.length; i += 2) {
    const d1 = data[i];
    const d2 = data[i + 1];
    fn(d1, d2);
  }
}

// @ts-ignore
export function padBefore(str, width) {
  return Array(width - str.length).join(' ') + str;
}

export const NS_PER_SEC = 1e9;
export const NS_PER_MS = 1e6;
