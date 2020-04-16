import React from 'react'
import { mount } from 'enzyme'
import TooltipCompareContent from '@Components/tooltip/TooltipCompareContent'

const getDataByWraper = (wrapper) => {
  const map = wrapper.find('li').map((li, i) => {
    const spans = wrapper.find('li').at(i).find('span')
    return {
      fill: spans.at(0).prop('color'),
      name: spans.at(1).text(),
      value: spans.at(2).text(),
    }
  })

  return map
}

describe('TooltipBox Component', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <TooltipCompareContent
        active
        payload={[
          {
            dataKey: '1주이내', name: '1주이내', value: 150, payload: { name: '유지', '1주이내': 150, '1주~2주': 131 },
          },
          {
            dataKey: '1주~2주', name: '1주~2주', value: 131, payload: { name: '유지', '1주이내': 150, '1주~2주': 131 },
          },
        ]}
        colorObject={[
          ['#2c6ff5', '#0f3ca6'],
          ['#ffb157', '#d9840d'],
        ]}
        colorKeyMap={['유지', '변경']}
      />,
    )
  })

  it('check color', () => {
    expect(getDataByWraper(component)).toEqual([
      { fill: '#2c6ff5', name: '1주이내', value: '150' },
      { fill: '#0f3ca6', name: '1주~2주', value: '131' },
    ])
  })

  it('active is false', () => {
    component.setProps({ active: false })
    component.update()
    expect(component.find('li')).toHaveLength(0)
  })
})
