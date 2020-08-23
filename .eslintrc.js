module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    extends: [
        // "eslint:recommended",
        // "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        // place to specify ESLint rules - can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        // "typescript-eslint/no-unused-vars": "off",
    },
};
