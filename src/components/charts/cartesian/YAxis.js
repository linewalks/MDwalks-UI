import * as Rechart from 'recharts'
import { color } from '@src/assets/styles/variables'

class YAxis extends Rechart.YAxis {
}

YAxis.defaultProps = {
  ...Rechart.YAxis.defaultProps,
  axisLine: false,
  tickLine: false,
  tickMargin: 10,
  stroke: color.$grey08,
  fontSize: 14,
  custom: true,
}

export default YAxis
