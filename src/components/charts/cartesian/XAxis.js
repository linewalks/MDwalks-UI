import * as Rechart from 'recharts'
import { colorV1 } from '@src/assets/styles/variables'

class XAxis extends Rechart.XAxis {
}

XAxis.defaultProps = {
  ...Rechart.XAxis.defaultProps,
  axisLine: { stroke: colorV1.$grey06 },
  tickLine: false,
  tickMargin: 10,
  stroke: colorV1.$grey08,
  fontSize: 14,
}

export default XAxis
