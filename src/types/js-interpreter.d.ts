declare module 'js-interpreter' {
  export default class Interpreter {
    constructor(code: string, initFunc?: (interpreter: Interpreter, globalObject: object) => void);
    run(): boolean;
    setProperty(object: object, name: string, value: object): void;
    createNativeFunction(func: (...args: never[]) => unknown): object;
    createAsyncFunction(func: (...args: never[]) => unknown): object;
  }
}
