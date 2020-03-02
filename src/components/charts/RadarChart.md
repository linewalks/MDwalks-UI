RadarChart example:

```js
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
};

<RadarChart
  width={700}
  height={650}
  radarCategory={data.groupVariableWeights.variables}
  groupData={data.groupVariableWeights.weights}
  patientData={data.groupVariableWeights.weights}
/>
```