TimeToEvent example:

```js
<TimeToEventOld
  chartHeight={340}
  data={[
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
        }
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
        }
      ],
      label: ['Group'],
      order: 1,
    },
  ]}
/>
```