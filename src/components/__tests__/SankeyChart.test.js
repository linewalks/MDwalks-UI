import React from 'react';
import { shallow, mount } from 'enzyme';
import SankeyChart from '@Charts/SankeyChart';

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

  it('link connect check false', () => {
    const data = {
      nodes: [{name: 'a'}, {name: 'b'}, {name: 'c'}],
      links: [{source: 'a', target: 'c'}, {source: 'b', target: 'c'}]
    }
    const wrapper = shallow(<SankeyChart data={data} 
    />)
    const instance = wrapper.instance()
    expect(instance.linkConnectCheck('a', 'b', data.links)).toBe(false);
  })

  it('link connect check false', () => {
    const data = {
      nodes: [{name: 'a'}, {name: 'b'}, {name: 'c'}],
      links: [{source: 'a', target: 'c'}, {source: 'b', target: 'c'}]
    }
    const wrapper = shallow(<SankeyChart data={data} 
    />)
    const instance = wrapper.instance()
    expect(instance.linkConnectCheck('b', 'c', data.links)).toBe(true);
  })

})