const path = require('path')
const { version } = require('./package');

const ignore = ['**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts']

module.exports = {
  title: 'MDwalks-UI Style Guide',
  require: [
    path.resolve(__dirname, 'src/assets/styles/reset.css'),
    path.resolve(__dirname, 'src/assets/styles/spoqaHansans.css'),
  ],
  components: [
    'src/assets/styles/font.ts',
    'src/components/**/*.{js,jsx,ts,tsx}',
  ],
  moduleAliases: {
    '@src': path.resolve(__dirname, 'src'),
    '@Components': path.resolve(__dirname, 'src/components'),
    '@Charts': path.resolve(__dirname, 'src/components/charts'),
    '@Cards': path.resolve(__dirname, 'src/components/card'),
  },
  version,
  ignore: ignore.concat([
    'src/components/table/THead.tsx',
    'src/components/table/TBody.tsx',
    'src/components/table/TFoot.tsx',
    'src/components/list/Item.tsx',
    'src/components/button/utility.ts',
    'src/components/pagination/Input.js',,

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
          href: 'https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Spoqa Han Sans", sans-serif',
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
        'src/components/ChartColor.js',
        'src/components/common/commonTag.js',
        'src/components/charts/BarGauge.js',
        'src/components/charts/RadiusGauge.js',
        'src/components/charts/LineChart.js',
        'src/components/charts/BarChart.js',
        'src/components/charts/BarChartMulti.js',
        'src/components/charts/Histogram.js',
        'src/components/charts/PieChart.js',
        'src/components/charts/Timeline.js',
        'src/components/charts/LineMergeTimeline.js',
        'src/components/charts/SankeyChart.js',
        'src/components/charts/RadarChart.js',
        'src/components/charts/TimeToEvent.js',
        'src/components/charts/TreeMap.js',
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
        'src/components/layout/Image.tsx',
        'src/components/layout/Navbar.js',
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
        'src/components/Toast/Toast.js',
        'src/components/paper/Heatmap.js',
      ],
    },
  ],
}
