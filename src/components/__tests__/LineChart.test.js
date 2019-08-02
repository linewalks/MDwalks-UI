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

  it('renders props when props is given', () => {
    const wrapper = mount(<LineChart 
                            title={'test'}
                            xAxisCategory={xAxisCategory}
                            data={data} 
                            xAxisTitle={'date'}
                            xAxisTitleAlign={'low'}
                            yAxisTitle={'value'}
                            yAxisTitleAlign={'high'} 
                          />)
    const propsObj = {
      title: 'test',
      xAxisTitle: 'date',
      xAxisTitleAlign: 'low',
      yAxisTitle: 'value',
      yAxisTitleAlign: 'high'
    }

    expect(wrapper.get(0).props).toMatchObject(propsObj)
  })

  it('renders default props when there is no props', () => {
    const wrapper = mount(<LineChart 
                            xAxisCategory={xAxisCategory}
                            data={data} 
                          />)
    const defaultPropsObj = {
      title: 'Line Chart',
      xAxisTitle: 'xAxis',
      xAxisTitleAlign: 'middle',
      yAxisTitle: 'yAxis',
      yAxisTitleAlign: 'middle'
    }

    expect(wrapper.get(0).props).toMatchObject(defaultPropsObj)
  })

})