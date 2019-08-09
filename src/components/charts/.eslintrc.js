module.exports = {
    'parserOptions': {
      'ecmaVersion': 6,
      'sourceType': 'module',        
      "ecmaFeatures": {
        "jsx": true
      }   
    },
    'parser': 'babel-eslint',
    'extends': ['airbnb', 'react-app'],
    'plugins': ['react', 'jsx-a11y', 'import'],
    'env': {
      'browser': true,
      'node': true,
      'jest': true
    },
    'rules': {
      'linebreak-style': 0,
      'react/jsx-filename-extension': [1, {
        "extensions": [".js", ".jsx"]
      }],
      'quotes': ['error', 'single', {
        'allowTemplateLiterals': true
      }],
      'semi': ['off', 'always']
    },
    'root': true
  };