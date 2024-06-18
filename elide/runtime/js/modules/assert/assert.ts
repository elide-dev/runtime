/*
 * Copyright (c) 2024 Elide Technologies, Inc.
 *
 * Licensed under the MIT license (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   https://opensource.org/license/mit/
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under the License.
 */

/**
 * Intrinsic: Assertions.
 *
 * Provides assertion primitives for use in testing and debugging.
 */

const {
  node_assert,
  AssertionError: AssertionErrorSymbol,
} = primordials;

if (!node_assert) {
  throw new Error(`The 'assert' module failed to load its intrinsic API.`);
}

const intrinsic: any = node_assert;

/**
 * Type: `AssertionError`
 *
 * Represents an assertion failure.
 */
export const AssertionError = AssertionErrorSymbol;

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
 * Checks if a condition is truthy, throwing an `AssertionError` if it is not.
 *
 * @param condition Condition to check for truthiness.
 * @param message Message to provide if the condition is falsy.
 * @throws `AssertionError` if the condition is falsy.
 * @see https://nodejs.org/api/assert.html#assertokvalue-message
 */
export function ok(condition: any, message?: string): void {
  intrinsic.ok(condition, message);
}

/**
 * Alias for function `ok`.
 *
 * @see https://nodejs.org/api/assert.html#assertvalue-message
 */
export const assert = ok;

/**
 * Throws an `AssertionError` with the provided message.
 *
 * @param message Message to provide in the `AssertionError`.
 * @throws `AssertionError` with the provided message.
 * @see https://nodejs.org/api/assert.html#assertfailmessage
 */
export function fail(message?: string | Error): void {
  if (intrinsic) {
    intrinsic.fail(message);
  } else {
    throw new AssertionError({
      message: message instanceof Error ? message.message : message,
      stackStartFn: fail
    });
  }
}

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
  if (intrinsic) {
    intrinsic.equal(actual, expected, message);
  } else {
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
}

/**
 * Checks if two values are strictly equal, throwing an `AssertionError` if they are not.
 *
 * @param actual Actual value to test for strict equality.
 * @param expected Expected value to test for equality.
 * @param message Message to display, or error to throw, if the equality check fails.
 * @throws `AssertionError` if the actual value is not equal to the expected value.
 * @see https://nodejs.org/api/assert.html#assertequalactual-expected-message
 */
export function strict(actual: any, expected: any, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.equal(actual, expected, message);
  } else {
    if (actual !== expected) {
      if (message) {
        if (message instanceof Error) {
          throw message;
        } else {
          throw new AssertionError({
            operator: '===',
            message: message || `Expected ${actual} to strictly equal ${expected}`,
            stackStartFn: strict,
            actual,
            expected,
          });
        }
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
  if (intrinsic) {
    intrinsic.deepEqual(actual, expected, message);
  } else {
    throw new Error("Not yet implemented");
  }
}

/**
 * Checks if two object values are not deeply equal, throwing an `AssertionError` if they are equal.
 *
 * Tests for deep inequality between the `actual` and `expected` values. Recursively checks the inequality of all owned
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
 * This method is considered legacy within the Node API, and it is recommended that developers use `notDeepStrictEqual`
 * for most purposes instead.
 *
 * @param actual Actual object value to test for deep inequality.
 * @param expected Expected object value to test for deep inequality.
 * @param message Message to display, or error to throw, if the inequality check fails.
 * @see https://nodejs.org/api/assert.html#assertnotdeepequalactual-expected-message
 */
export function notDeepEqual(actual: any, expected: any, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.notDeepEqual(actual, expected, message);
  } else {
    throw new Error("Not yet implemented");
  }
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
  if (intrinsic) {
    intrinsic.deepStrictEqual(actual, expected, message);
  } else {
    throw new Error("Not yet implemented");
  }
}

/**
 * Checks if two object values are not deeply and strictly equal, throwing an `AssertionError` if they are equal.
 *
 * Tests for deep and strict inequality between the `actual` and `expected` values. Recursively checks the
 * strict inequality of all owned properties.
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
 * @param actual Actual object value to test for deep inequality.
 * @param expected Expected object value to test for deep inequality.
 * @param message Message to display, or error to throw, if the inequality check fails.
 * @see https://nodejs.org/api/assert.html#assertnotdeepequalactual-expected-message
 */
export function notDeepStrictEqual(actual: any, expected: any, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.notDeepStrictEqual(actual, expected, message);
  } else {
    throw new Error("Not yet implemented");
  }
}

/**
 * Run a function, expecting that it will throw an error.
 *
 * @param fn Function to run
 * @param expected Expected value
 * @param message Message or error during failure
 */
export function throws(fn: () => void, expected?: RegExp | Function | Error, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.throws(expected, message, fn);
  } else {
    try {
      fn();
    } catch (err) {
      if (expected instanceof RegExp) {
        if (!expected.test(err.message)) {
          throw new AssertionError({
            message: message || `Expected error message to match ${expected}`,
            actual: err.message,
            expected,
            operator: 'throws',
            stackStartFn: throws
          });
        }
      } else if (expected instanceof Function) {
        if (!(err instanceof expected)) {
          throw new AssertionError({
            message: message || `Expected error to be an instance of ${expected}`,
            actual: err,
            expected,
            operator: 'throws',
            stackStartFn: throws
          });
        }
      } else if (expected instanceof Error) {
        if (err !== expected) {
          throw new AssertionError({
            message: message || `Expected error to be ${expected}`,
            actual: err,
            expected,
            operator: 'throws',
            stackStartFn: throws
          });
        }
      }
    }
  }
}

/**
 * Run a function, expecting that it will not throw an error.
 *
 * @param fn Function to run
 * @param message Message or error during failure
 */
export function doesNotThrow(fn: () => void, expected?: RegExp | Function | Error, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.doesNotThrow(expected, message, fn);
  } else {
    try {
      fn();
    } catch (err) {
      if (expected instanceof RegExp) {
        if (expected.test(err.message)) {
          throw new AssertionError({
            message: message || `Expected error message to not match ${expected}`,
            actual: err.message,
            expected,
            operator: 'doesNotThrow',
            stackStartFn: doesNotThrow
          });
        }
      } else if (expected instanceof Function) {
        if (err instanceof expected) {
          throw new AssertionError({
            message: message || `Expected error to not be an instance of ${expected}`,
            actual: err,
            expected,
            operator: 'doesNotThrow',
            stackStartFn: doesNotThrow
          });
        }
      } else if (expected instanceof Error) {
        if (err === expected) {
          throw new AssertionError({
            message: message || `Expected error to not be ${expected}`,
            actual: err,
            expected,
            operator: 'doesNotThrow',
            stackStartFn: doesNotThrow
          });
        }
      }
    }
  }
}

/**
 * Run an async function, expecting that it will reject with an error.
 *
 * @param fn Function to run
 * @param expected Expected value
 * @param message Message or error during failure
 */
export function rejects(fn: () => Promise<any>, expected?: RegExp | Function | Error, message?: string | Error): Promise<void> {
  if (intrinsic) {
    return intrinsic.rejects(expected, message, fn);
  } else {
    return new Promise((resolve, reject) => {
      fn().then(() => {
        reject(new AssertionError({
          message: message || 'Expected promise to be rejected',
          operator: 'rejects',
          stackStartFn: rejects
        }));
      }).catch(err => {
        if (expected instanceof RegExp) {
          if (!expected.test(err.message)) {
            reject(new AssertionError({
              message: message || `Expected error message to match ${expected}`,
              actual: err.message,
              expected,
              operator: 'rejects',
              stackStartFn: rejects
            }));
          }
        } else if (expected instanceof Function) {
          if (!(err instanceof expected)) {
            reject(new AssertionError({
              message: message || `Expected error to be an instance of ${expected}`,
              actual: err,
              expected,
              operator: 'rejects',
              stackStartFn: rejects
            }));
          }
        } else if (expected instanceof Error) {
          if (err !== expected) {
            reject(new AssertionError({
              message: message || `Expected error to be ${expected}`,
              actual: err,
              expected,
              operator: 'rejects',
              stackStartFn: rejects
            }));
          }
        }
        resolve();
      });
    });
  }
}

/**
 * Run an async function, expecting that it will not reject with an error.
 *
 * @param fn Function to run
 * @param message Message or error during failure
 */
export function doesNotReject(fn: () => Promise<any>, expected?: RegExp | Function | Error, message?: string | Error): Promise<void> {
  if (intrinsic) {
    return intrinsic.doesNotReject(expected, message, fn);
  } else {
    return new Promise((resolve, reject) => {
      fn().then(() => {
        resolve();
      }).catch(err => {
        if (expected instanceof RegExp) {
          if (expected.test(err.message)) {
            reject(new AssertionError({
              message: message || `Expected error message to not match ${expected}`,
              actual: err.message,
              expected,
              operator: 'doesNotReject',
              stackStartFn: doesNotReject
            }));
          }
        } else if (expected instanceof Function) {
          if (err instanceof expected) {
            reject(new AssertionError({
              message: message || `Expected error to not be an instance of ${expected}`,
              actual: err,
              expected,
              operator: 'doesNotReject',
              stackStartFn: doesNotReject
            }));
          }
        } else if (expected instanceof Error) {
          if (err === expected) {
            reject(new AssertionError({
              message: message || `Expected error to not be ${expected}`,
              actual: err,
              expected,
              operator: 'doesNotReject',
              stackStartFn: doesNotReject
            }));
          }
        }
        resolve();
      });
    });
  }
}

/**
 * Run a function, expecting that it will not throw an error.
 *
 * @param fn Function to run
 * @param message Message or error during failure
 */
export function match(actual: string, expected: RegExp, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.match(actual, expected, message);
  } else {
    if (!expected.test(actual)) {
      throw new AssertionError({
        message: message || `Expected ${actual} to match ${expected}`,
        actual,
        expected,
        operator: 'match',
        stackStartFn: match
      });
    }
  }
}

/**
 * Run a function, expecting that it will not throw an error.
 *
 * @param fn Function to run
 * @param message Message or error during failure
 */
export function doesNotMatch(actual: string, expected: RegExp, message?: string | Error): void {
  if (intrinsic) {
    intrinsic.doesNotMatch(actual, expected, message);
  } else {
    if (expected.test(actual)) {
      throw new AssertionError({
        message: message || `Expected ${actual} to not match ${expected}`,
        actual,
        expected,
        operator: 'doesNotMatch',
        stackStartFn: doesNotMatch
      });
    }
  }
}

/**
 * Determine if the provided value can be thrown, and if so, throw it.
 *
 * @param value Value to throw
 * @throws Provided value
 */
export function ifError(value: any): void {
  if (intrinsic) {
    intrinsic.ifError(value);
  } else {
    if (value === undefined || value === null) {
      return
    }
    throw value;
  }
}
