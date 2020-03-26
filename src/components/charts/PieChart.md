RadarChart example:

```js
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
/>
```