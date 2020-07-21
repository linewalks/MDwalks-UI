import React from 'react';
import { mount } from 'enzyme';
import ToggleButton from '@Components/button/ToggleButton'

const data = [
  {
    type: 'AA',
    text: '환자군',
  },
  {
    type: 'BB',
    text: '진단수',
  },
]

describe('ToggleButton Component', () => {
  let component;
  let onChange;
  beforeEach(() => {
    onChange = jest.fn((value) => value);
    component = mount(<ToggleButton data={data} onChange={onChange} />)
  })

  it('첫번째 항목은 랜더링 후 selected 되어 있다', () => {
    expect(component.find('button').at(0).prop('selected')).toEqual(true)
  })

  it('두번째 항목을 클릭하면 onChange 함수가 발생한다.', () => {
    component.find('button').at(1).simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  it('selected 된 항목은 click 하여도 onChange 가 발생하지 않는다', () => {
    component.find('button').at(1).simulate('click')
    expect(component.find('button').at(1).prop('selected')).toEqual(true)

    component.find('button').at(1).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('두번째 항목을 클릭하면 onChange 에 "BB" 을 넘긴다', () => {
    component.find('button').at(1).simulate('click')
    expect(onChange).toHaveBeenCalledWith('BB')
  })

  it('첫째 항목을 클릭하면 onChange 에 "AA" 을 넘긴다', () => {
    component.find('button').at(1).simulate('click')

    component.find('button').at(0).simulate('click')
    expect(onChange).toHaveBeenCalledWith('AA')
  })
})
