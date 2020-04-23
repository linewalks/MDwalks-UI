import React from 'react';
import { mount } from 'enzyme';

import ChartColor,
{
  getColorsByTheme, Themes, ColorSetMap,
  ChartColorSet, ChartColorTheme, toCamel,
} from '@Components/ChartColor'

describe('toCamel', () => {
  it('default', () => {
    expect(toCamel('aaa-bb-cc')).toBe('AaaBbCc')
  })
})

describe('', () => {
  it('v1', () => {
    expect(getColorsByTheme('blue')).toEqual(['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'])
    expect(getColorsByTheme('green')).toEqual(['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'])
    expect(getColorsByTheme('compare')).toEqual(['#63a3f3', '#d686c8'])
  })

  it(`${Themes.ThemeArrangePrimarySea}`, () => {
    expect(getColorsByTheme()).toEqual(
      [ColorSetMap.sea300, ColorSetMap.sea500],
    )
  })

  it(`${Themes.ThemeComparePrimarySea}`, () => {
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea, 2)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.rose200],
    )
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea, 3)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.rose200, ColorSetMap.gold100],
    )
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea, 4)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.rose200, ColorSetMap.gold100, ColorSetMap.teal400],
    )

    expect(getColorsByTheme(Themes.ThemeComparePrimarySea1)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.bluegrey80],
    )
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea2)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.bluegrey120],
    )
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea3)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.sea600],
    )
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea2, 3)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.bluegrey120, ColorSetMap.sea600],
    )
  })

  it(`${Themes.ThemeArrangeGradient}`, () => {
    expect(getColorsByTheme(Themes.ThemeArrangeGradientPrimarySea)).toEqual(
      [ColorSetMap.sea100, ColorSetMap.sea300, ColorSetMap.sea500],
    )
    expect(getColorsByTheme(Themes.ThemeArrangeGradientSecondaryTeal)).toEqual(
      [ColorSetMap.teal200, ColorSetMap.teal400, ColorSetMap.teal600],
    )
  })
})

describe('ChartColor', () => {
  it('default', () => {
    const wrapper = mount(<ChartColor />)
    expect(wrapper.find(ChartColorSet)).toHaveLength(7)
    expect(wrapper.find(ChartColorTheme)).toHaveLength(16)
  })
})
