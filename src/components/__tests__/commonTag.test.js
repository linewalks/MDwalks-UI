import React from 'react';
import { mount } from 'enzyme';
// import renderer from 'react-test-renderer'
// import 'jest-styled-components'

import * as commonTag from '@Components/common/commonTag'

describe('Dot', () => {
  let component
  beforeEach(() => {
    component = mount(
      <commonTag.LegendList
        data={[
          {
            color: 'red',
            text: '환자군',
          },
          {
            color: 'blue',
            text: '진단수',
          },
        ]}
      />,
    )
  })

  it('default', () => {
    expect(component.find(commonTag.Legend)).toHaveLength(2)
    expect(component.find(commonTag.Dot)).toHaveLength(2)
    expect(component.find(commonTag.Dot).first().prop('style').marginRight).toEqual('8px')
    expect(component.find(commonTag.Dot).last().prop('style').marginRight).toEqual('8px')
  })

  it('color is List', () => {
    component.setProps({
      data: [
        {
          color: ['red', 'blue'],
          text: '환자군',
        },
        {
          color: 'blue',
          text: '진단수',
        },
      ],
    })

    const Legend = component.find(commonTag.Legend)
    const LegendFirstDots = Legend.first().find(commonTag.Dot)

    expect(Legend).toHaveLength(2)
    expect(LegendFirstDots).toHaveLength(2)
    expect(LegendFirstDots.first().prop('style').marginRight).toEqual('4px')
    expect(LegendFirstDots.last().prop('style').marginRight).toEqual('8px')
  })
})

describe('chartTitle', () => {
  it('default', () => {
    const title = 'title of Chart'
    const component = mount(
      <commonTag.chartTitle>{title}</commonTag.chartTitle>,
    )

    expect(component.text()).toBe(title)
  })

  it('title 이 없는 경우', () => {
    expect(commonTag.chartTitle({ children: '' })).toBe(null)
  })
})


describe('LegendList', () => {
  it('hide 인 경우', () => {
    expect(commonTag.LegendList({ hide: true })).toBe(null)
  })
})
