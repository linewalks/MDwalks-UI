import * as Rechart from 'recharts'
import { color } from '@src/assets/styles/variables'

class PolarAngleAxis extends Rechart.PolarAngleAxis {
}

PolarAngleAxis.defaultProps = {
  ...Rechart.PolarAngleAxis.defaultProps,
  axisLine: { stroke: color.$grey06 },
  tickLine: false,
  stroke: color.$grey08,
  fontSize: 14,
  custom: true,
}

export default PolarAngleAxis
