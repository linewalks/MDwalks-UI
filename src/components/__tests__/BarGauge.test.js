import React from 'react';
import { shallow } from 'enzyme';
import BarGauge from '@Charts/BarGauge';

describe('BarGauge Component', () => {
  it('Score Props has vaild number 0', () => {
    const wrapper = shallow(<BarGauge score={0} />)
    expect(wrapper.html().includes('width:0%')).toEqual(true);
  })

  it('Score Props has vaild number 100', () => {
    const wrapper = shallow(<BarGauge score={100} />)
    expect(wrapper.html().includes('width:100%')).toEqual(true);
  })

  it('Score Props excluded Range renders error messege', () => {
    const wrapper = shallow(<BarGauge score={200} />)
    expect(wrapper.html()).toEqual("<div>Invalid Score</div>")
  })
})
