export default {
  title: 'MDwalks-UI',
  native: true,
  typescript: false,
  port: '9004',
  files: '**/*.{mdx}',
  ignore: ['CHANGELOG.md'],
  menu: ['Index'],
  htmlContext: {
    favicon: '/favicon.ico'
  },
  modifyBundlerConfig: (config) => {
    return config
  }
}