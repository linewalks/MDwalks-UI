const path = require('path')
const { version } = require('./package')

const ignore = [
  '**/__tests__/**',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/*.spec.{js,jsx,ts,tsx}',
  '**/*.d.ts',
]

module.exports = {
  title: 'MDwalks-UI Style Guide',
  require: [path.resolve(__dirname, 'src/assets/styles/reset.css')],
  components: [
    'src/assets/styles/font.ts',
    'src/components/**/*.{js,jsx,ts,tsx}',
  ],
  moduleAliases: {
    '@src': path.resolve(__dirname, 'src'),
    '@Components': path.resolve(__dirname, 'src/components'),
    '@Charts': path.resolve(__dirname, 'src/components/charts'),
    '@Cards': path.resolve(__dirname, 'src/components/card'),
    '@Styles': path.resolve(__dirname, 'src/assets/styles'),
  },
  version,
  ignore: ignore.concat([
    'src/components/table/THead.tsx',
    'src/components/table/TBody.tsx',
    'src/components/table/TFoot.tsx',
    'src/components/list/Item.tsx',
    'src/components/button/utility.ts',
    'src/components/pagination/Input.js',
    'src/components/notifications/index.js',
    'src/components/notifications/NotificationContainer.js',
    'src/components/notifications/NotificationManager.js',
    'src/components/notifications/Notifications.js',
    'src/components/charts/cartesian/*.js',
  ]),
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: '/src/assets/styles/SpoqaHanSansNeo.css',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Spoqa Han Sans Neo"',
    },
  },
  styleguideDir: 'docs',
  pagePerSection: true,
  sections: [
    {
      name: 'Typography',
      components: () => ['src/components/layout/Heading.tsx'],
      sections: [
        {
          name: 'Font',
          content: 'src/assets/styles/font.md',
        },
      ],
    },
    {
      name: 'Chart',
      components: () => [
        'src/components/ChartColor.tsx',
        'src/components/common/commonTag.tsx',
        'src/components/charts/BarGauge.tsx',
        'src/components/charts/RadiusGauge.tsx',
        'src/components/charts/LineChart.tsx',
        'src/components/charts/BarChart.tsx',
        'src/components/charts/BarChartMulti.tsx',
        'src/components/charts/Histogram.tsx',
        'src/components/charts/PieChart.tsx',
        'src/components/charts/Timeline.tsx',
        'src/components/charts/LineMergeTimeline.tsx',
        'src/components/charts/SankeyChart.tsx',
        'src/components/charts/RadarChart.tsx',
        'src/components/charts/TimeToEvent.tsx',
        'src/components/charts/TreeMap.tsx',
      ],
    },
    {
      name: 'Component',
      components: () => [
        'src/components/button/Button.tsx',
        'src/components/button/ButtonLink.tsx',
        'src/components/button/ButtonTextLink.tsx',
        'src/components/button/TextLink.tsx',
        'src/components/button/ToggleButton.tsx',
        'src/components/card/SelectedCard.tsx',
        'src/components/card/SummaryCard.tsx',
        'src/components/form/SelectBox.tsx',
        'src/components/form/Tooltip.tsx',
        'src/components/form/Input.tsx',
        'src/components/layout/Image.tsx',
        'src/components/layout/Navbar.tsx',
        'src/components/layout/Footer.tsx',
        'src/components/layout/Tabs.tsx',
        'src/components/list/CheckList.tsx',
        'src/components/list/CheckBox.tsx',
        'src/components/list/RadioList.tsx',
        'src/components/modal/Modal.tsx',
        'src/components/pagination/Pagination.tsx',
        'src/components/table/EmptyPlaceHolder.tsx',
        'src/components/table/Descriptions.tsx',
        'src/components/table/Table.tsx',
        'src/components/Toast/Toast.tsx',
        'src/components/paper/Heatmap.js',
        'src/components/progressbar/ProgressBar.tsx',
      ],
    },
  ],
}
