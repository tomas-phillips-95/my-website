/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "eslint:recommended",
    "plugin:prettier/recommended",
    // plugin does not play well with vue components
    // "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "prettier", "import"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "index",
          "sibling",
          "parent",
          "internal",
        ],
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
  },
  settings: {
    "import/extensions": [".ts", ".vue"],
    "import/resolver": {
      typescript: {},
    },
  },
};
