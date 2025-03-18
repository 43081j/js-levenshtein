import test from 'node:test';
import * as assert from 'node:assert/strict';
import levenshtein from '../lib/index.js';

test('default', (t) => {
  assert.equal(levenshtein('a', 'b'), 1);
  assert.equal(levenshtein('ab', 'ac'), 1);
  assert.equal(levenshtein('ac', 'bc'), 1);
  assert.equal(levenshtein('abc', 'axc'), 1);
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.equal(levenshtein('xabxcdxxefxgx', '1ab2cd34ef5g6'), 6);
  assert.equal(levenshtein('cat', 'cow'), 2);
  assert.equal(levenshtein('xabxcdxxefxgx', 'abcdefg'), 6);
  assert.equal(levenshtein('javawasneat', 'scalaisgreat'), 7);
  assert.equal(levenshtein('example', 'samples'), 3);
  assert.equal(levenshtein('sturgeon', 'urgently'), 6);
  assert.equal(levenshtein('levenshtein', 'frankenstein'), 6);
  assert.equal(levenshtein('distance', 'difference'), 5);
  assert.equal(
    levenshtein('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文'),
    2
  );
});
