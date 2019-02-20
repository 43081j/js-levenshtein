import * as _Benchmark from 'benchmark';
import chalk from 'chalk';
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
    chalk.cyan(padBefore(ops + ' op/s', 22)) + chalk.gray(separator + name)
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
  // @ts-ignore
  const fastest = suite.filter('fastest').map('name');
  // @ts-ignore
  const slowest = suite.filter('slowest').map('name');
  moveCursor(process.stdout, 0, -suite.length);
  cursorTo(process.stdout, 0);
  suite.forEach(({name, ops}: Result) => {
    if (fastest.includes(name)) {
      if (process.env.CI && name !== 'js-levenshtein-esm') {
        process.exit(1);
      }
      name = chalk.bgGreen.white(name);
    } else if (slowest.includes(name)) {
      name = chalk.bgRed.white(name);
    }
    writeResult(name, ops);
  });
  console.log();
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
