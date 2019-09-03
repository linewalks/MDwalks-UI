export default {
  title: 'MDwalks-UI',
  native: true,
  typescript: false,
  files: '**/*.{mdx}',
  ignore: ['CHANGELOG.md'],
  modifyBundlerConfig: (config) => {
    return config
  }
}