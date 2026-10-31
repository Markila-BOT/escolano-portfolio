import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["tests/**/*.cjs"],
    rules: {
      // VM fixtures model CommonJS modules and never enter the Next application.
      "@next/next/no-assign-module-variable": "off",
    },
  },
  {
    files: ["email/**/*.tsx"],
    rules: {
      // These documents are rendered as email HTML, not Next pages.
      "@next/next/no-head-element": "off",
    },
  },
];

export default config;
