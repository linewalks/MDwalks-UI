export default {
  title: 'MDwalks-UI',
  description: 'MDwalks-UI Component document', 
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
  },
  dest: '/docs',
  base: '/MDwalks-UI/' // gatsby-config.tpl.js 참고
}