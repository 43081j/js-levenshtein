const levenshteinEditDistance = require('levenshtein-edit-distance');
const fastLevenshtein = require('fast-levenshtein');
const jsLevenshtein = require('js-levenshtein');
const talisman = require('talisman/metrics/distance/levenshtein');
const leven = require('leven');
const jsLevenshteinEsm = require('esm')(module)('../../');
const {paragraphs, sentences, words} = require('esm')(module)('../src/data');

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

const paragraphBench = getBenchRunner(paragraphs);
const sentenceBench = getBenchRunner(sentences);
const wordBench = getBenchRunner(words);

suite('50 paragraphs, length max=500 min=240 avr=372.5', function() {
  bench('fast-levenshtein', function() {
    paragraphBench(fastLevenshtein.get);
  });

  bench('js-levenshtein', function() {
    paragraphBench(jsLevenshtein);
  });

  bench('js-levenshtein-esm', function() {
    paragraphBench(jsLevenshteinEsm.default);
  });

  bench('leven', function() {
    paragraphBench(leven);
  });

  bench('levenshtein-edit-distance', function() {
    paragraphBench(levenshteinEditDistance);
  });

  bench('talisman', function() {
    paragraphBench(talisman);
  });
});

suite('100 sentences, length max=170 min=6 avr=57.5', function() {
  bench('fast-levenshtein', function() {
    sentenceBench(fastLevenshtein.get);
  });

  bench('js-levenshtein', function() {
    sentenceBench(jsLevenshtein);
  });

  bench('js-levenshtein-esm', function() {
    sentenceBench(jsLevenshteinEsm.default);
  });

  bench('leven', function() {
    sentenceBench(leven);
  });

  bench('levenshtein-edit-distance', function() {
    sentenceBench(levenshteinEditDistance);
  });

  bench('talisman', function() {
    sentenceBench(talisman);
  });
});

suite('2000 words, length max=20 min=3 avr=9.5', function() {
  bench('fast-levenshtein', function() {
    wordBench(fastLevenshtein.get);
  });

  bench('js-levenshtein', function() {
    wordBench(jsLevenshtein);
  });

  bench('js-levenshtein-esm', function() {
    wordBench(jsLevenshteinEsm.default);
  });

  bench('leven', function() {
    wordBench(leven);
  });

  bench('levenshtein-edit-distance', function() {
    wordBench(levenshteinEditDistance);
  });

  bench('talisman', function() {
    wordBench(talisman);
  });
});
