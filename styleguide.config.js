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
    'src/assets/styles/font.js',
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
    'src/components/table/THead.js',
    'src/components/table/TBody.js',
    'src/components/table/TFoot.js',
    'src/components/table/Columns.js',
    'src/components/toast/ToastList.js',
    'src/components/list/Item.js',
    'src/components/button/utility.js',
    'src/components/pagination/Input.js',
    'src/components/toast/ToastCtr.js',

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
        'src/components/button/TextLink.js',
        'src/components/button/ToggleButton.js',
        'src/components/card/SelectedCard.tsx',
        'src/components/card/SummaryCard.tsx',
        'src/components/form/SelectBox.js',
        'src/components/form/Tooltip.js',
        'src/components/layout/Image.tsx',
        'src/components/layout/Navbar.js',
        'src/components/layout/Footer.tsx',
        'src/components/layout/Tabs.js',
        'src/components/list/CheckList.js',
        'src/components/list/CheckBox.js',
        'src/components/list/RadioList.js',
        'src/components/modal/Modal.js',
        'src/components/pagination/Pagination.js',
        'src/components/table/EmptyPlaceHolder.js',
        'src/components/table/Descriptions.js',
        'src/components/table/Table.js',
        'src/components/paper/Heatmap.js',
      ],
    },
  ],
}
