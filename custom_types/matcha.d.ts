declare function suite(name: string, fn: () => void): void;
declare function bench(name: string, fn: (cb?: Function) => void): void;
declare function before(fn: (cb?: Function) => void): void;
