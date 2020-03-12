import React from 'react';
import { mount } from 'enzyme';
import Input from '@Components/pagination/Input';

describe('Input in pagination', () => {
  let wrapper;
  let input
  const initPage = 1
  const MAX = 10
  const MIN = 1

  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, 'useState')
  // useStateSpy.mockImplementation((init) => [init, setState]);

  let onChange

  beforeEach(() => {
    onChange = jest.fn();
    wrapper = mount(<Input max={MAX} min={MIN} initPage={initPage} onChange={onChange} />)
    input = wrapper.find('input')
  })

  it('enter 인 경우만 onChange 가 호출', () => {
    wrapper.simulate('change', { target: { value: 'abcdefg' } });
    wrapper.simulate('keypress', { key: '' });
    expect(onChange).not.toHaveBeenCalled()
  })

  it('input string', () => {
    wrapper.simulate('change', { target: { value: 'abcdefg' } });
    wrapper.simulate('keypress', { key: 'Enter' });
    expect(input.props().value).toBe(initPage)

    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('input number', () => {
    const inputValue = 6
    wrapper.simulate('change', { target: { value: inputValue } });
    wrapper.simulate('keypress', { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(inputValue)
  })

  it('input max number', () => {
    const inputValue = MAX + 1
    wrapper.simulate('change', { target: { value: inputValue } });
    wrapper.simulate('keypress', { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(MAX)
  })

  it('input min number', () => {
    const inputValue = MIN - 1
    wrapper.simulate('change', { target: { value: inputValue } });
    wrapper.simulate('keypress', { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(MIN)
  })
})
