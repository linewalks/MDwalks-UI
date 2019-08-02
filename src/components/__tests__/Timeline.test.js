import React from 'react';
import { shallow, mount } from 'enzyme';
import Timeline from '@Charts/Timeline';


const timelineData = [
  {
    "dataPoints": [
      {
        startTime: "2000-03-08T15:43:00",
        endTime: "2000-03-09T13:51:00"
      },
      {
        startTime: "2000-03-09T13:52:00",
        endTime: "2000-03-11T13:52:00"
      },
      {
        startTime: "2000-03-17T09:00:00",
        endTime: "2000-03-17T09:00:00"
      },
      {
        startTime: "2000-04-11T09:30:00",
        endTime: "2000-04-11T09:30:00"
      },
      {
        startTime: "2000-05-12T10:15:00",
        endTime: "2000-05-12T10:15:00"
      },
      {
        startTime: "2000-07-14T09:15:00",
        endTime: "2000-07-14T09:15:00"
      },
      {
        startTime: "2000-09-26T11:01:00",
        endTime: "2000-09-26T11:01:00"
      },
      {
        startTime: "2001-02-02T09:00:00",
        endTime: "2001-02-02T09:00:00"
      },
      {
        startTime: "2001-04-20T09:00:00",
        endTime: "2001-04-20T09:00:00"
      },
      {
        startTime: "2001-07-13T09:00:00",
        endTime: "2001-07-13T09:00:00"
      },
      {
        startTime: "2001-10-12T09:00:00",
        endTime: "2001-10-12T09:00:00"
      },
      {
        startTime: "2002-01-04T09:15:00",
        endTime: "2002-01-04T09:15:00"
      },
      {
        startTime: "2002-04-10T16:00:00",
        endTime: "2002-04-10T16:00:00"
      },
      {
        startTime: "2002-07-20T20:36:00",
        endTime: "2002-07-20T21:40:00"
      },
      {
        startTime: "2002-09-06T13:40:00",
        endTime: "2002-09-06T13:40:00"
      }
    ],
    "label": [
      "a"
    ],
    "order": 0
  },
  {
    "dataPoints": [],
    "label": [
      "b"
    ],
    "order": 1
  },
  {
    "dataPoints": [
      {
        "startTime": "2015-06-26T00:00:00",
        "endTime": "2015-06-26T00:00:00"
      }
    ],
    "label": [
      "c"
    ],
    "order": 2
  },
  {
    "dataPoints": [
      {
        startTime: "2000-03-09T00:00:00",
        endTime: "2000-04-10T00:00:00"
      },
      {
        startTime: "2000-05-12T00:00:00",
        endTime: "2000-07-11T00:00:00"
      },
      {
        startTime: "2000-07-14T00:00:00",
        endTime: "2000-09-12T00:00:00"
      },
      {
        startTime: "2000-09-26T00:00:00",
        endTime: "2000-10-26T00:00:00"
      },
      {
        startTime: "2001-02-02T00:00:00",
        endTime: "2001-06-19T00:00:00"
      },
      {
        startTime: "2001-07-13T00:00:00",
        endTime: "2001-09-11T00:00:00"
      },
      {
        startTime: "2001-10-12T00:00:00",
        endTime: "2002-03-05T00:00:00"
      },
      {
        startTime: "2002-04-10T00:00:00",
        endTime: "2002-07-09T00:00:00"
      },
      {
        startTime: "2002-09-06T00:00:00",
        endTime: "2002-12-05T00:00:00"
      }
    ],
    "label": [
      "d"
    ],
    "order": 3
  },
]

describe('Timeline Component', () => {
  it('renders component when data is provided', () => {
    const wrapper = mount(<Timeline data={timelineData} />)
    const instance = wrapper.instance();
    jest.spyOn(instance, 'renderTimeline');
    instance.componentDidMount();
    expect(instance.renderTimeline).toHaveBeenCalledTimes(1);
  })

  it('renders placeholder when data is not provided', () => {
    const wrapper = mount(<Timeline />)
    const instance = wrapper.instance();
    jest.spyOn(instance, 'errorMessage');
    instance.componentDidMount();
    expect(instance.errorMessage).toHaveBeenCalledTimes(1);
  })
})
