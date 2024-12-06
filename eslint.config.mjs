import pluginJs from "@eslint/js"
import perfectionist from "eslint-plugin-perfectionist"
import prettierConfigRecommended from "eslint-plugin-prettier/recommended"
import pluginSecurity from "eslint-plugin-security"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["dist/", "node_modules/"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginSecurity.configs.recommended,
  perfectionist.configs["recommended-alphabetical"],
  { plugins: { "simple-import-sort": simpleImportSort } },
  prettierConfigRecommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "perfectionist/sort-exports": "off",
      "perfectionist/sort-imports": "off",
      semi: ["error", "never"],
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
    },
  },
]
