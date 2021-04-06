module.exports = {
  // 스크립트가 실행되도록 설계된 환경. 각 환경은 미리 정의 된 특정 전역 변수 집합을 제공합니다.
  env: {
    browser: true,
    es6: true,
    jest: true,
    commonjs: true,
  },
  // 추가 규칙
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    quotes: [
      // 더블도 지원해야 하는 경우가 있을까?
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    semi: ['off', 'always'],
    'import/no-unresolved': 'off', // package.json 의 alias 를 가져 와야 하는가?
    'react/prop-types': [2, { ignore: ['children', 'style'] }], // children 를 선언할 필요는 없지 않을까?
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0, // 해당 룰로 인해서 라인이 부득이하게 길어지는 경우가 발생하여 off
    'react/forbid-prop-types': [0], // prop-types에서 [any, object, array]를 사용할 경우가 있음.
    'no-param-reassign': [2, { props: false }], // SSR 시에 res에 reassign을 해야함.
    'object-curly-newline': [
      2, // 해당 기능은 prettier와 충돌이 있어 제외합니다.
      {
        ObjectExpression: 'never',
        multiline: true, // import 과정에서 multiline 패턴이 있으므로 true로 설정.
        ImportDeclaration: 'never',
      },
    ],
  },
}
