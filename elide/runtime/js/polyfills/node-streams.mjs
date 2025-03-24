/*
 * Copyright (c) 2025 Elide Technologies, Inc.
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

import {
  Readable,
  Writable,
  Transform,
  Duplex,
  pipeline,
  finished,
} from 'readable-stream/lib/stream.js';

function buildStreamsGlobal() {
  return {
    "Readable": Readable,
    "Writable": Writable,
    "Transform": Transform,
    "Duplex": Duplex,
    "pipeline": pipeline,
    "finished": finished,
  }
}

function initStreams(target) {
  target['Readable'] = Readable;
  target['Writable'] = Writable;
  target['Transform'] = Transform;
  target['Duplex'] = Duplex;
  target['stream'] = buildStreamsGlobal();
}

initStreams(globalThis);
