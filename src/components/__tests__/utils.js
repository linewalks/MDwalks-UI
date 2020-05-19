import * as Rechart from 'recharts'

// import PieChart from '@Components/charts/PieChart'
import _ from 'lodash'

const match = (props, Tag) => props.type && props.type.displayName === Tag.displayName

export const findReChartTag = (root, Tag) => (
  _.chain(root)
    .flatMapDeep()
    .find((props) => match(props, Tag))
    .value()
)

export const findReChartTags = (root, Tag) => (
  _.chain(root)
    .flatMapDeep()
    .filter((props) => match(props, Tag))
    .value()
)

export const getChilds = (component, parent) => {
  const root = component.find(parent).prop('children')

  return {
    Bar: findReChartTags(root, Rechart.Bar),
    Line: findReChartTags(root, Rechart.Line),
    XAxis: findReChartTags(root, Rechart.XAxis),
    YAxis: findReChartTags(root, Rechart.YAxis),
    Tooltip: findReChartTags(root, Rechart.Tooltip),
  }
}
