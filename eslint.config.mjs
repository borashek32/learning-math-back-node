import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2021,
    },
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  pluginJs.configs.recommended,
];
