// eslint.config.cjs
import globals from "globals";
import js from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginN from "eslint-plugin-n";
import eslintPluginPromise from "eslint-plugin-promise";

export default [
  {
    ignores: ["node_modules", "coverage", "dist"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    plugins: {
      import: eslintPluginImport,
      n: eslintPluginN,
      promise: eslintPluginPromise,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintPluginPromise.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "n/no-missing-import": "off", // for ESM imports
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          "newlines-between": "always",
        },
      ],
    },
  },
];