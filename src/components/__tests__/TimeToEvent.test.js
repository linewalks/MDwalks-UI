import React from 'react';
import { shallow, mount } from 'enzyme';
import TimeToEvent from '@Charts/TimeToEvent';

const data = [
  {
    dataPoints: [
      {
        startTime: '2000-01-17T09:00:00',
        endTime: '2000-01-17T09:00:00',
      },
      {
        startTime: '2000-01-17T09:00:00',
        endTime: '2005-03-09T13:51:00',
      },
      {
        startTime: '2005-03-09T13:51:00',
        endTime: '2005-03-09T13:51:00',
      },
    ],
    label: ['Patient'],
    order: 0,
  },
  {
    dataPoints: [
      {
        startTime: '2000-01-17T09:00:00',
        endTime: '2000-01-17T09:00:00',
      },
      {
        startTime: '2000-01-17T09:00:00',
        endTime: '2009-03-09T13:51:00',
      },
      {
        startTime: '2009-03-09T13:51:00',
        endTime: '2009-03-09T13:51:00',
      },
    ],
    label: ['Group'],
    order: 1,
  },
]

let component;
beforeEach(() => {
  component = mount(<TimeToEvent data={data} />)
})

describe('TimeToEvent Component', () => {
  it('데이터가 없을때, 에러메세지를 출력해야 한다.', () => {
    component = shallow(<TimeToEvent />)
    expect(component.html()).toEqual('<div>No data is provided</div>')
  })

  // it('데이터 타입이 배열이 아니면, 에러메세지를 출력해야 한다.', () => {
  //   component = shallow(<TimeToEvent data={{ a: 'b' }} />)
  //   expect(component.html()).toEqual('<div>type is invalid</div>')
  // })

  it('데이터가 있으면 차트가 렌더되어야 한다.', () => {
    expect(component.html()).toContain('svg')
  })
})
