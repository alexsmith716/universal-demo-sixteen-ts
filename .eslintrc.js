module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    plugins: ['typescript'],
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    'react',
    'import'
  ],
  rules: {
    'global-require': 0,
    'indent': ['error', 2, {'SwitchCase': 1}],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-duplicate-imports': 0,
    'no-eval': 1,
    //
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    // 'import/no-default-export': 2,
    'import/no-duplicates': 2,
    'import/no-extraneous-dependencies': 0,
    //
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': [2, 'tab'],
    'react/jsx-indent-props': [2, 'tab'],
    'react/jsx-pascal-case': 2,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-closing-tag-location': 1,
    'react/jsx-wrap-multilines': 1,
    'react/jsx-boolean-value': 1,
    'react/no-array-index-key': 1,
    'react/prop-types': 0
  },
  "globals": {
    "__DEVELOPMENT__": true,
    "__CLIENT__": true,
    "__SERVER__": true,
    "__DISABLE_SSR__": true,
    "__DEVTOOLS__": true,
    "__DLLS__": true
  }
}