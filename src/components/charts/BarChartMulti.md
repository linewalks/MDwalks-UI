BarChart example:

```js
import { Themes } from '@Components/ChartColor';

<BarChartMulti
  title="Default"
  data={[
    [
      '추가',
      [
        {
          '2008년': '0.01',
          '2009년': '0.01',
          '2010년': '0.01',
          name: 'D,E',
        },
        {
          '2008년': '0.01',
          name: 'B,C,D',
        },
      ],
    ],
    [
      '변경',
      [
        {
          '2008년': '0.06',
          '2009년': '0.06',
          '2010년': '0.05',
          name: 'E',
        },
        {
          '2008년': '0.05',
          '2009년': '0.06',
          '2010년': '0.06',
          name: 'A',
        },
      ],
    ],
  ]}
  yDataKey={['2008년', '2009년', '2010년']}
  theme={Themes.ThemeArrangePrimarySea}
/>
```
