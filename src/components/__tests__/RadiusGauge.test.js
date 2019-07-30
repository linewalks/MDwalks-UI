import React from 'react';
import { shallow } from 'enzyme';
import RadiusGauge from '@Charts/RadiusGauge';

describe('RadiusGauge', () => {
  it('Score Props has vaild number 0', () => {
    const wrapper = shallow(<RadiusGauge width={300} height={200} score={0} />)
    expect(wrapper.html().includes('<text>0</text>')).toEqual(true);
  })

  it('Score Props has vaild number 1', () => {
    const wrapper = shallow(<RadiusGauge width={300} height={200} score={1} />)
    expect(wrapper.html().includes('<text>1</text>')).toEqual(true);
  })

  it('Score Props excluded Range renders error messege', () => {
    const wrapper = shallow(<RadiusGauge width={300} height={200} score={10} />)
    expect(wrapper.html()).toEqual("<div>Invalid Score</div>")
  })
})