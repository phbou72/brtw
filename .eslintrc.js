module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["@typescript-eslint", "react"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
    rules: {
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-unused-vars": "error",
        "no-console": "warn",
        "no-spaced-func": 2,
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    settings: {
        react: {
            createClass: "createReactClass", // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: "React", // Pragma to use, default to "React"
            version: "detect", // React version. "detect" automatically picks the version you have installed.
            // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
            // default to latest and warns if missing
            // It will default to "detect" in the future
            flowVersion: "0.53", // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            "forbidExtraProps",
            { property: "freeze", object: "Object" },
            { property: "myFavoriteWrapper" },
        ],
        linkComponents: [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            "Hyperlink",
            { name: "Link", linkAttribute: "to" },
        ],
    },
};
