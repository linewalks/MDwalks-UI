module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "commonjs": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "airbnb", "airbnb/hooks"] ,
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
    }
};