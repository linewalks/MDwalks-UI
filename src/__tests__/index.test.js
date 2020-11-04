import * as index from '@src/index'
import _ from 'lodash'
import { version } from '@src/index'

import packageJson from '../../package.json'

const includeModule = [
  'version',
  'BarChart', 'BarChartMulti', 'BarGauge',
  'Button', 'ButtonLink', 'TextLink',
  'ButtonTextLink', 'CheckBox', 'CheckList',
  'DateUtility', 'Descriptions',
  'EmptyPlaceHolder', 'Footer',
  'Heading', 'Histogram',
  'Image', 'LineChart',
  'LineMergeTimeline', 'Modal',
  'Navbar', 'Pagination',
  'RadarChart', 'RadioList',
  'RadiusGauge', 'SankeyChart',
  'SelectBox', 'Tooltip', 'SelectedCard',
  'SummaryCard', 'Table',
  'Tabs', 'TimeToEvent', 'PieChart',
  'Timeline', 'ToastCtr',
  'ToggleButton', 'TooltipBox',
  'TreeMap', 'chartUtility',
  'commonTag', 'font',
  'variables', 'tableProperties', 'notifications', 'ChartColor',
]

it('include module', () => {
  expect(_.chain(index).keys().sort().value()).toEqual(includeModule.sort())
})

it('version', () => {
  expect(version).toBe(packageJson.version)
})
