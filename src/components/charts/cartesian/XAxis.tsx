import React from 'react'
import * as Rechart from 'recharts'
import { color } from '../../../assets/styles/variables'

const XAxis = (props) => <Rechart.XAxis {...props} />

XAxis.defaultProps = {
  ...Rechart.XAxis.defaultProps,
  axisLine: { stroke: color.$grey06 },
  tickLine: false,
  tickMargin: 10,
  stroke: color.$grey08,
  fontSize: 14,
  custom: true,
}

XAxis.displayName = 'XAxis'
export default XAxis
