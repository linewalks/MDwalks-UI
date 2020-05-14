import * as Rechart from 'recharts'
import { colorV1 } from '@src/assets/styles/variables'

class CartesianGrid extends Rechart.CartesianGrid {
}

CartesianGrid.defaultProps = {
  ...Rechart.CartesianGrid.defaultProps,
  stroke: colorV1.$grey04,
  custom: true,
}

export default CartesianGrid
