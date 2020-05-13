import XAxis from '@Components/charts/cartesian/XAxis'
import YAxis from '@Components/charts/cartesian/YAxis'

describe('XAxis and YAxis', () => {
  it('FontSize 가 같아야 한다', () => {
    expect(XAxis.defaultProps.fontSize).toBe(YAxis.defaultProps.fontSize)
  })
})
