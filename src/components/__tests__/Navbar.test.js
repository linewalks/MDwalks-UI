import React from 'react'
import { mount } from 'enzyme'
import Navbar from '@Components/layout/Navbar'

describe('Navbar', () => {
  it('default', () => {
    const innerStyle = { background: '#ffffff' }
    const children = <div>Navbar 테스트입니다.</div>
    const wrapper = mount(
      <Navbar style={innerStyle}>{children}</Navbar>,
    )

    expect(wrapper.find('nav').prop('style')).toEqual(innerStyle)
    expect(wrapper.prop('children')).toEqual(children)
  })
})
