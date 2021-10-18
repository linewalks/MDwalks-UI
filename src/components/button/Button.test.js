import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import Button from '@Components/button/Button'

describe('default', () => {
  const ButtonText = 'Button Text'
  it('text', () => {
    const wrapper = mount(<Button>{ButtonText}</Button>)
    expect(wrapper.text()).toBe(ButtonText)
  })

  it('isLoading by String', () => {
    const wrapper = mount(<Button isLoading="true">{ButtonText}</Button>)
    expect(wrapper.text()).not.toBe(ButtonText)
    expect(wrapper.text()).toBe('loading...')
  })

  it('isLoading by Boolean ', () => {
    const wrapper = mount(<Button isLoading>{ButtonText}</Button>)
    expect(wrapper.text()).not.toBe(ButtonText)
    expect(wrapper.text()).toBe('loading...')
  })
})

describe('Button Size', () => {
  it('large', () => {
    const wrapper = mount(<Button size="lg" />)
    expect(wrapper.find('.mwc-button__lg')).toHaveLength(2)
  })

  it('xLarge', () => {
    const wrapper = mount(<Button size="xlg" />)
    expect(wrapper.find('.mwc-button__xlg')).toHaveLength(2)
  })

  it('middle', () => {
    const wrapper = mount(<Button size="md" />)
    expect(wrapper.find('.mwc-button__md')).toHaveLength(2)
  })
})
