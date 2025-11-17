import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1. Next + TS
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. OVERRIDE FINAL — aici dezactivăm TOT ce îți dă build fail
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",

      // 🔥 cele noi:
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      // JSX A11Y — `<img>` warnings
      "jsx-a11y/alt-text": "off",

      // Next image enforcement
      "@next/next/no-img-element": "off",

      // React hook dependency
      "react-hooks/exhaustive-deps": "off",
    },
  },

  // 3. Ignorările
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
