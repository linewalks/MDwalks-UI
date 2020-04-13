import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import RadioBox from '@Components/form/RadioBox'

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
]

describe('default RadioBox', () => {
  let component;
  let setInfo
  beforeEach(() => {
    setInfo = jest.fn()
    component = mount(
      <RadioBox
        onChange={(obj) => (setInfo(obj))}
        align="center"
        data={data}
      />,
    )
  })

  it('checked', () => {
    expect(setInfo).toHaveBeenCalledTimes(0)
    expect(component.find('input').at(0).prop('checked')).toBe(true)
    component.find('input').at(1).simulate('change')
    expect(setInfo).toHaveBeenCalledTimes(1)

    expect(component.find('input').at(0).prop('checked')).toBe(false)
    expect(component.find('input').at(1).prop('checked')).toBe(true)
  })

  it('checked 된 것은 click 하여도 onChange 가 발생하지 않는다', () => {
    component.find('input').at(0).simulate('change')
    expect(setInfo).toHaveBeenCalledTimes(0)
  })

  it('disabled 되면 click 하여도 onChange 가 발생하지 않는다', () => {
    component.setProps({ disabled: true })
    component.find('input').at(1).simulate('change')
    expect(setInfo).toHaveBeenCalledTimes(0)
  })

  it('multi checked', () => {
    const multiCheckedData = [...data]
    multiCheckedData[1].checked = true
    component.setProps({ data: multiCheckedData })
    expect(component.find('input').map((node) => node.prop('checked'))).toEqual([true, false, false])
  })

  it('unCheckedAll', () => {
    component.instance().unCheckedAll()
    component.update()
    expect(component.find('input').map((node) => node.prop('checked'))).toEqual([false, false, false])
  })

  it('formatter', () => {
    const formatter = jest.fn()
    component.setProps({ formatter })
    expect(formatter).toHaveBeenCalledTimes(3)
  })

  it('disabled', () => {
    expect(component.find('input').map((node) => node.prop('disabled'))).toEqual([false, false, false])
    component.setProps({ disabled: true })
    expect(component.find('input').map((node) => node.prop('disabled'))).toEqual([true, true, true])
  })

  it('item disabled', () => {
    const cloneData = JSON.parse(JSON.stringify(data))
    cloneData[0].disabled = true
    component.setProps({ data: cloneData })
    expect(component.find('input').map((node) => node.prop('disabled'))).toEqual([true, false, false])

    cloneData[0].disabled = false
    component.setProps({ data: cloneData })
    expect(component.find('input').map((node) => node.prop('disabled'))).toEqual([false, false, false])
  })
})

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

describe('style RadioBox', () => {
  it('align center', () => {
    const tree = renderer.create(<RadioBox align="center" data={data} />)
    toHaveStyleRules(tree.toJSON().children[0], {
      margin: '0 auto',
    })

    renderer.act(() => {
      tree.update(<RadioBox align="left" data={data} />);
    })

    toHaveStyleRules(tree.toJSON().children[0], {
      margin: undefined,
      marginRight: 'auto',
    })

    renderer.act(() => {
      tree.update(<RadioBox align="right" data={data} />);
    })

    toHaveStyleRules(tree.toJSON().children[0], {
      margin: undefined,
      marginRight: undefined,
      marginLeft: 'auto',
    })
  })
})
