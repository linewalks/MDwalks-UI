import React from 'react';
import { mount } from 'enzyme';
import Histogram from '@Charts/Histogram';
import * as d3 from 'd3'

const data = {
  avgRisk: 0.34,
  patientRisk: 0.45,
  risks: [
    0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19,
    0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28,
    0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37,
    0.41, 0.42, 0.43, 0.44, 0.45, 0.46,
    0.51, 0.52, 0.53, 0.54, 0.55,
    0.61, 0.62, 0.63, 0.64,
    0.71, 0.72, 0.73,
    0.81, 0.82,
    0.9,
  ],
}

let component
let instance
let histogram
let bins
let binsNumberArr
beforeEach(() => {
  component = mount(<Histogram data={data} />)
  instance = component.instance()
  histogram = d3
    .histogram()
    .value((d) => d)
    .domain(instance.xAxisScale.domain())
    .thresholds(instance.xAxisScale.ticks(10))

  bins = histogram(data.risks)
  binsNumberArr = bins.map((e) => e.length)
})

describe('Histogram Component', () => {
  it('histogram renders when data is no provided', () => {
    component = mount(<Histogram />)
    expect(component.html()).toContain('No data is provided')

    expect(instance.yAxisScale.domain()).toEqual([1, 25000])
    expect(instance.yAxis.tickValues()).toEqual([1, 10, 100, 1000, 10000, 25000])
    expect(instance.gridXAxis.tickValues()).toEqual([1, 10, 100, 1000, 10000, 25000])
  })

  it('histogram renders when data is provided', () => {
    expect(component.html()).toContain('svg')
  })

  it('histogram height Greater than max data height', () => {
    const histogramHeight = instance.yAxisHeight;
    const dataMaxNumHeight = instance.yAxisScale(Math.max(...binsNumberArr))
    expect(histogramHeight).toBeGreaterThan(dataMaxNumHeight)
  })

  it('데이터를 받으면 평균선 문구 Average Risk Score가 렌더링 되어야한다', () => {
    expect(component.html()).toContain('Average Risk Score')
  })

  it('yMaxValue값을 props로 받으면, yAxisScale 도메인과 tickValue 최대값이 변경되어야 한다.', () => {
    component.setProps({
      yMaxValue: 40000,
    })

    expect(instance.yAxisScale.domain()).toEqual([1, 40000])
    expect(instance.yAxis.tickValues()).toEqual([1, 10, 100, 1000, 10000, 40000])
    expect(instance.gridXAxis.tickValues()).toEqual([1, 10, 100, 1000, 10000, 40000])
  })
})
