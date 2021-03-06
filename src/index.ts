/**
 * Determines the minimum value
 *
 * @param {number} d0 First number
 * @param {number} d1 Second number
 * @param {number} d2 Third number
 * @param {number} bx Character
 * @param {number} ay Character
 * @return {number}
 */
function min(
  d0: number,
  d1: number,
  d2: number,
  bx: number,
  ay: number
): number {
  if (d0 < d1 || d2 < d1) {
    return d0 > d2 ? d2 + 1 : d0 + 1;
  }
  return bx === ay ? d1 : d1 + 1;
}

/**
 * Calculates the levenshtein distance between two strings
 *
 * @param {string} a First string
 * @param {string} b Second string
 * @return {number} Distance
 */
export default function levenshtein(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  let la = a.length;
  let lb = b.length;
  let offset = 0;

  while (la > 0 && a.charCodeAt(la - 1) === b.charCodeAt(lb - 1)) {
    la--;
    lb--;
  }

  while (offset < la && a.charCodeAt(offset) === b.charCodeAt(offset)) {
    offset++;
  }

  la -= offset;
  lb -= offset;

  if (la === 0 || lb < 3) {
    return lb;
  }

  let x = 0;
  let y;
  let d0;
  let d1;
  let d2;
  let d3;
  let dd = 0;
  let dy;
  let ay;
  let bx0;
  let bx1;
  let bx2;
  let bx3;

  const vector = [];

  for (y = 0; y < la; y++) {
    vector.push(y + 1);
    vector.push(a.charCodeAt(offset + y));
  }

  const len = vector.length - 1;

  for (; x < lb - 3; ) {
    bx0 = b.charCodeAt(offset + (d0 = x));
    bx1 = b.charCodeAt(offset + (d1 = x + 1));
    bx2 = b.charCodeAt(offset + (d2 = x + 2));
    bx3 = b.charCodeAt(offset + (d3 = x + 3));
    dd = x += 4;
    for (y = 0; y < len; y += 2) {
      dy = vector[y];
      ay = vector[y + 1];
      d0 = min(dy, d0, d1, bx0, ay);
      d1 = min(d0, d1, d2, bx1, ay);
      d2 = min(d1, d2, d3, bx2, ay);
      dd = min(d2, d3, dd, bx3, ay);
      vector[y] = dd;
      d3 = d2;
      d2 = d1;
      d1 = d0;
      d0 = dy;
    }
  }

  for (; x < lb; ) {
    bx0 = b.charCodeAt(offset + (d0 = x));
    dd = ++x;
    for (y = 0; y < len; y += 2) {
      dy = vector[y];
      vector[y] = dd = min(dy, d0, dd, bx0, vector[y + 1]);
      d0 = dy;
    }
  }

  return dd;
}
