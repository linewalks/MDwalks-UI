import React from 'react'
import { mount } from 'enzyme'
import CheckList from '@Components/list/CheckList'
import Item from '@Components/list/Item'
import _ from 'lodash'

import ChartConfig from '@src/helper/ChartConfig'

/*
 * 선택이 변경 시 onChange 발생, param 으로는 선택된 id와 selected 를 넘긴다
 * disabled 시 선택이 되지 않는다
 * 6개 이상 선택 되지 않는다
 * 6개 이상 호출 시 onError 발생 limit 계수를 넘긴다
 * limit 의 default 는 5
 * props.checkVisible 가 false 인 경우 선택하면 해당 Item은 사라진다.
 */
describe('defaut', () => {
  const data = [
    {
      id: 1,
      name: 'name 1',
    },
    {
      id: 2,
      name: 'name 2',
    },
    {
      id: 3,
      name: 'name 3',
    },
    {
      id: 4,
      name: 'name 4',
    },
    {
      id: 5,
      name: 'name 5',
    },
    {
      id: 6,
      name: 'name 6',
    },
  ]

  const limit = 5
  let wrapper
  let onChange
  let onError
  let selected

  beforeEach(() => {
    selected = [1]
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(
      <CheckList
        data={data}
        selected={selected}
        limit={limit}
        onChange={onChange}
        onError={onError}
      />,
    )
  })

  it('default', () => {
    const expected = data.map(({ name }) => name).join('')
    expect(wrapper.text()).toBe(expected)
    expect(wrapper.prop('limit')).toBe(limit)
    expect(wrapper.prop('checkVisible')).toBe(true)
    expect(wrapper.prop('layout')).toBe(ChartConfig.Layout.VERTICAL)
    expect(wrapper.find(Item).at(0).prop('layout')).toBe(ChartConfig.Layout.VERTICAL)
  })

  it('check', () => {
    wrapper.find('input[type="checkbox"]').last().simulate('change')
    wrapper.update()
    const expectedId = _.last(data).id
    const expectedSelected = [...selected, expectedId]
    expect(onChange).toHaveBeenCalledWith(expectedId, expectedSelected)
  })

  it('onChange', () => {
    const lastId = _.last(data).id
    const firstId = _.first(data).id
    wrapper.find('input[type="checkbox"]').last().simulate('change')

    const expected = [...selected, lastId]
    expect(onChange).toHaveBeenLastCalledWith(lastId, expected)

    wrapper.setProps({ selected: expected })
    wrapper.find('input[type="checkbox"]').first().simulate('change')
    expect(onChange).toHaveBeenLastCalledWith(firstId, _.without(expected, firstId))
  })
})

describe('OnError', () => {
  const data = [
    {
      id: 1,
      name: 'name 1',
      checked: true,
    },
    {
      id: 2,
      name: 'name 2',
      checked: true,
    },
    {
      id: 3,
      name: 'name 3',
    },
  ]

  const limit = 2
  let wrapper
  let onChange
  let onError
  let selected

  beforeEach(() => {
    selected = [1, 2]
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(
      <CheckList
        data={data}
        selected={selected}
        limit={limit}
        onChange={onChange}
        onError={onError}
      />,
    )
  })

  it('false 인 항목을 click 시 onError 호출, onChange 는 호출 되지 않는다, onError 호출 시 limit 를 넘긴다', () => {
    wrapper.find('input[type="checkbox"]').last().simulate('change')
    wrapper.update()
    expect(onError).toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith({ limit })
  })

  it('true 인 항목을 click 시 onError 호출 되지 않고, onChange 는 호출 된다', () => {
    onError.mockClear()
    onChange.mockClear()
    wrapper.find('input[type="checkbox"]').first().simulate('change')
    expect(onError).not.toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
  })
})

describe('disabled', () => {
  const data = [
    {
      id: 1,
      name: 'name 1',
      checked: true,
    },
    {
      id: 2,
      name: 'name 2',
      checked: true,
    },
    {
      id: 3,
      name: 'name 3',
    },
  ]

  const limit = 2
  let wrapper
  let onChange
  let onError
  let selected

  beforeEach(() => {
    selected = [1]
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(
      <CheckList
        data={data}
        selected={selected}
        limit={limit}
        onChange={onChange}
        onError={onError}
        disabled
      />,
    )
  })

  it('disabled 인 경우 click 되지 않는다', () => {
    expect(wrapper.find('input[type="checkbox"]').first().prop('disabled')).toBe(true)
    wrapper.find('input[type="checkbox"]').first().simulate('change')
    expect(onError).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('checkVisible 가 false 인 경우', () => {
  const data = [
    {
      id: 1,
      name: 'name 1',
    },
    {
      id: 2,
      name: 'name 2',
    },
    {
      id: 3,
      name: 'name 3',
    },
  ]

  const limit = 2
  let wrapper
  let onChange
  let onError
  let selected

  beforeEach(() => {
    selected = [1]
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(
      <CheckList
        data={data}
        selected={selected}
        limit={limit}
        onChange={onChange}
        onError={onError}
        checkVisible={false}
      />,
    )
  })

  it('default', () => {
    wrapper.find('input[type="checkbox"]').first().simulate('change')
    expect(wrapper.text()).toBe('name 2name 3')
  })
})
