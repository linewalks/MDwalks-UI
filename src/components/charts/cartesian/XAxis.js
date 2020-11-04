import * as Rechart from 'recharts'
import { color } from '@src/assets/styles/variables'

class XAxis extends Rechart.XAxis {
}

XAxis.defaultProps = {
  ...Rechart.XAxis.defaultProps,
  axisLine: { stroke: color.$grey06 },
  tickLine: false,
  tickMargin: 10,
  stroke: color.$grey08,
  fontSize: 14,
  custom: true,
}

export default XAxis
