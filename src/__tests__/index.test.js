import * as index from '@src/index'
import _ from 'lodash'

const includeModule = [
  'BarChart', 'BarGauge',
  'Button', 'ButtonLink', 'TextLink',
  'ButtonTextLink', 'CheckList',
  'DateUtility', 'Descriptions',
  'EmptyPlaceHolder', 'Footer',
  'Heading', 'Histogram',
  'Image', 'LineChart',
  'LineMergeTimeline', 'Modal',
  'Navbar', 'Pagination',
  'RadarChart', 'RadioList', 'RadioBox',
  'RadiusGauge', 'SankeyChart',
  'SelectBox', 'SelectedCard',
  'SummaryCard', 'Table',
  'Tabs', 'TimeToEvent', 'PieChart',
  'Timeline', 'ToastCtr',
  'ToggleButton', 'TooltipBox',
  'TreeMap', 'chartUtility',
  'commonTag', 'font',
  'variables', 'notifications',
]

it('include module', () => {
  expect(_.chain(index).keys().sort().value()).toEqual(includeModule.sort())
})
