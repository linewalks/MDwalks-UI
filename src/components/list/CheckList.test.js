import React from 'react'
import { mount } from 'enzyme'
import CheckList from '@Components/list/CheckList'
import Item from '@Components/list/Item'
import _ from 'lodash'

import ChartConfig from '@src/helper/ChartConfig'

/*
 * 선택이 변경 시 onChange 발생, param 으로는 선택된 id 를 넘긴다
 * isDisabeld 시 선택이 되지 않는다
 * 6개 이상 선택 되지 않는다
 * 6개 이상 호출 시 onError 발생 limit 계수를 넘긴다
 * limit 의 default 는 5
 * unCheckedById 호출 시 해당 id 를 selectedList 에서 삭제 한다
 * option: limit
 * props.checkVisible 가 false 인 경우 선택 된 것은 보이지 않는다
 */
describe('defaut', () => {
  const data = [
    {
      id: 1,
      name: 'name 1',
      checked: true,
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
  let selectedList

  beforeEach(() => {
    selectedList = ['1']
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(<CheckList data={data} limit={limit} onChange={onChange} onError={onError} />)
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
    expect(wrapper.find('input[type="checkbox"]').last().prop('checked')).toBeFalsy()
    wrapper.find('input[type="checkbox"]').last().simulate('change')
    wrapper.update()
    expect(wrapper.find('input[type="checkbox"]').last().prop('checked')).toBeTruthy()
  })

  it('onChange', () => {
    selectedList.push('6')
    wrapper.find('input[type="checkbox"]').last().simulate('change')
    expect(onChange).toHaveBeenCalledWith({ newSelectedList: selectedList })

    selectedList = _.without(selectedList, '6')
    wrapper.find('input[type="checkbox"]').last().simulate('change')
    expect(onChange).toHaveBeenCalledWith({ newSelectedList: selectedList })
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

  beforeEach(() => {
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(<CheckList data={data} limit={limit} onChange={onChange} onError={onError} />)
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

  beforeEach(() => {
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(
      <CheckList data={data} limit={limit} disabled onChange={onChange} onError={onError} />,
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

  beforeEach(() => {
    onChange = jest.fn()
    onError = jest.fn()
    wrapper = mount(
      <CheckList
        data={data}
        limit={limit}
        checkVisible={false}
        onChange={onChange}
        onError={onError}
      />,
    )
  })

  it('default', () => {
    const expected = data.map(({ name, checked }) => (checked ? '' : name)).join('')
    expect(wrapper.text()).toBe(expected)
  })
})
