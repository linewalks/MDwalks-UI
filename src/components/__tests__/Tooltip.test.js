import React from 'react'
import { mount } from 'enzyme'
import { Tooltip as AntdTooltip } from 'antd'
import Tooltip from '@Components/form/Tooltip'

describe('Tooltip', () => {
  it('default', () => {
    const desc = '툴팁은 이러한 형태입니다.'
    const wrapper = mount(
      <Tooltip desc={desc}>툴팁</Tooltip>,
    )

    // 내부에 antd의 Tooltip이 존재
    expect(wrapper.find(AntdTooltip)).toHaveLength(1)
    const antdTooltip = wrapper.find(AntdTooltip)
    expect(antdTooltip.prop('placement')).toBe('bottomLeft')
    expect(antdTooltip.prop('title')).toBe(desc)
  })
})
