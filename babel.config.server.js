module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: undefined,
        corejs: false,
        targets: { node: 'current' },
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
//    * configures handling of polyfills

// "corejs":
//    * option only has an effect when used alongside "useBuiltIns: usage" or "useBuiltIns: entry"
//    * injects correct imports for 'core-js' version
//    * when using "corejs: { version: 3, proposals: true }":
//      * enables polyfilling of every proposal supported by 'core-js'

// "targets": environment supported/targeted/compiled against (browser/node/android/electron)

// Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set

// '@babel/plugin-transform-runtime',{corejs: {version: 3, proposals: true}}
//    * without: 626/999 KB
//    * with:    561/909 KB
