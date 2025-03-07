module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:tailwindcss/recommended", "prettier"],
    plugins: ["react", "react-hooks", "tailwindcss"],
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
  };
  