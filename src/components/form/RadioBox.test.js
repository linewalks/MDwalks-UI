import React from 'react'
import { mount } from 'enzyme'
import RadioBox from './RadioBox'

const callback = jest.fn()

describe('RadioBox', () => {
  it('default', () => {
    const wrapper = mount(
      <RadioBox
        onChange={callback}
        align="left"
        data={
          [
            { id: 1, name: 'name 1', checked: true },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' },
            { id: 4, name: 'name 21' },
            { id: 5, name: 'name 31' },
            { id: 6, name: 'name 22' },
            { id: 7, name: 'name 32' },
            { id: 8, name: 'name 23' },
            { id: 9, name: 'name 34' },
          ]
        }
      />,
    )

    expect(wrapper.find('div label')).toHaveLength(9)

    wrapper.find('div label span input').at(1).simulate('change', { target: { value: 2 } })
    expect(callback).toBeCalledTimes(1)
  })

  it('ComponentDidUpdate', () => {
    const wrapper = mount(
      <RadioBox
        onChange={callback}
        align="left"
        data={
          [
            { id: 1, name: 'name 1', checked: true },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' },
            { id: 4, name: 'name 21' },
            { id: 5, name: 'name 31' },
            { id: 6, name: 'name 22' },
            { id: 7, name: 'name 32' },
            { id: 8, name: 'name 23' },
            { id: 9, name: 'name 34' },
          ]
        }
      />,
    )

    const newData = [
      { id: 1, name: 'name 1' },
      { id: 2, name: 'name 2', checked: true },
    ]
    wrapper.instance().setSelectedList = jest.fn()
    wrapper.setProps({ data: newData })
    expect(wrapper.instance().setSelectedList).toBeCalledTimes(1)
  })
})
