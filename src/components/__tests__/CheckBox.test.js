import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import CheckBox from '@Components/list/CheckBox'

const spyOnChange = jest.fn()

describe('CheckBox', () => {
  beforeEach(() => {
    spyOnChange.mockClear()
  })

  it('default', () => {
    const wrapper = mount(
      <CheckBox
        text="CheckBox"
        onChange={spyOnChange}
      />,
    )

    expect(spyOnChange).toBeCalledTimes(0)
    wrapper.find('input').simulate('change', { target: { checked: true } })
    expect(spyOnChange).toBeCalledTimes(1)
  })

  it('disabled', () => {
    const wrapper = mount(
      <CheckBox
        text="CheckBox"
        onChange={spyOnChange}
        disabled
      />,
    )

    expect(wrapper.find('input').prop('disabled')).toBeTruthy()
  })

  it('defaultChecked', () => {
    const wrapper = mount(
      <CheckBox
        text="CheckBox"
        onChange={spyOnChange}
        defaultChecked
      />,
    )

    expect(wrapper.find('input').prop('checked')).toBeTruthy()

    act(() => {
      wrapper.setProps({ defaultChecked: false })
    })
    wrapper.update()

    expect(wrapper.find('input').prop('checked')).toBeFalsy()
  })
})
