import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckList from '@Components/list/CheckList'
import _ from 'lodash'

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

/**
 * 선택이 변경 시 onChange 발생, param 으로는 선택된 id 를 넘긴다
 * isDisabeld 시 선택이 되지 않는다
 * 6개 이상 선택 되지 않는다
 * 6개 이상 호출 시 onError 발생 limit 계수를 넘긴다
 * limit 의 default 는 5 
 * unCheckedById 호출 시 해당 id 를 selectedList 에서 삭제 한다
 * option: limit
 * props.checkVisible 가 false 인 경우 선택 된 것은 보이지 않는다
 */
const limit = 5
let wrapper, instance, onChange, onError, selectedList

beforeEach(() => {
  selectedList = ['1']
  onChange = jest.fn()
  onError = jest.fn()
  wrapper = mount(<CheckList data={data} limit={limit} onChange={onChange} onError={onError} />)
  instance =  wrapper.instance()
})

it('default', () => {
  const expected = data.map(({name}) => name).join('')
  expect(wrapper.state('selectedList')).toEqual(selectedList)
  expect(wrapper.text()).toBe(expected)
  expect(wrapper.prop('limit')).toBe(limit)
  expect(wrapper.prop('checkVisible')).toBe(true)
})

it('check', () => {
  instance.onChangeTrigger = jest.fn()

  wrapper.find('input[type="checkbox"]').last().simulate('change')

  expect(instance.onChangeTrigger).toHaveBeenCalledWith(_.last(data).id)
})

it('onChange', () => {
  selectedList.push('6')
  wrapper.find('input[type="checkbox"]').last().simulate('change')
  expect(onChange).toHaveBeenCalledWith({selectedList})
  expect(instance.getCheckCount()).toBe(2)

  selectedList = _.without(selectedList, '6')
  wrapper.find('input[type="checkbox"]').last().simulate('change')
  expect(onChange).toHaveBeenCalledWith({selectedList})
  expect(instance.getCheckCount()).toBe(1)
})

describe('OnError', () => {
  it('false 인 항목을 click 시 onError 호출, onChange 는 호출 되지 않는다, onError 호출 시 limit 를 넘긴다', () => {
    wrapper.setState({'checkState': { '1': true, '2': true, '3': true, '4': true, '5': true, '6': false }});
    wrapper.setState({'selectedList': ['1', '2', '3', '4', '5']});

    wrapper.find('input[type="checkbox"]').last().simulate('change')
    expect(onError).toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith({limit})
  })

  it('true 인 항목을 click 시 onError 호출 되지 않고, onChange 는 호출 된다', () => {
    wrapper.setState({'checkState': { '1': true, '2': true, '3': true, '4': true, '5': true, '6': false }});
    wrapper.setState({'selectedList': ['1', '2', '3', '4', '5']});

    wrapper.find('input[type="checkbox"]').first().simulate('change')
    expect(onError).not.toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
  })
})

describe('disabled', () => {
  it('default', () => {
    expect(wrapper.prop('disabled')).toBe(false)
  })

  it('set', () => {
    wrapper.setProps({'disabled': true})
    expect(wrapper.prop('disabled')).toBe(true)
  })

  it('disabled 인 경우 click 되지 않는다', () => {
    wrapper.setProps({'disabled': true})
    instance.onChangeTrigger = jest.fn()
    
    expect(wrapper.find('input[type="checkbox"]').first().prop('disabled')).toBe(true)

    wrapper.find('input[type="checkbox"]').first().simulate('change')
    expect(instance.onChangeTrigger).toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('unCheckedById', () => {
  it('해당 ID 가 true 인 경우 onChange 호출', () => {
    instance.unCheckedById(1)

    selectedList = _.without(selectedList, '1')
    expect(onChange).toHaveBeenCalledWith({selectedList})
  })

  it('해당 ID 가 false 인 경우 onChange 호출 되지 않는다', () => {
    instance.unCheckedById(2)

    selectedList = _.without(selectedList, '2')
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('checkVisible 가 false 인 경우', () => {
  it('default', () => {
    wrapper.setProps({checkVisible: false})
    const expected = data.map(({name, checked}) => checked ? '' : name).join('')
    expect(wrapper.text()).toBe(expected)
  })
})