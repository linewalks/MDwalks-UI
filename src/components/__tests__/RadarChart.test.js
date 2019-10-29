import React from 'react';
import { shallow, mount } from 'enzyme';
import RadarChart from '@Charts/RadarChart';

const data = {
  groupVariableWeights: {
    variables: [
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
    weights: [
      0.1767,
      0.21289999999999998,
      0.2940999999999999,
      0.15789999999999998,
      0.12090000000000001,
      0.0344,
      0.0012,
      0.0016,
      0,
      0 
    ]
  },
  patientVariableWeights: {
    variables: [
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
    weights: [
      0.8091,
      0.12,
      0.0367,
      0.0342,
      0,
      0,
      0,
      0,
      0,
      0
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
        patientData={data.patientVariableWeights.weights} 
      />)
    instance = component.instance()
  })

  it('renders placeholder when there is no data', () => {
    const wrapper = shallow(<RadarChart width={700} height={650} />)
    expect(wrapper.html()).toEqual("<div><h1>No data is provided</h1></div>");
  })

  it('renders properly when there is data', () => {
    expect(component.html().includes('highcharts-root')).toBeTruthy()
  })

  it('renders props when props is given', () => {
    const expectedPropsObj = {
      width: 700,
      height: 650,
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
      groupData: [
        0.1767,
        0.21289999999999998,
        0.2940999999999999,
        0.15789999999999998,
        0.12090000000000001,
        0.0344,
        0.0012,
        0.0016,
        0,
        0 
      ],
      patientData: [
        0.8091,
        0.12,
        0.0367,
        0.0342,
        0,
        0,
        0,
        0,
        0,
        0
      ] 
    }
    expect(component.get(0).props).toMatchObject(expectedPropsObj)
  })
})
