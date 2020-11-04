import * as Rechart from 'recharts'
import { color } from '@src/assets/styles/variables'

class CartesianGrid extends Rechart.CartesianGrid {
}

CartesianGrid.defaultProps = {
  ...Rechart.CartesianGrid.defaultProps,
  stroke: color.$grey04,
  custom: true,
}

export default CartesianGrid
