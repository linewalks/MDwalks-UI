import React from 'react'
import { mount } from 'enzyme'
import * as Rechart from 'recharts'

import PieChart from '@Components/charts/PieChart'

import { getChilds } from '@Components/__tests__/utils'

const mockData = {
  pieChart: [
    { gender_name: 'Male', count: 7864, rate: 0.4222508591065292 },
    { gender_name: 'Female', count: 10760, rate: 0.5777491408934707 },
  ],
}

describe('PieChart', () => {
  const nameKey = 'gender_name'
  const dataKey = 'count'

  it('', () => {
    expect(true).toBe(true)
  })

  it('기본 렌더링', () => {
    const wrapper = mount(
      <PieChart
        title="Gender Distribution"
        data={mockData.pieChart}
        nameKey={nameKey}
        dataKey={dataKey}
      />,
    )

    const pieData = wrapper.find(Rechart.Pie).prop('data')
    expect(pieData[0][nameKey]).toBe(mockData.pieChart[0][nameKey])
    expect(pieData[1][nameKey]).toBe(mockData.pieChart[1][nameKey])
    expect(pieData[0][dataKey]).toBe(mockData.pieChart[0][dataKey])
    expect(pieData[1][dataKey]).toBe(mockData.pieChart[1][dataKey])
  })

  it('PieLegend가 legend 객체의 isPercent, dataKey, nameKey를 사용', () => {
    const wrapper = mount(
      <PieChart
        title="Gender Distribution"
        data={mockData.pieChart}
        nameKey={nameKey}
        dataKey={dataKey}
        legend={{
          isPercent: true,
          nameKey: 'gender_name',
          dataKey: 'rate',
        }}
      />,
    )

    const expected = '42.23 %'
    const legends = wrapper.find('li')
    expect(legends.find('span').at(1).text()).toBe(expected)
  })

  it('PieLegend는 legend 객체의 isPercent가 존재하지 않을 시에 PieChart의 isPercent 사용', () => {
    const wrapper = mount(
      <PieChart
        title="Gender Distribution"
        data={mockData.pieChart}
        nameKey={nameKey}
        dataKey="rate"
        isPercent
        legend={{
          nameKey: 'gender_name',
        }}
      />,
    )

    const expected = '42.23 %'
    const legends = wrapper.find('li')
    expect(legends.find('span').at(1).text()).toBe(expected)
  })
})

describe('PieChart', () => {
  let component
  const nameKey = 'gender_name'
  const dataKey = 'count'

  beforeEach(() => {
    component = mount(
      <PieChart
        title="Gender Distribution"
        data={mockData.pieChart}
        nameKey={nameKey}
        dataKey={dataKey}
      />,
    )
  })

  it('default', () => {
    const { Tooltip } = getChilds(component, Rechart.PieChart)
    expect(Tooltip).toHaveLength(1)
    expect(Tooltip[0].props.textMap).toEqual({})
  })

  it('set textMap to tooltip', () => {
    component.setProps({
      textMap: {
        '1주이내': 'AAA',
      },
    })

    const { Tooltip } = getChilds(component, Rechart.PieChart)
    expect(Tooltip[0].props.textMap).toEqual({ '1주이내': 'AAA' })
  })
})
