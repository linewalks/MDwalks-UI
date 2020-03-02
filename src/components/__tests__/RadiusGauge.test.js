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
    expect(wrapper.html()).toEqual('<div>Invalid Score</div>')
  })

  it('Score Props Match Angle 0', () => {
    const wrapper = shallow(<RadiusGauge width={300} height={200} score={0} />)
    expect(wrapper.html().includes('rotate(0, 75, 3.1)')).toEqual(true)
  })

  it('Score Props Match Angle 90', () => {
    const wrapper = shallow(<RadiusGauge width={300} height={200} score={0.5} />)
    expect(wrapper.html().includes('rotate(90, 75, 3.1)')).toEqual(true)
  })

  it('Score Props Match Angle 180', () => {
    const wrapper = shallow(<RadiusGauge width={300} height={200} score={1} />)
    expect(wrapper.html().includes('rotate(180, 75, 3.1)')).toEqual(true)
  })
})
