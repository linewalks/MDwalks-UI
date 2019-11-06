import _ from 'lodash'
const utility = require('@Components/button/utility');

it('addLight', () => {
  expect(utility.addLight(0, 0)).toBe('00')
  expect(utility.addLight('ff', 0)).toBe('ff')
  expect(utility.addLight('ff', 10)).toBe('ff')
  expect(utility.addLight('f0', 1)).toBe('f1')
})

it('lighten', () => {
  expect(utility.lighten('#ffffff', 0)).toBe('#ffffff')
  expect(utility.lighten('#cccccc', 10)).toBe('#e5e5e5')

  expect(utility.lighten('cccccc', 10)).toBe('#e5e5e5')
})

it('subtractLight', () => {
  expect(utility.subtractLight(0, 0)).toBe('00')
  expect(utility.subtractLight('ff', 0)).toBe('ff')
  expect(utility.subtractLight('ff', 10)).toBe('f5')
  expect(utility.subtractLight('f0', 1)).toBe('ef')

  expect(utility.subtractLight(0, 1)).toBe('00')
})

it('darken', () => {
  expect(utility.darken('#ffffff', 0)).toBe('#ffffff')
  expect(utility.darken('#cccccc', 10)).toBe('#b3b3b3')

  expect(utility.darken('ffffff', 0)).toBe('#ffffff')
})

it('darken', () => {
  expect(utility.hexToRGB('#ffffff', 0)).toBe('rgb(255,255,255)')
  expect(utility.hexToRGB('#cccccc', 0.1)).toBe('rgba(204,204,204,0.1)')
})
