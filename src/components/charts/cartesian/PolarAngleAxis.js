import * as Rechart from 'recharts'
import { colorV1 } from '@src/assets/styles/variables'

class PolarAngleAxis extends Rechart.PolarAngleAxis {
}

PolarAngleAxis.defaultProps = {
  ...Rechart.PolarAngleAxis.defaultProps,
  axisLine: { stroke: colorV1.$grey06 },
  tickLine: false,
  stroke: colorV1.$grey08,
  fontSize: 14,
  custom: true,
}

export default PolarAngleAxis
