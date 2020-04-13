import {
  // ColorSet,
  getColorsByTheme, Themes, ColorSetMap,
} from '@Components/ChartColor'

describe('', () => {
  it('v1', () => {
    expect(getColorsByTheme('blue')).toEqual(['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'])
    expect(getColorsByTheme('green')).toEqual(['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'])
    expect(getColorsByTheme('compare')).toEqual(['#63a3f3', '#d686c8'])
  })

  it(`${Themes.ThemeComparePrimarySea}`, () => {
    expect(getColorsByTheme(Themes.ThemeComparePrimarySea, 2)).toEqual(
      [ColorSetMap.sea300, ColorSetMap.rose200],
    )
  })
})
