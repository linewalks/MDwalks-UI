import React from 'react';
import { shallow, mount } from 'enzyme';
import LineChart from '@Charts/LineChart';

const data = [{
  "name" : "value",
  "data": [
    0.36,
    0.9
  ]
}]

const xAxisCategory = ["2030-06-26", "2032-07-11"]

describe('LineChart Component', () => {
  it('renders placeholder when there is no data', () => {
    const wrapper = shallow(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory} 
                          />)
    expect(wrapper.contains(<div><h1>No data is provided</h1></div>)).toBeTruthy()
  })

  it('renders properly when there is data', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data} 
                          />)

    expect(wrapper.html().includes('highcharts-root')).toBeTruthy()
  })

  it('renders title when title props is given', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data} 
                          />)
    expect(wrapper.get(0).props.title).toBe('test')
  })

  it('renders title when xAxisTitle props is given', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data}
                            xAxisTitle={'date'} 
                          />)
    expect(wrapper.get(0).props.xAxisTitle).toBe('date')
  })

  it('renders title when xAxisTitleAlign props is given', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data}
                            xAxisTitle={'date'}
                            xAxisTitleAlign={'low'} 
                          />)
    expect(wrapper.get(0).props.xAxisTitleAlign).toBe('low')
  })

  it('renders title when xAxisTitleAlign props is given', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data}
                            xAxisTitle={'date'}
                            xAxisTitleAlign={'low'}
                            yAxisTitle={'value'} 
                          />)
    expect(wrapper.get(0).props.yAxisTitle).toBe('value')
  })

  it('renders title when yAxisTitleAlign props is given', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data}
                            xAxisTitle={'date'}
                            xAxisTitleAlign={'low'}
                            yAxisTitle={'value'}
                            yAxisTitleAlign={'high'} 
                          />)
    expect(wrapper.get(0).props.yAxisTitleAlign).toBe('high')
  })

})