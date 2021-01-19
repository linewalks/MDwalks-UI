import React from 'react';
import { mount } from 'enzyme';
import LineChart from '@Charts/LineChart';
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import * as Rechart from 'recharts'

import { getChilds } from '@Components/__tests__/utils'

const data = [
  {
    age: 20,
    Persons: 88,
  },
  {
    age: 30,
    Persons: 272,
  },
  {
    age: 40,
    Persons: 568,
  },
  {
    age: 50,
    Persons: 932,
  },
  {
    age: 60,
    Persons: 3319,
  },
  {
    age: 70,
    Persons: 5394,
  },
  {
    age: 80,
    Persons: 3665,
  },
  {
    age: 90,
    Persons: 989,
  },
  {
    age: 100,
    Persons: 58,
  },
]

describe('LineChart Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <LineChart
        title="Example"
        data={data}
        xDataKey="age"
        xData={{
          label: {
            value: '건',
          },
        }}
        yDataKey="Persons"
        yData={{
          label: {
            value: '축',
          },
        }}
        theme="blue"
      />,
    )
  })

  it('데이터가 없을 때, placeholder를 렌더링 해야 한다.', () => {
    component.setProps({ data: [] })
    expect(component.find(EmptyPlaceHolder)).toHaveLength(1)
  })

  it('데이터가 있을 때, linechart를 렌더링 해야 한다.', () => {
    const { Line, XAxis, YAxis } = getChilds(component, Rechart.LineChart)
    expect(XAxis[0].props.children.type.displayName).toBe('Label')
    expect(YAxis[0].props.children.type.displayName).toBe('Label')
    expect(Line).toHaveLength(1)
  })
})

describe('unit', () => {
  let component

  beforeEach(() => {
    component = mount(
      <LineChart
        title="Example"
        data={data}
        xDataKey="age"
        yDataKey="Persons"
        theme="blue"
      />,
    )
  })

  it('default', () => {
    const { XAxis, YAxis } = getChilds(component, Rechart.LineChart)

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

    const { XAxis, YAxis } = getChilds(component, Rechart.LineChart)

    expect(XAxis[0].props.unit).toBe('x unit')
    expect(YAxis[0].props.unit).toBe('y unit')
  })
})
