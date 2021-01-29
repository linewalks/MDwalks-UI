module.exports = {
  title: 'Component Definition',
  tagline: 'MDwalks-UI',
  url: 'http://localhost:8942',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'linewalks',
  projectName: 'MDwalks-UI',
  themeConfig: {
    navbar: {
      title: 'MDwalks-UI.Component Definition',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/basic/introduction',
          activeBasePath: 'docus',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/linewalks/MDwalks-UI',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Basic Guide',
              to: 'docs/basic/CR_template',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/linewalks/MDwalks-UI',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Blog',
              href: 'https://blog.linewalks.com/',
            },
            {
              label: 'Homepage',
              href: 'https://linewalks.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Linewalks, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docus',
          sidebarPath: require.resolve('./src/pages/sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/pages/custom.css'),
        },
      },
    ],
  ],
};
