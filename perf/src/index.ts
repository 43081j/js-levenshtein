import * as Benchmark from 'benchmark';
// import {paragraphs} from './data';
import {paragraphs, sentences, words} from './data';
import {performBench, NS_PER_SEC} from './utils';
import * as reporter from './reporter';

import jsLevenshteinEsm from '../../src/index';
// @ts-ignore
import * as jsLevenshtein from 'js-levenshtein';
// @ts-ignore
import * as fastLevenshtein from 'fast-levenshtein';
// @ts-ignore
import * as levenshteinEditDistance from 'levenshtein-edit-distance';
// @ts-ignore
import * as leven from 'leven';
// @ts-ignore
import * as talisman from 'talisman/metrics/distance/levenshtein';

const libs = Object.entries({
  'fast-levenshtein': fastLevenshtein.get,
  'js-levenshtein': jsLevenshtein,
  'js-levenshtein-esm': jsLevenshteinEsm,
  leven,
  'levenshtein-edit-distance': levenshteinEditDistance,
  talisman
});

const suites = Object.entries({
  '2000 words, length max=20 min=3 avg=9.5': words,
  '50 paragraphs, length max=500 min=240 avg=372.5': paragraphs,
  '100 sentences, length max=170 min=6 avg=57.5': sentences
});

const start = process.hrtime();

reporter.onStart();
for (const [suiteName, data] of suites) {
  const suite = new Benchmark.Suite(suiteName, {
    minSamples: 10,
    onStart: (e: Benchmark.Event) => {
      // @ts-ignore
      reporter.onSuiteStart(e.currentTarget);
    },
    onComplete: (e: Benchmark.Event) => {
      // @ts-ignore
      reporter.onSuiteEnd(e.currentTarget);
    }
  });

  // @ts-ignore
  libs.forEach(([libName, fn]) => {
    suite.add(
      libName,
      () => {
        performBench(fn, data);
      },
      {
        onStart: (e: Benchmark.Event) => {
          // @ts-ignore
          reporter.onBenchStart(e.currentTarget);
        },
        onComplete: (e: Benchmark.Event) => {
          const benchmark = e.currentTarget;
          // @ts-ignore
          const {hz, stats} = benchmark;
          // @ts-ignore
          benchmark.ops = hz;
          // @ts-ignore
          benchmark.iterations = stats.sample.length;
          // @ts-ignore
          benchmark.elapsed = benchmark.times.elapsed;

          // @ts-ignore
          reporter.onBenchEnd(benchmark);
        }
      }
    );
  });

  suite.run();
}

const diff = process.hrtime(start);

reporter.onEnd({
  suites: suites.length,
  benches: suites.length * libs.length,
  elapsed: diff[0] * NS_PER_SEC + diff[1]
});
