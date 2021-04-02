import React from 'react';
import { mount } from 'enzyme';
import Input from '@Components/form/Input';

jest.useFakeTimers();
describe('Input', () => {
  let input;
  let submit;

  beforeEach(() => {
    submit = jest.fn();

    const wrapper = mount(
      <Input
        submit={(value) => {
          submit(value);
        }}
        interval={100}
      />,
    );
    input = wrapper.find('input');
  });

  it('default', () => {
    input.simulate('change', { target: { value: 'abcdefg' } });
    input.simulate('keypress', { key: 'Enter' });

    expect(submit).toHaveBeenCalledWith('abcdefg');
  });

  it('change', async () => {
    input.simulate('change', { target: { value: 'abcdefg' } });
    expect(submit).not.toHaveBeenCalled();

    await jest.advanceTimersByTime(100);

    expect(submit).toHaveBeenCalledWith('abcdefg');
  });
});
