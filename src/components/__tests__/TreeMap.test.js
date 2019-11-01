import React from 'react';
import { shallow, mount } from 'enzyme';
import TreeMap from '@Charts/TreeMap';

const data = {
  parents: [
    {
      colorValue: 0,
      id: 'A',
      name: 'A',
      value: 3
    },
    {
      colorValue: 0,
      id: 'B',
      name: 'B',
      value: 9
    },
    {
      colorValue: 0,
      id: 'C',
      name: 'C',
      value: 17
    },
  ],

  children: [
    {
      colorValue: 0,
      name: 'CA1',
      parent: 'A',
      value: 4
    },
    {
      colorValue: 0,
      name: 'CA2',
      parent: 'A',
      value: 34
    },
    {
      colorValue: 0,
      name: 'CA3',
      parent: 'A',
      value: 14
    },
    {
      colorValue: 0,
      name: 'BBA1',
      parent: 'B',
      value: 48
    },
    {
      colorValue: 0,
      name: 'BBA2',
      parent: 'B',
      value: 81
    },
    {
      colorValue: 0,
      name: 'BBA3',
      parent: 'B',
      value: 65
    },
    {
      colorValue: 0,
      name: 'CBE1',
      parent: 'C',
      value: 29
    },
    {
      colorValue: 0,
      name: 'CBE2',
      parent: 'C',
      value: 99
    },
    {
      colorValue: 0,
      name: 'CBE3',
      parent: 'C',
      value: 75
    },
  ]
}

describe('TreeMap Component', () => {
  let component, instance, spy
  beforeEach(() => {
    component = mount(
      <TreeMap 
        data={[...data.parents, ...data.children]} 
      />)
    instance = component.instance()
  })

  it('데이터가 없으면, 에러메세지를 출력해야한다.', () => {
    const wrapper = shallow(<TreeMap />)
    expect(wrapper.html()).toEqual("<div><h1>No data is provided</h1></div>");
  })

  it('데이터가 있으면, 하이차트를 렌더한다.', () => {
    expect(component.html().includes('highcharts-root')).toBeTruthy()
  })

  it('Data Props를 정확하게 전달해야한다.', () => {
    const expectedPropsObj = {
        data: [...data.parents, ...data.children]
    }
    expect(component.get(0).props).toMatchObject(expectedPropsObj)
  })
})