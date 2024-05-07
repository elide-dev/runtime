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

module.exports = {
    charset: "utf8",
    drop: ["console", "debugger"],
    minify: true,
    target: "es2021",
    treeShaking: false,
    legalComments: "external",
    platform: "neutral",
    footer: {
        js: (
            "// Elide JS Runtime. Copyright (c) 2023, Sam Gammon and the Elide Project Authors. All rights reserved." +
            "\n// Components of this software are licensed separately. See https://github.com/elide-dev/elide for more."
        ),
    }
};
