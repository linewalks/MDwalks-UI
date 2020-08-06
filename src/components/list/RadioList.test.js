import React from 'react'
import { mount } from 'enzyme'
import RadioList from './RadioList'

const callback = jest.fn()

describe('RadioList', () => {
  let wrapper
  const formatter = jest.fn()
  const data = [
    { id: 1, name: 'name 1' },
    { id: 2, name: 'name 2' },
    { id: 3, name: 'name 3' },
    { id: 4, name: 'name 21' },
    { id: 5, name: 'name 31' },
  ]

  beforeEach(() => {
    wrapper = mount(
      <RadioList
        onChange={callback}
        align="left"
        data={data}
        selected={1}
        formatter={formatter}
      />,
    )
  })

  afterEach(() => {
    callback.mockClear()
    formatter.mockClear()
  })

  it('default', () => {
    expect(wrapper.find('div label')).toHaveLength(5)
    const targetId = 2
    wrapper.find('input').at(1).simulate('change', { target: { value: targetId } })
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(targetId)
  })

  it('이미 클릭 된 항목은 onChange를 발생시키지 않음', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 1 } })
    expect(callback).toBeCalledTimes(0)
  })

  it('formatter', () => {
    expect(formatter).toBeCalledTimes(wrapper.prop('data').length)
  })

  it('disabled', () => {
    const disabledWrapper = mount(
      <RadioList
        onChange={callback}
        align="left"
        data={
          [
            { id: 1, name: 'name 1' },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' },
            { id: 4, name: 'name 21' },
            { id: 5, name: 'name 31' },
          ]
        }
        selected={1}
        disabled
      />,
    )

    const targetId = 2
    disabledWrapper.find('input').at(1).simulate('change', { target: { value: targetId } })
    expect(callback).toBeCalledTimes(0)
  })
})
