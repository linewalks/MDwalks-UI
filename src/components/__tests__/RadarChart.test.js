import React from 'react';
import { shallow, mount } from 'enzyme';
import RadarChart from '@Charts/RadarChart';

const data = {
  groupVariableWeights: {
    variables: [
      "a",
      "b",
      "c",
      "d",
      "e"
    ],
    weights: [
      0.1,
      0.2,
      0.3,
      0.4,
      0.5
    ]
  },
  patientVariableWeights: {
    variables: [
      "a",
      "b",
      "c",
      "d",
      "e"
    ],
    weights: [
      0.6,
      0.7,
      0.8,
      0.9,
      1
    ]
  }
}

describe('RadarChart Component', () => {
  let component, instance;
  beforeEach(() => {
    component = mount(
      <RadarChart 
        width={700} 
        height={650}
        radarCategory={data.groupVariableWeights.variables}
        groupData={data.groupVariableWeights.weights}
        patientData={data.groupVariableWeights.weights} 
      />)
    instance = component.instance()
  })

  it('renders placeholder when there is no data', () => {
    const wrapper = shallow(<RadarChart width={700} height={650} />)
    expect(wrapper.html()).toEqual("<div>No data is provided</div>");
  })

  it('renders properly when there is data', () => {
    expect(component.html().includes('highcharts-root')).toBeTruthy()
  })

  it('renders props when props is given', () => {
    const expectedPropsObj = {
      width: 700,
      height: 650,
      radarCategory: data.groupVariableWeights.variables,
      groupData: data.groupVariableWeights.weights,
      patientData: data.groupVariableWeights.weights
    }
    expect(component.get(0).props).toMatchObject(expectedPropsObj)
  })

  it('renders default props when there is no data props', () => {
    const wrapper = mount(<RadarChart />)
    const expecteddefaultPropsObj = {
      title: null,
      width: 1200,
      height: 1200,
      radarCategory: [
        "visit_info",
        "visit_history",
        "lab",
        "echo",
        "drug",
        "spect",
        "demo",
        "comorbidity",
        "cabgpci",
        "vitalsign"
      ],
      legendOpen: true
    }
    expect(wrapper.get(0).props).toMatchObject(expecteddefaultPropsObj)
  })
})
