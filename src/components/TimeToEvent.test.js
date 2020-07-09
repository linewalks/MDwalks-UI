import React from 'react';
import { mount } from 'enzyme';
import TimeToEvent, {
  convertData,
  appendOrder,
  yTickFormatterCustom,
  xTickFormatterCustom,
  dateFormat,
} from '@Charts/TimeToEvent';
// import * as commonTag from '@Components/common/commonTag'
import * as Rechart from 'recharts'
import {
  // getColorsByTheme,
  Themes,
} from '@Components/ChartColor'
import _ from 'lodash'

import { getChilds } from '@Components/__tests__/utils'

describe('convertData', () => {
  const data1 = [
    {
      start: 250, end: 700, name: 'Patient', order: 1,
    },
    {
      start: 200, end: 800, name: 'Group', order: 2,
    },
  ];

  it('', () => {
    expect(convertData(data1)).toEqual([
      { value: 250, order1: 1, name: 'Patient' },
      { value: 700, order1: 1, name: 'Patient' },
      { value: 200, order2: 2, name: 'Group' },
      { value: 800, order2: 2, name: 'Group' },
    ])
  })
})

describe('appendOrder', () => {
  it('', () => {
    const arr = [
      { value: 'A' },
      { value: 'B' },
    ]
    expect(appendOrder(arr)).toEqual([
      { ...arr[0], order: 2 },
      { ...arr[1], order: 1 },
    ])
  })
})

describe('yTickFormatterCustom', () => {
  it('', () => {
    expect(yTickFormatterCustom({ order: 1 })).toBe('')
    expect(yTickFormatterCustom({ order: 1 }, { order1: 'A' })).toBe('A')
  })
})

describe('xTickFormatterCustom', () => {
  it('', () => {
    const date = new Date('2020-05-26')
    expect(xTickFormatterCustom(date)).toBe(2020)
    expect(xTickFormatterCustom(date, 2020)).toBe(0)
  })
})

describe('dateFormat', () => {
  it('', () => {
    const date = new Date('2020-05-26 10:09')
    expect(dateFormat(date)).toBe('2020-05-26')
  })
})

describe('RadarChart Component', () => {
  const data = [
    {
      start: new Date('2000-12-17T09:00:00').getTime(), end: new Date('2005-03-09T13:51:00').getTime(), name: 'Patient',
    },
    {
      start: new Date('2003-01-17T09:00:00').getTime(), end: new Date('2010-03-09T13:51:00').getTime(), name: 'Group',
    },
    {
      start: new Date('2000-01-17T09:00:00').getTime(), end: new Date('2000-12-20T09:00:00').getTime(), name: 'Total',
    },
    {
      start: new Date('2004-01-17T09:00:00').getTime(), end: new Date('2005-01-17T09:00:00').getTime(), name: 'Total2',
    },
    {
      start: new Date('2000-05-17T09:00:00').getTime(), end: new Date('2010-05-17T09:00:00').getTime(), name: 'Total3',
    },
  ];

  let component;
  beforeEach(() => {
    component = mount(
      <TimeToEvent
        data={data}
        theme={Themes.ThemeArrangePrimarySea}
      />,
    )
  })

  it('', () => {
    const { ReferenceLine } = getChilds(component, Rechart.ComposedChart)
    expect(ReferenceLine).toHaveLength(_.size(data) + 3)
  })
})
