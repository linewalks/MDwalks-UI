module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb",
        "airbnb/hooks"
    ] ,
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'react/jsx-filename-extension': [1, {
          "extensions": [".js", ".jsx", ".ts", "tsx"]
        }],
        // 더블도 지원해야 하는 경우가 있을까?
        'quotes': ['error', 'single', {
          'allowTemplateLiterals': true
        }],
        'semi': ['off', 'always'],
        // package.json 의 alias 를 가져 와야 하는가?
        "import/no-unresolved": "off",
        // children 를 선언할 필요는 없지 않을까?
        "react/prop-types": [2, { ignore: ['children', 'style'] }],
        "no-console": ["error", { allow: ["warn", "error"] }],
    },
};