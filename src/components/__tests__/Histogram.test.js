import React from 'react';
import { shallow, mount } from 'enzyme';
import Histogram from '@Charts/Histogram';

describe('Histogram Chart', () => {
  it('render Histogram', () => {
    const wrapper = mount(<Histogram title='Risk Score Histogram' />)
    const instance = wrapper.instance();
    jest.spyOn(instance, 'renderHistogram')
    instance.componentDidMount();
    expect(instance.renderHistogram).toHaveBeenCalledTimes(1)
  })
})