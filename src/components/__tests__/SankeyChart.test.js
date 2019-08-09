import React from 'react';
import { shallow } from 'enzyme';
import SankeyChart from '@Charts/SankeyChart';

describe('set SelectNodes', () => {
  let wrapper, selectedNodes, data, instance
  beforeEach(() => {
    selectedNodes = [1]
    data = {
      nodes: [{name: 'a'}, {name: 'b'}, {name: 'c'}],
      links: [{source: 'a', target: 'c'}, {source: 'b', target: 'c'}]
    }
    wrapper = shallow(<SankeyChart selectedNodes={selectedNodes} data={data}/>);
    instance = wrapper.instance()
  })

  it('default', () => {
    const wrapper = shallow(<SankeyChart />)
    expect(wrapper.state('selectedNodes')).toEqual([]);
  })

  it('initialize', () => {
    expect(wrapper.state('selectedNodes')).toEqual(selectedNodes);
  })

  it('link connect check false', () => {
    expect(instance.linkConnectCheck('a', 'b')).toBe(false);
  })

  it('link connect check true', () => {
    expect(instance.linkConnectCheck('b', 'c')).toBe(true);
  })

})