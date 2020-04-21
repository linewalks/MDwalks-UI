SummaryCard example:

```js
<SummaryCard
  data={{
    "Follow-up Patients": 24764,
    "High Risk Patients": '4,833',
    "A.I. Analysis Features": 780,
    "Total Patients": 572811
  }}
  events={{
    "Follow-up Patients": () => alert('Call click event')
  }}
/>
```