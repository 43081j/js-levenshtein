import * as _Benchmark from 'benchmark';
import chalk from 'chalk';
// @ts-ignore
import {clearLine, cursorTo, moveCursor} from 'readline';
import {padBefore, NS_PER_MS} from './utils';

type Suite = {
  name: string;
} & _Benchmark.Suite;

type Result = {
  ops: number;
  elapsed: number;
  iterations: number;
} & Benchmark;

type Benchmark = {
  name: string;
  // id?: number;
} & _Benchmark;

type Stats = {
  suites: number;
  benches: number;
  elapsed: number;
};

const separator = ' » ';

function writeResult(name: string, ops: number): void {
  console.log(
    chalk.cyan(padBefore(ops.toFixed(ops < 100 ? 2 : 0) + ' op/s', 22)) +
      chalk.gray(separator + name)
  );
}

export function onStart(): void {
  console.log();
}

export function onEnd(stats: Stats): void {
  console.log();
  console.log(chalk.gray('  Suites:  ') + stats.suites);
  console.log(chalk.gray('  Benches: ') + stats.benches);
  console.log(
    chalk.gray('  Elapsed: ') + (stats.elapsed / NS_PER_MS).toFixed(2) + ' ms'
  );
  console.log();
}

export function onSuiteStart(suite: Suite): void {
  console.log(padBefore('', 23) + suite.name);
}

export function onSuiteEnd(suite: Suite): void {
  const fast = suite.filter('fastest');
  // @ts-ignore
  const fastBenches = fast.map('name');

  const fastest =
    fast.length === 1
      ? //test
        // @ts-ignore
        fast[0]
      : // don't hate me james
        // @ts-ignore
        fast.sort(
          // @ts-ignore
          (a, b) => b.ops - a.ops
        )[0];

  // @ts-ignore
  const successful = suite.filter('successful').map('name');
  moveCursor(process.stdout, 0, -suite.length);
  cursorTo(process.stdout, 0);
  suite.forEach(({name, ops}: Result) => {
    if (fastest.name === name) {
      name = chalk.bgGreen.white(name);
      // @ts-ignore
    } else if (fastBenches.includes(name)) {
      name = chalk.green(name);
    } else if (!successful.includes(name)) {
      name = chalk.red(name);
    }
    writeResult(name, ops);
  });
  console.log();

  if (process.env.CI && !fastBenches.includes('js-levenshtein-esm')) {
    process.exit(1);
  }
}

export function onBenchStart(bench: Benchmark): void {
  process.stdout.write(
    '\r' +
      chalk.yellow(padBefore('wait' + separator, 25)) +
      chalk.gray(bench.name)
  );
}

export function onBenchEnd({ops, name}: Result): void {
  clearLine(process.stdout, 0);
  cursorTo(process.stdout, 0);
  writeResult(name, ops);
}
