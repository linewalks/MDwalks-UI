TimeToEvent example:

```js
import { Themes } from '@Components/ChartColor';
const data = [
  {
    start: new Date('2000-12-17T09:00:00').getTime(), end: new Date('2005-03-09T13:51:00').getTime(), name: 'Patient',
  },
  {
    start: new Date('2003-01-17T09:00:00').getTime(), end: new Date('2010-03-09T13:51:00').getTime(), name: 'Group',
  },
];

<TimeToEvent
  data={data}
  theme={Themes.ThemeArrangePrimarySea}
  xData={{
    unit: "Years"
  }}
  margin={{
    right: 50,
  }}
/>
```