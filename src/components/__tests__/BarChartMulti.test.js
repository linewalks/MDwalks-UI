import React from 'react'
import { mount } from 'enzyme'

import {
  BarChart,
  YAxis,
  Bar,
} from 'recharts'
import * as Rechart from 'recharts'

import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import BarChartMulti from '@Components/charts/BarChartMulti'

import { findReChartTags, findReChartTag } from '@Components/__tests__/utils'

const data = [
  [
    '추가',
    [
      {
        '2008년': '0.01',
        '2009년': '0.01',
        '2010년': '0.01',
        name: 'D,E',
      },
      {
        '2008년': '0.02',
        '2009년': '0.04',
        '2010년': '0.06',
        name: 'C,D',
      },
      {
        '2009년': '0.00',
        name: 'C,D,E',
      },
      {
        '2008년': '0.01',
        name: 'B,C,D',
      },
    ],
  ],
  [
    '변경',
    [
      {
        '2008년': '0.06',
        '2009년': '0.06',
        '2010년': '0.05',
        name: 'E',
      },
      {
        '2008년': '0.39',
        '2009년': '0.41',
        '2010년': '0.41',
        name: 'C',
      },
      {
        '2008년': '0.02',
        '2009년': '0.02',
        '2010년': '0.02',
        name: 'B',
      },
      {
        '2008년': '0.01',
        name: 'B,C',
      },
      {
        '2008년': '0.05',
        '2009년': '0.06',
        '2010년': '0.06',
        name: 'A',
      },
    ],
  ],
]


describe('BarChartMulti', () => {
  it('set Property', () => {
    const YAxisWidth = 60
    const wrapper = mount(<BarChartMulti
      data={data}
      yDataKey={['2008년', '2009년', '2010년']}
    />)

    const firstBarChart = wrapper.find(BarChart).at(0)
    const LastBarChart = wrapper.find(BarChart).at(1)

    expect(firstBarChart.prop('margin')).toEqual({
      top: 0, right: 0, bottom: 0, left: 0,
    })
    expect(LastBarChart.prop('margin')).toEqual({
      top: 0, right: 0, bottom: 0, left: YAxisWidth * -1,
    })

    expect(mount(findReChartTag(firstBarChart.prop('children'), YAxis)).prop('domain')).toEqual([0, 0.5])
    expect(mount(findReChartTag(LastBarChart.prop('children'), YAxis)).prop('domain')).toEqual([0, 0.5])
    expect(mount(findReChartTag(firstBarChart.prop('children'), YAxis)).prop('width')).toEqual(YAxisWidth)

    expect(findReChartTags(firstBarChart.prop('children'), Bar)).toHaveLength(3)

    const tickFormatter = mount(findReChartTag(LastBarChart.prop('children'), YAxis)).prop('tickFormatter')
    expect(tickFormatter(0.1)).toBe('10 %')
  })

  it('data가 비어있는 경우', () => {
    const wrapper = mount(<BarChartMulti
      data={[]}
      yDataKey={['2008년', '2009년', '2010년']}
    />)

    expect(wrapper.find(EmptyPlaceHolder)).toHaveLength(1)
  })
})

describe('tooltip', () => {
  let component
  let firstBarChart
  let LastBarChart

  const getTooltip = () => {
    firstBarChart = component.find(BarChart).at(0)
    LastBarChart = component.find(BarChart).at(1)

    return [
      ...findReChartTags(firstBarChart.prop('children'), Rechart.Tooltip),
      ...findReChartTags(LastBarChart.prop('children'), Rechart.Tooltip),
    ]
  }

  beforeEach(() => {
    component = mount(
      <BarChartMulti
        data={data}
        yDataKey={['2008년', '2009년', '2010년']}
      />,
    )

    firstBarChart = component.find(BarChart).at(0)
    LastBarChart = component.find(BarChart).at(1)
  })

  it('default', () => {
    const tooltip = getTooltip()
    expect(tooltip).toHaveLength(2)
    expect(tooltip[0].props.textMap).toEqual({})
    expect(tooltip[1].props.textMap).toEqual({})
  })

  it('set textMap to tooltip', () => {
    component.setProps({
      textMap: {
        '2008년': 'AAA',
      },
    })

    const tooltip = getTooltip()

    expect(tooltip[0].props.textMap).toEqual({ '2008년': 'AAA' })
    expect(tooltip[1].props.textMap).toEqual({ '2008년': 'AAA' })
  })
})
