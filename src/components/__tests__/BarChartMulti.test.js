import React from 'react'
import _ from 'lodash'
import { mount } from 'enzyme'

import {
  BarChart,
  YAxis,
  Bar,
} from 'recharts'

import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import BarChartMulti from '@Components/charts/BarChartMulti'

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

const match = (props, Tag) => props.type && props.type.displayName === Tag.displayName

const findReChartTags = (root, Tag) => (
  _.chain(root)
    .flatMapDeep()
    .filter((props) => match(props, Tag))
    .value()
)

const findReChartTag = (root, Tag) => (
  _.chain(root)
    .flatMapDeep()
    .find((props) => match(props, Tag))
    .value()
)

describe('BarChartMulti', () => {
  it('set Property', () => {
    const YAxisWidth = 60
    const wrapper = mount(<BarChartMulti
      title={(<div />)}
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
      title={(<div />)}
      data={[]}
      yDataKey={['2008년', '2009년', '2010년']}
    />)

    expect(wrapper.find(EmptyPlaceHolder)).toHaveLength(1)
  })
})