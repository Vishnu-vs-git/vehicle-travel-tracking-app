import js from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: ["node_modules/**", "dist/**"],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules (non type-checked)
  ...tseslint.configs.recommended,

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
     
      // "@typescript-eslint/no-unsafe-assignment": "off",
      // "@typescript-eslint/no-unsafe-member-access": "off",
      // "@typescript-eslint/no-unsafe-argument": "off",
      // "@typescript-eslint/require-await": "off",
      // "@typescript-eslint/unbound-method": "off",
      // "@typescript-eslint/no-unnecessary-type-assertion": "off",
      // "@typescript-eslint/no-floating-promises": "off",

     
      "@typescript-eslint/no-empty-object-type": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],
    },
  },
];
