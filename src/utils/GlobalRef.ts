/**
 * GlobalRef.ts
 * 
 * @see https://github.com/vercel/next.js/discussions/15054
 * 
 * sobird<i@sobird.me> at 2023/11/04 8:55:01 created.
 */

export class GlobalRef<T> {
  private readonly sym: symbol;

  constructor(uniqueName: string) {
    this.sym = Symbol.for(uniqueName);
  }

  get value() {
    return (global as any)[this.sym] as T | undefined;
  }

  set value(value: T) {
    (global as any)[this.sym] = value;
  }
}