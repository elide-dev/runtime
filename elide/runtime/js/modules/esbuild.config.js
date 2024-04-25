module.exports = {
  charset: "utf8",
  drop: ["debugger"],  // @TODO: disable console once we have code in each module
  minify: true,
  target: "es2021",
  treeShaking: false,
  legalComments: "external",
  keepNames: true,
  platform: "neutral",
  footer: {
      js: (
          "// Elide JS Builtins. Copyright (c) 2023, Sam Gammon and the Elide Project Authors. All rights reserved." +
          "\n// Components of this software are licensed separately. See https://github.com/elide-dev/elide for more."
      ),
  }
};
