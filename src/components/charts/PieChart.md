RadarChart example:

```js
import { Themes } from '@Components/ChartColor'

const mockData = {
  pieChart: [
    { gender_name: 'Male', count: 7864, rate: 0.4222508591065292 },
    { gender_name: 'Female', count: 10760, rate: 0.5777491408934707 },
  ],
};

<PieChart
  title="Gender Distribution"
  data={mockData.pieChart}
  nameKey={'gender_name'}
  dataKey={'count'}
  theme={Themes.ThemeComparePrimarySea}
/>
```

```js
import { Themes } from '@Components/ChartColor';

<PieChart
  title="Gender Distribution"
  data={[
    { gender_name: 'M', count: 4300, rate: 0.43 },
    { gender_name: 'F', count: 5700, rate: 0.57 },
  ]}
  textMap={{ M: '남성', F: '여성' }}
  nameKey={'gender_name'}
  dataKey={'count'}
  theme={Themes.ThemeComparePrimarySea}
/>
```

```js
import { Themes } from '@Components/ChartColor'
import * as commonTag from '@Components/common/commonTag'

const mockData = {
  pieChart: [
    { gender_name: 'Male', count: 7864, rate: 0.4222508591065292 },
    { gender_name: 'Female', count: 10760, rate: 0.5777491408934707 },
  ],
};

<div style={{ width: 500 }}>
  <PieChart
    title="layout is Vertical"
    data={mockData.pieChart}
    nameKey={'gender_name'}
    dataKey={'count'}
    layout={"vertical"}
    theme={Themes.ThemeComparePrimarySea}
  />
</div>
```