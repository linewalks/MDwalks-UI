import React from 'react';
import { mount } from 'enzyme';
import BarChart, { tickFormatterCustom } from '@Charts/BarChart';
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import * as Rechart from 'recharts'
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash'


const data = [
  {
    age: 20,
    Persons: 88,
    weight: 100,
  },
  {
    age: 30,
    Persons: 272,
    weight: 200,
  },
  {
    age: 40,
    Persons: 568,
    weight: 500,
  },
  {
    age: 50,
    Persons: 932,
    weight: 941,
  },
  {
    age: 60,
    Persons: 3319,
    weight: 2312,
  },
  {
    age: 70,
    Persons: 5394,
    weight: 5323,
  },
]

const match = (props, Tag) => props.type && props.type.displayName === Tag.displayName

const findReChartTags = (root, Tag) => (
  _.chain(root)
    .flatMapDeep()
    .filter((props) => match(props, Tag))
    .value()
)

describe('default Component', () => {
  let component;
  let Bar
  let XAxis
  let YAxis
  beforeEach(() => {
    component = mount(
      <BarChart
        title="Example"
        data={data}
        xDataKey="age"
        yDataKey="Persons"
        theme="blue"
      />,
    )

    Bar = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.Bar)
    XAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.XAxis)
    YAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.YAxis)
  })

  it('scroll 이 아닌 경우 BarChart 는 하나만 그려져야 한다', () => {
    expect(component.find(Rechart.BarChart)).toHaveLength(1)
    expect(component.find(Scrollbars).prop('style').height).toBe(415)
  })

  it('데이터가 없을 때, placeholder를 렌더링 해야 한다.', () => {
    component.setProps({ data: [] })
    expect(component.find(EmptyPlaceHolder)).toHaveLength(1)
  })

  it('데이터가 있을 때, barchart를 렌더링 해야 한다.', () => {
    expect(Bar).toHaveLength(1)
  })

  it('XAxis props', () => {
    expect(XAxis[0].props.dataKey).toBe('age')
    expect(XAxis[0].props.type).toBe('category')
    expect(XAxis[0].props.tickFormatter).toBe(undefined)
  })

  it('YAxis props', () => {
    expect(YAxis[0].props.dataKey).toBe(undefined)
    expect(YAxis[0].props.type).toBe('number')
    expect(YAxis[0].props.tickFormatter.name).toBe('tickFormatter')
  })
})

describe('vertical Component', () => {
  let component;
  let Bar
  let XAxis
  let YAxis
  beforeEach(() => {
    component = mount(
      <BarChart
        title="vertical"
        data={data}
        layout="vertical"
        xDataKey="age"
        yDataKey="Persons"
        theme="blue"
      />,
    )

    Bar = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.Bar)
    XAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.XAxis)
    YAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.YAxis)
  })

  it('데이터가 없을 때, placeholder를 렌더링 해야 한다.', () => {
    component.setProps({ data: [] })
    expect(component.find(EmptyPlaceHolder)).toHaveLength(1)
  })

  it('데이터가 있을 때, barchart를 렌더링 해야 한다.', () => {
    expect(Bar).toHaveLength(1)
  })

  it('XAxis props', () => {
    expect(XAxis[0].props.dataKey).toBe(undefined)
    expect(XAxis[0].props.type).toBe('number')
    expect(XAxis[0].props.tickFormatter.name).toBe('tickFormatter')
  })

  it('YAxis props', () => {
    expect(YAxis[0].props.dataKey).toBe('age')
    expect(YAxis[0].props.type).toBe('category')
    expect(YAxis[0].props.tickFormatter).toBe(undefined)
  })
})

describe('stackId Component', () => {
  let component;
  let Bar
  const stackId = 'a'
  beforeEach(() => {
    component = mount(
      <BarChart
        title="stackId"
        data={data}
        stackId={stackId}
        xDataKey="age"
        yDataKey={['Persons', 'weight']}
        theme="blue"
      />,
    )

    Bar = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.Bar)
  })

  it('set stackId', () => {
    expect(Bar).not.toHaveLength(1)
    expect(_.every(Bar, (bar) => (bar.props.stackId === stackId))).toBe(true)
  })
})

it('tickFormatterCustom', () => {
  expect(tickFormatterCustom(1000)).toBe('1,000')
  expect(tickFormatterCustom(0.1, true)).toBe('10 %')
})

describe('Scroll Component', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <BarChart
        title="Example"
        data={data}
        xDataKey="age"
        yDataKey="Persons"
        theme="blue"
        scroll={{ y: 100 }}
      />,
    )
  })

  it('render, set scroll height', () => {
    expect(component.find(Rechart.BarChart)).toHaveLength(2)
    expect(component.find(Scrollbars).prop('style').height).toBe(100)
  })
})
