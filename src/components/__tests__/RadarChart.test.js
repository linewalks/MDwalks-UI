import React from 'react';
import { mount } from 'enzyme';
import * as Rechart from 'recharts'
import RadarChart from '@Charts/RadarChart';
import * as commonTag from '@Components/common/commonTag'
import {
  getColorsByTheme, Themes,
} from '@Components/ChartColor'
import { getChilds } from '@Components/__tests__/utils'

const data = [
  {
    subject: 'Math', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Chinese', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'English', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Geography', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Physics', A: 85, B: 90, fullMark: 150,
  },
];

describe('RadarChart Component', () => {
  let component;
  const dataKey = ['A', 'B']
  beforeEach(() => {
    component = mount(
      <RadarChart
        data={data}
        nameKey="subject"
        dataKey={dataKey}
      />,
    )
  })

  it('LegendList', () => {
    const LegendList = component.find(commonTag.LegendList)
    expect(LegendList.prop('data').map(({ color }) => (color))).toEqual(getColorsByTheme(Themes.ThemeComparePrimarySea2, 2))
    expect(LegendList.prop('data').map(({ text }) => (text))).toEqual(dataKey)
    expect(LegendList.prop('textMap')).toEqual({})

    component.setProps({
      textMap: { A: 'Mike', B: 'Lily' },
    })

    expect(component.find(commonTag.LegendList).prop('textMap')).toEqual({ A: 'Mike', B: 'Lily' })
  })

  // 먼저 들어 온 것이 zIndex 위에 오기 위해서는
  // 먼저 들어 온 것이 뒤에 그려 저야 한다
  it('Radar', () => {
    const { Radar } = getChilds(component, Rechart.RadarChart)
    expect(Radar).toHaveLength(dataKey.length)

    expect(Radar.map((node) => (node.props.dataKey))).toEqual(dataKey.reverse())
  })
})
