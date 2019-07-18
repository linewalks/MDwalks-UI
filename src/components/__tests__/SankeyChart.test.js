import React from 'react';
import { shallow } from 'enzyme';
import SankeyChart from '../../components/charts/SankeyChart';

describe('set SelectNodes', () => {
  it('default', () => {
    const wrapper = shallow(<SankeyChart />)
    expect(wrapper.state('selectedNodes')).toEqual([]);
  })

  it('initialize', () => {
    const selectedNodes = [1]
    const wrapper = shallow(<SankeyChart selectedNodes={selectedNodes}/>);
    expect(wrapper.state('selectedNodes')).toEqual(selectedNodes);
  })
})