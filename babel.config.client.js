module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        targets: undefined,
        // debug: true
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  extends: './babel.config.plugins.js'
};

// https://kangax.github.io/compat-table/es6/
// https://kangax.github.io/compat-table/es2016plus/

// "@babel/preset-env":
//    * includes polyfills and code transforms

// "useBuiltIns: 'usage'":
//    * Adds specific imports for polyfills when they are used in each file
//      >>>>> a bundler will load the same polyfill only once <<<<<<
//    * configures handling of polyfills

// "corejs":
//    * injects correct imports for 'core-js' version
//    * when using "corejs: { version: 3, proposals: true }":
//      * enables polyfilling of every proposal supported by 'core-js'

// "targets": environment supported/targeted/compiled against (browser/node/android/electron)
//    * string | Array<string> | { [string]: string }, defaults to {}

// modules (default: "commonjs"):
// 'modules' option configures which module format ES6 modules are transpiled to:
//    * transpiled 'module' formats: "amd", "commonjs", "systemjs", "umd"
//    * do not transpile: false
