import levenshteinEditDistance = require('levenshtein-edit-distance');
import fastLevenshtein = require('fast-levenshtein');
import talisman = require('talisman/metrics/distance/levenshtein');
import leven = require('leven');
import levenshtein from '../';
import paragraphs from './bench-paragraphs';
import sentences from './bench-sentences';
import words from './bench-words';

type levenshteinFunc = (a: string, b: string) => number;

/**
 * Executes a given function across the default word data
 *
 * @param {Function} fn Function to execute
 * @return {void}
 */
function wordBench(fn: levenshteinFunc): void {
  for (let i = 0; i + 1 < words.length; i += 2) {
    const w1 = words[i];
    const w2 = words[i + 1];
    fn(w1, w2);
  }
}

/**
 * Executes a given function across the default sentence data
 *
 * @param {Function} fn Function to execute
 * @return {void}
 */
function sentenceBench(fn: levenshteinFunc): void {
  for (let i = 0; i + 1 < sentences.length; i += 2) {
    const s1 = sentences[i];
    const s2 = sentences[i + 1];
    fn(s1, s2);
  }
}

/**
 * Executes a given function across the default paragraph data
 *
 * @param {Function} fn Function to execute
 * @return {void}
 */
function paragraphBench(fn: levenshteinFunc): void {
  for (let i = 0; i + 1 < paragraphs.length; i += 2) {
    const p1 = paragraphs[i];
    const p2 = paragraphs[i + 1];
    fn(p1, p2);
  }
}

suite('50 paragraphs, length max=500 min=240 avr=372.5', function() {
  before(function() {
    // @ts-ignore
    let _t = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      _t += paragraphs[i].toLowerCase().length;
    }
  });

  bench('js-levenshtein', function() {
    paragraphBench(levenshtein);
  });

  bench('talisman', function() {
    paragraphBench(talisman);
  });

  bench('levenshtein-edit-distance', function() {
    paragraphBench(levenshteinEditDistance);
  });

  bench('leven', function() {
    paragraphBench(leven);
  });

  bench('fast-levenshtein', function() {
    paragraphBench(fastLevenshtein.get);
  });
});

suite('100 sentences, length max=170 min=6 avr=57.5', function() {
  before(function() {
    // @ts-ignore
    let _t = 0;
    for (let i = 0; i < sentences.length; i++) {
      _t += sentences[i].toLowerCase().length;
    }
  });

  bench('js-levenshtein', function() {
    sentenceBench(levenshtein);
  });

  bench('talisman', function() {
    sentenceBench(talisman);
  });

  bench('levenshtein-edit-distance', function() {
    sentenceBench(levenshteinEditDistance);
  });

  bench('leven', function() {
    sentenceBench(leven);
  });

  bench('fast-levenshtein', function() {
    sentenceBench(fastLevenshtein.get);
  });
});

suite('2000 words, length max=20 min=3 avr=9.5', function() {
  before(function() {
    // @ts-ignore
    let _t = 0;
    for (let i = 0; i < words.length; i++) {
      _t += words[i].toLowerCase().length;
    }
  });

  bench('js-levenshtein', function() {
    wordBench(levenshtein);
  });

  bench('talisman', function() {
    wordBench(talisman);
  });

  bench('levenshtein-edit-distance', function() {
    wordBench(levenshteinEditDistance);
  });

  bench('leven', function() {
    wordBench(leven);
  });

  bench('fast-levenshtein', function() {
    wordBench(fastLevenshtein.get);
  });
});
