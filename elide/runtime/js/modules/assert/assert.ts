/**
 * Intrinsic: Assertions.
 *
 * Provides assertion primitives for use in testing and debugging.
 */

/**
 * Type: `AssertionErrorOptions`.
 *
 * Shape of options that can be provided to a new `AssertionError`.
 */
export interface AssertionErrorOptions {
  /** If provided, the error message is set to this value. */
  message?: string;

  /** The `actual` property on the error instance. */
  actual?: any;

  /** The `expected` property on the error instance. */
  expected?: any;

  /** The `operator` property on the error instance. */
  operator?: string;

  /* If provided, the generated stack trace omits frames before this function. */
  stackStartFn?: Function;
}

/**
 * Type: `AssertionError`
 *
 * Represents an assertion failure.
 */
export class AssertionError implements Error, AssertionErrorOptions {
  public name: string;
  public message: string;
  public actual: any;
  public expected: any;
  public operator?: string;
  public generatedMessage: boolean;
  public code: string;
  public stack: string;

  /**
   * Primary constructor.
    
   * @param options Options for the assertion error.
   */
  constructor(options: AssertionErrorOptions) {
    this.name = "AssertionError";
    this.message = options.message || "";
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    this.generatedMessage = !options.message;
    this.code = "ERR_ASSERTION";
    this.stack = new Error().stack || "";
  }

  toString() {
    return this.stack;
  }
}

/**
 * Checks if a condition is truthy, throwing an `AssertionError` if it is not.
 *
 * @param condition Condition to check for truthiness.
 * @param message Message to provide if the condition is falsy.
 * @throws `AssertionError` if the condition is falsy.
 * @see https://nodejs.org/api/assert.html#assertokvalue-message
 */
export function ok(condition: any, message?: string): void {
  if (!condition) {
    throw new AssertionError({ message });
  }
}

/**
 * Alias for function `ok`.
 *
 * @see https://nodejs.org/api/assert.html#assertvalue-message
 */
export const assert = ok;

/**
 * Checks if two values are equal, throwing an `AssertionError` if they are not.
 *
 * @param actual Actual value to test for equality.
 * @param expected Expected value to test for equality.
 * @param message Message to display, or error to throw, if the equality check fails.
 * @throws `AssertionError` if the actual value is not equal to the expected value.
 * @see https://nodejs.org/api/assert.html#assertequalactual-expected-message
 */
export function equal(actual: any, expected: any, message?: string | Error): void {
  if (actual != expected) {
    if (message) {
      if (message instanceof Error) {
        throw message;
      } else {
        throw new AssertionError({
          operator: '==',
          message: message || `Expected ${actual} to equal ${expected}`,
          stackStartFn: equal,
          actual,
          expected,
        });
      }
    }
  }
}

/**
 * Checks if two object values are deeply equal, throwing an `AssertionError` if they are equal.
 *
 * Tests for deep equality between the `actual` and `expected` values. Recursively checks the equality of all owned
 * properties.
 *
 * Deep equality means that the enumerable "own" properties of child objects are also recursively evaluated by the
 * following rules:
 *
 * - Primitive values are compared with the `==` operator, with the exception of `NaN`. It is treated as being
 *   identical if both sides are `NaN`.
 * - Type tags of objects should be the same.
 * - Only enumerable "own" properties are considered.
 * - `Error` names and messages are always compared, even if these are not enumerable properties.
 * - Object wrappers are compared both as objects and unwrapped values.
 * - `Object` properties are compared unordered.
 * - Recursion stops when both sides differ or both sides encounter a circular reference.
 * - Implementation does not test the `[[Prototype]]` of objects.
 * - `Symbol` properties are not compared.
 * - `WeakMap` and `WeakSet` comparison does not rely on their values.
 * - `RegExp` lastIndex, flags, and source are always compared, even if these are not enumerable properties.
 *
 * This method is considered legacy within the Node API, and it is recommended that developers use `deepStrictEqual`
 * for most purposes instead.
 *
 * @param actual Actual object value to test for deep equality.
 * @param expected Expected object value to test for deep equality.
 * @param message Message to display, or error to throw, if the equality check fails.
 * @see https://nodejs.org/api/assert.html#assertdeepequalactual-expected-message
 */
export function deepEqual(actual: any, expected: any, message?: string | Error): void {
  throw new Error("Not implemented: `assert.deepEqual`")
}

/**
 * Checks if two object values are deeply and strictly equal, throwing an `AssertionError` if they are equal.
 *
 * Tests for deep and strict equality between the `actual` and `expected` values. Recursively checks the
 * strict equality of all owned properties.
 *
 * Deep equality means that the enumerable "own" properties of child objects are also recursively evaluated by the
 * following rules:
 *
 * - Primitive values are compared using `Object.is`
 * - Type tags of objects should be the same.
 * - `[[Prototype]]` of objects is compared using the `===` operator.
 * - Only enumerable "own" properties are considered.
 * - `Error` names and messages are always compared, even if these are not enumerable properties.
 * - Enumerable own `Symbol` properties are compared as well.
 * - Object wrappers are compared both as objects and unwrapped values.
 * - `Object` properties are compared unordered.
 * - `Map` keys and `Set` items are compared unordered.
 * - Recursion stops when both sides differ or both sides encounter a circular reference.
 * - `WeakMap` and `WeakSet` comparison does not rely on their values.
 * - `RegExp` lastIndex, flags, and source are always compared, even if these are not enumerable properties.
 *
 * @param actual Actual object value to test for deep equality.
 * @param expected Expected object value to test for deep equality.
 * @param message Message to display, or error to throw, if the equality check fails.
 * @see https://nodejs.org/api/assert.html#assertdeepequalactual-expected-message
 */
export function deepStrictEqual(actual: any, expected: any, message?: string | Error): void {
  throw new Error("Not implemented: `assert.deepStrictEqual`")
}

// Export the `assert` function as the default entrypoint for the module.
export default assert;
