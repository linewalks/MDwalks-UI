import * as Rechart from 'recharts'
import { colorV1 } from '@src/assets/styles/variables'

class YAxis extends Rechart.YAxis {
}

YAxis.defaultProps = {
  ...Rechart.YAxis.defaultProps,
  axisLine: false,
  tickLine: false,
  tickMargin: 10,
  stroke: colorV1.$grey08,
  fontSize: 14,
  custom: true,
}

export default YAxis
