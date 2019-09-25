import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
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

const SankeyChartData = {
    "links": [
    {
      "source": "ER Admission",
      "target": "Re-operation",
      "value": 683
    },
    {
      "source": "Index Invasive Treatment",
      "target": "ER Death",
      "value": 44
    },
    {
      "source": "Re-operation",
      "target": "In Hospital Death",
      "value": 84
    },
    {
      "source": "Re-operation",
      "target": "ER Death",
      "value": 9
    },
  ],
  "nodes": [
    {
      "name": "Index Invasive Treatment"
    },
    {
      "name": "In Hospital Death"
    },
    {
      "name": "ER Admission"
    },
    {
      "name": "Re-operation"
    },
    {
      "name": "ER Death"
    },
  ]
}

describe('Selected Snapshot', () => {
  // it('default', () => {
  //   const selectedNodes = []
  //   const wrapper = mount(<SankeyChart selectedNodes={selectedNodes} data={SankeyChartData}/>);
  //   expect(toJson(wrapper.render())).toMatchSnapshot();
  // });

  it('ER Admission to Re-operation', () => {
    const selectedNodes = ['ER Admission', 'Re-operation']
    const wrapper = mount(<SankeyChart selectedNodes={selectedNodes} data={SankeyChartData}/>)
    expect(toJson(wrapper.render())).toMatchSnapshot();
  });

  it('Re-operation to ER Admission', () => {
    const selectedNodes = ['Re-operation', 'ER Admission']
    const wrapper = mount(<SankeyChart selectedNodes={selectedNodes} data={SankeyChartData}/>);
    expect(toJson(wrapper.render())).toMatchSnapshot();
  });
})