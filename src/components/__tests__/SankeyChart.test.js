import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import SankeyChart from '@Charts/SankeyChart';

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

describe('set SelectNodes', () => {
  let wrapper, selectedNodes, data, instance
  beforeEach(() => {
    selectedNodes = []
    wrapper = shallow(<SankeyChart selectedNodes={selectedNodes} data={SankeyChartData}/>);
    instance = wrapper.instance()
  })

  it('default', () => {
    expect(wrapper.state('selectedNodes')).toEqual([]);
  })

  it('initialize', () => {
    expect(wrapper.state('selectedNodes')).toEqual(selectedNodes);
  })
})

describe('function', () => {
  let wrapper, instance, onChange
  beforeEach(() => {
    onChange = jest.fn()
    wrapper = mount(<SankeyChart selectedNodes={[]} data={SankeyChartData} onChange={onChange} />)
    instance = wrapper.instance()
  })

  it('selectedNodes', () => {
    wrapper.setState({'selectedNode': ['ER Admission']})

    instance.setSelectedNode('ER Admission')
    expect(wrapper.state('selectedNodes')).toEqual(['ER Admission'])

    instance.setSelectedNode('Re-operation')
    expect(wrapper.state('selectedNodes')).toEqual(['ER Admission', 'Re-operation'])
  });

  it('createLinkId', () => {
    expect(instance.createLinkId(['a'])).toEqual([])
    expect(instance.createLinkId(['a', 'b'])).toEqual(['aXb'])
    expect(instance.createLinkId(['a', 'b', 'c'])).toEqual(['aXb', 'bXc'])
  })


  it('link connect check false', () => {
    expect(instance.linkConnectCheck('ER Admission', 'Index Invasive Treatment')).toBe(false);
  })

  it('link connect check true', () => {
    expect(instance.linkConnectCheck('ER Admission', 'Re-operation')).toBe(true);
    expect(instance.linkConnectCheck('Re-operation', 'ER Admission')).toBe(true);
    expect(instance.linkConnectCheck('', 'ER Admission')).toBe(true);
  })

})

describe('Selected Snapshot', () => {
  it('default', () => {
    const selectedNodes = []
    const wrapper = mount(<SankeyChart selectedNodes={selectedNodes} data={SankeyChartData}/>);
    expect(toJson(wrapper.render())).toMatchSnapshot();
  });

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