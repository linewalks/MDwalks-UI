import React from 'react';
import { mount } from 'enzyme';
import BarChart, { tickFormatterCustom } from '@Charts/BarChart';
import TooltipCompareContent from '@Components/tooltip/TooltipCompareContent'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import * as Rechart from 'recharts'
import * as commonTag from '@Components/common/cdmCommon'
import { Scrollbars } from 'react-custom-scrollbars';
import { Themes, getColorsByTheme } from '@Components/ChartColor'
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
        width={100}
      />,
    )

    Bar = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.Bar)
    XAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.XAxis)
    YAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.YAxis)
  })

  it('width 를 지정해 주어야 svg 를 접근 할 수 있다', () => {
    expect(component.find('svg').length).toBe(1)
  })

  it('scroll 이 아닌 경우 BarChart 는 하나만 그려져야 한다', () => {
    expect(component.find(Rechart.BarChart)).toHaveLength(1)
    expect(component.find(Scrollbars)).toHaveLength(0)
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
  const margin = {
    top: 10, right: 5, bottom: 10, left: 5,
  }
  beforeEach(() => {
    component = mount(
      <BarChart
        title="Example"
        data={data}
        xDataKey="age"
        yDataKey="Persons"
        theme="blue"
        margin={margin}
        scroll={{ y: 100 }}
      />,
    )
  })

  describe('render, set scroll height', () => {
    it('render', () => {
      expect(component.find(Rechart.BarChart)).toHaveLength(2)
      expect(component.find(Scrollbars).prop('style').height).toBe(100)
    })

    it('margin', () => {
      expect(component.find(Rechart.BarChart).at(0).prop('margin')).toEqual(_.extend({}, margin, { bottom: 0 }))
      expect(component.find(Rechart.BarChart).at(1).prop('margin')).toEqual(_.extend({}, margin, { top: 5 }))
      expect(component.find(Rechart.ResponsiveContainer).at(1).prop('height')).toBe(31 + margin.bottom)
    })
  })
})

describe('Label Component', () => {
  let component;
  const margin = {
    top: 5, right: 5, bottom: 40, left: 20,
  }
  beforeEach(() => {
    component = mount(
      <BarChart
        title="Example"
        data={data}
        xDataKey="age"
        xData={{
          label: {
            value: '건수',
          },
        }}
        yDataKey="Persons"
        yData={{
          label: {
            value: '축1',
          },
        }}
        margin={margin}
        theme="blue"
      />,
    )
  })

  it('check label', () => {
    const XAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.XAxis)
    expect(XAxis[0].props.children.type.displayName).toBe('Label')
    expect(XAxis[0].props.children.props.value).toBe('건수')

    const YAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.YAxis)
    expect(YAxis[0].props.children.type.displayName).toBe('Label')
    expect(YAxis[0].props.children.props.value).toBe('축1')
  })

  it('set scroll', () => {
    component.setProps({
      scroll: { y: 100 },
    })

    component.update()

    const XAxis = findReChartTags(component.find(Rechart.BarChart).at(0).prop('children'), Rechart.XAxis)
    expect(XAxis[0].props.children.type.displayName).toBe('Label')

    const YAxis = findReChartTags(component.find(Rechart.BarChart).at(0).prop('children'), Rechart.YAxis)
    expect(YAxis[0].props.children.type.displayName).toBe('Label')

    const XAxis1 = findReChartTags(component.find(Rechart.BarChart).at(1).prop('children'), Rechart.XAxis)
    expect(XAxis1[0].props.children.type.displayName).toBe('Label')

    const YAxis1 = findReChartTags(component.find(Rechart.BarChart).at(1).prop('children'), Rechart.YAxis)
    expect(YAxis1[0].props.children).toBe(undefined)
  })
})


describe('Group', () => {
  let component;
  let Bar
  beforeEach(() => {
    component = mount(
      <BarChart
        title="group"
        data={[
          {
            name: '유지',
            '1주이내': 150,
            '1주~2주': 131,
            '2주~1달': 330,
            '1달~3달': 680,
            '3달~반년': 357,
            '반년 후': 205,
          },
          {
            name: '변경',
            '1주이내': 663,
            '1주~2주': 573,
            '2주~1달': 1145,
            '1달~3달': 2455,
            '3달~반년': 1421,
            '반년 후': 679,
          },
        ]}
        xDataKey="name"
        yDataKey={['1주이내', '1주~2주', '2주~1달', '1달~3달', '3달~반년', '반년 후']}
        themes={[Themes.ThemeArrangePrimarySea, Themes.ThemeArrangeQuaternaryGold]}
      />,
    )

    Bar = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.Bar)
  })

  it('set bar color', () => {
    const colorSet = _.map(Bar, (bar) => (
      _.map(bar.props.children, ({ props }) => (props.fill))
    ))

    const expected = _.map(Bar, (bar, i) => ([
      getColorsByTheme(Themes.ThemeArrangePrimarySea, Bar.length)[i],
      getColorsByTheme(Themes.ThemeArrangeQuaternaryGold, Bar.length)[i],
    ]))

    expect(colorSet).toEqual(expected)
  })

  it('call tooltip', () => {
    const tooltip = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.Tooltip)
    expect(tooltip).toHaveLength(1)

    expect(tooltip[0].props.content.displayName).toBe(TooltipCompareContent.displayName)
  })

  it('call LegendList', () => {
    expect(component.find(commonTag.LegendList).at(0).prop('data')).toEqual([
      { color: ['#c0d7fc', '#fae0c3'], text: '1주이내' },
      { color: ['#92b9fc', '#fccc90'], text: '1주~2주' },
      { color: ['#2c6ff5', '#ffb157'], text: '2주~1달' },
      { color: ['#0f3ca6', '#d9840d'], text: '1달~3달' },
      { color: ['#0e2769', '#69400f'], text: '3달~반년' },
      { color: ['#091840', '#3d2408'], text: '반년 후' },
    ])
  })
})

describe('unit', () => {
  let component
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
  })

  it('default', () => {
    XAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.XAxis)
    YAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.YAxis)

    expect(XAxis[0].props.unit).toBe(undefined)
    expect(YAxis[0].props.unit).toBe(undefined)
  })

  it('set unit', () => {
    component.setProps({
      xData: {
        unit: 'x unit',
      },
      yData: {
        unit: 'y unit',
      },
    })

    XAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.XAxis)
    YAxis = findReChartTags(component.find(Rechart.BarChart).prop('children'), Rechart.YAxis)

    expect(XAxis[0].props.unit).toBe('x unit')
    expect(YAxis[0].props.unit).toBe('y unit')
  })
})
