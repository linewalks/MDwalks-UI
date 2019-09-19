import React from 'react';
import { shallow, mount } from 'enzyme';
import Histogram from '@Charts/Histogram';
import * as d3 from 'd3'

const data = {
  risks: d3.range(1000).map(d3.randomBates(10)),
  patientRisk: 0.42,
  avgRisk: 0.305
}

describe('Histogram Chart', () => {
  let wrapper, instance
  beforeEach(() => {
    wrapper = mount(<Histogram title='Risk Score Histogram' data={data} />);
    instance = wrapper.instance()
  })

  it('render Histogram', () => {
    jest.spyOn(instance, 'renderHistogram')
    instance.componentDidMount();
    expect(instance.renderHistogram).toHaveBeenCalledTimes(1)
  })

  it('render xAxis', () => {
    expect(wrapper.html().includes('gXAxis')).toBeTruthy()
  })

  it('render yAxis', () => {
    expect(wrapper.html().includes('gYAxis')).toBeTruthy()
  })

  it('render xAxisGridLine', () => {
    expect(wrapper.html().includes('gXAxisGridLine')).toBeTruthy()
  })

  it('testing', () => {
    console.log(wrapper.update().find('.bar'))
  })
})