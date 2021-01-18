import React from 'react'
import * as Rechart from 'recharts'
import { color } from '@src/assets/styles/variables'

const CartesianGrid = (props) => <Rechart.CartesianGrid {...props} />

CartesianGrid.displayName = 'CartesianGrid'
CartesianGrid.defaultProps = {
  ...Rechart.CartesianGrid.defaultProps,
  stroke: color.$grey04,
  custom: true,
}

export default CartesianGrid
