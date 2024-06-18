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
 * Intrinsic: Events.
 *
 * Provides event handling primitives.
 */

const { node_events } = primordials;

if (!node_events) {
  throw new Error(`The 'events' module failed to load its intrinsic API.`);
}

const intrinsic: any = node_events;

/**
 * The `Event` class.
 */
export const Event = globalThis['Event'];

/**
 * The `EventEmitter` class.
 */
export const EventEmitter = globalThis['EventEmitter'];

/**
 * The `EventListener` class.
 */
export const EventListener = globalThis['EventListener'];

/**
 * The `EventTarget` class.
 */
export const EventTarget = globalThis['EventTarget'];

// `events.EventEmitterAsyncResource` is not implemented yet.
/**
 * The `EventEmitterAsyncResource` class.
 */
// export const EventEmitterAsyncResource = globalThis['EventEmitterAsyncResource'];

/**
 * By default, a maximum of `10` listeners can be registered for any single event. This limit can be changed for
 * individual EventEmitter instances using the `emitter.setMaxListeners(n)` method. To change the default for all
 * EventEmitter instances, the `events.defaultMaxListeners` property can be used.
 *
 * If this value is not a positive number, a `RangeError` is thrown.
 *
 * Take caution when setting the `events.defaultMaxListeners` because the change affects all EventEmitter
 * instances, including those created before the change is made. However, calling `emitter.setMaxListeners(n)`
 * still has precedence over `events.defaultMaxListeners`.
 *
 * This is not a hard limit. The EventEmitter instance will allow more listeners to be added but will output a
 * trace warning to stderr indicating that a "possible EventEmitter memory leak" has been detected. For any single
 * `EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()` methods can be used to
 * temporarily avoid this warning:
 *
 * ```javascript
 * const EventEmitter = require('node:events');
 * const emitter = new EventEmitter();
 * emitter.setMaxListeners(emitter.getMaxListeners() + 1);
 * emitter.once('event', () => {
 *   // do stuff
 *   emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
 * });
 * ```
 *
 * The `--trace-warnings` command-line flag can be used to display the stack trace for such warnings.
 *
 * The emitted warning can be inspected with `process.on('warning')` and will have the additional emitter, type,
 * and count properties, referring to the event emitter instance, the event's name and the number of attached
 * listeners, respectively. Its name property is set to 'MaxListenersExceededWarning'.
 */
export const defaultMaxListeners = intrinsic['defaultMaxListeners'];

/**
 * This symbol shall be used to install a listener for only monitoring `'error'` events. Listeners installed using
 * this symbol are called before the regular `'error'` listeners are called.
 *
 * Installing a listener using this symbol does not change the behavior once an `'error'` event is emitted.
 * Therefore, the process will still crash if no regular `'error'` listener is installed.
 */
export const errorMonitor = intrinsic['errorMonitor'];

/**
 * Change the default `captureRejections` option on all new `EventEmitter` objects.
 */
export const captureRejections = intrinsic['captureRejections'];

/**
 * Value: `Symbol.for('nodejs.rejection')`
 */
export const captureRejectionsSymbol = Symbol.for('nodejs.rejection');

/**
 * Returns the currently set max amount of listeners.
 *
 * For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on the emitter.
 * For `EventTarget`s this is the only way to get the max event listeners for the event target.
 *
 * If the number of event handlers on a single `EventTarget` exceeds the max set, the `EventTarget`
 * will print a warning.
 *
 * @param emitter The `EventEmitter` or `EventTarget` to get the max listeners from
 * @returns The currently set max amount of listeners
 */
export function getMaxListeners(emitter: typeof EventEmitter | typeof EventTarget): number {
  return intrinsic.getMaxListeners(emitter);
}

/**
 * Sets the max amount of listeners for the given `EventEmitter` or `EventTarget`.
 *
 * @param emitter The `EventEmitter` or `EventTarget` to set the max listeners for
 * @param n The max amount of listeners to set
 */
export function setMaxListeners(emitter: typeof EventEmitter | typeof EventTarget, n: number): void {
  intrinsic.setMaxListeners(emitter, n);
}

/**
 * A class method that returns the number of listeners for the given `eventName` reigstered on the given `emitter`.
 *
 * @param emitter The `EventEmitter` to get the listener count from
 * @param event The event name to get the listener count for
 * @returns The number of listeners for the given `eventName` reigstered on the given `emitter`
 */
export function listenerCount(emitter: typeof EventEmitter, event: string | symbol): number {
  return intrinsic.listenerCount(emitter, event);
}

/**
 * Listens once to the `abort` event on the provided `signal`.
 *
 * Listening to the `abort` event on abort signals is unsafe and may lead to resource leaks since another third party
 * with the signal can call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change this since it would
 * violate the web standard. Additionally, the original API makes it easy to forget to remove listeners.
 *
 * This API allows safely using `AbortSignal`s in Node.js APIs by solving these two issues by listening to the event
 * such that `stopImmediatePropagation` does not prevent the listener from running.
 *
 * Returns a disposable so that it may be unsubscribed from more easily.

 * @param signal The `AbortSignal` to listen to
 * @param listener The listener to call when the `abort` event is emitted
 * @returns A disposable that can be used to unsubscribe the listener
 */
export function addAbortListener(signal: AbortSignal, listener: Function | EventListener): Disposable {
  return intrinsic.addAbortListener(signal, listener);
}

/**
 * Returns a copy of the array of listeners for the event named `eventName`.
 *
 * For `EventEmitter`s this behaves exactly the same as calling `.listeners` on the emitter.
 * For `EventTarget`s this is the only way to get the event listeners for the event target.
 *
 * This is useful for debugging and diagnostic purposes.
 *
 * @param emitter The `EventEmitter` or `EventTarget` to get the listeners from
 * @param event The event name to get the listeners for
 * @returns A copy of the array of listeners for the event named `eventName`
 */
export function getEventListeners(
  emitter: typeof EventEmitter | typeof EventTarget,
  event: string | symbol,
): EventListener[] {
  return intrinsic.getEventListeners(emitter, event);
}

/**
 * Shape of options which can be passed to `events.on`.
 */
export type OnEventOptions = {

}

/**
 * Shape of an async iterator provided as a return value for the `on` method.
 */
export type OnEventIterator = AsyncIterator<Event>;

/**
 * Create an async iterator for a given event (named `eventName`) within the scope of a given `EventEmitter`.
 *
 * The resulting iterator will emit events as they are emitted by the backing `EventEmitter`.
 *
 * @param emitter Event emitter to listen to events on
 * @param eventName Name of the event to listen to
 * @param options Options to configure the behavior of the event listener; optional
 */
export function on(
  emitter: typeof EventEmitter,
  eventName: string | symbol,
  options?: Partial<OnEventOptions>,
): OnEventIterator {
  return intrinsic.on(emitter, eventName, options);
}

/**
 * Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given event or that is rejected
 * if the EventEmitter emits `'error'` while waiting.
 *
 * The Promise will resolve with an array of all the arguments emitted to the given event. This method is
 * intentionally generic and works with the web platform `EventTarget` interface, which has no special
 * `'error'` event semantics and does not listen to the `'error'` event.
 *
 * @param emitter The `EventEmitter` to attach the listener to
 * @param listener The listener to attach to the emitter
 * @return Promise which fulfills with the arguments emitted to the event
 */
export async function once(
  emitter: typeof EventEmitter,
  listener: Function | EventListener,
): Promise<void> {
  return intrinsic.once(emitter, listener);
}
