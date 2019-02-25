const levenshteinEditDistance = require('levenshtein-edit-distance');
const fastLevenshtein = require('fast-levenshtein');
const jsLevenshtein = require('js-levenshtein');
const talisman = require('talisman/metrics/distance/levenshtein');
const leven = require('leven');
const jsLevenshteinEsm = require('../');
const {paragraphs, sentences, words} = require('esm')(module)('./data');

if (!Object.entries) {
  Object.entries = function(obj) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i); // preallocate the Array
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

/**
 * Executes a given function across the given dataset
 *
 * @param {string[]} data Dataset to execute against
 * @return {Function} - bench runner
 */
function getBenchRunner(data) {
  return (fn) => {
    for (let i = 0; i + 1 < data.length; i += 2) {
      const p1 = data[i];
      const p2 = data[i + 1];
      fn(p1, p2);
    }
  };
}

const suites = Object.entries({
  '50 paragraphs, length max=500 min=240 avr=372.5': getBenchRunner(paragraphs),
  '100 sentences, length max=170 min=6 avr=57.5': getBenchRunner(sentences),
  '2000 words, length max=20 min=3 avr=9.5': getBenchRunner(words)
});

const libs = Object.entries({
  'fast-levenshtein': fastLevenshtein.get,
  'js-levenshtein': jsLevenshtein,
  'js-levenshtein-esm': jsLevenshteinEsm.default,
  leven,
  'levenshtein-edit-distance': levenshteinEditDistance,
  talisman
});

// Run each lib in each suite
for (const [suiteName, benchRunner] of suites) {
  suite(suiteName, () => {
    for (const [libName, fn] of libs) {
      bench(libName, () => benchRunner(fn));
    }
  });
}
