LineChart example:

#### default
```js
  <LineChart
    title="Example"
    data={[
      {
        age: 20,
        Persons: 88
      },
      {
        age: 30,
        Persons: 272
      },
      {
        age: 40,
        Persons: 568
      },
      {
        age: 50,
        Persons: 932
      },
      {
        age: 60,
        Persons: 3319
      },
    ]}
    xDataKey="age"
    yDataKey="Persons"
    theme="blue"
  >
  </LineChart>
  ```

#### add Label

```js
  <LineChart
    title="add Label"
    xDataKey="age"
    xData={{
      label: {
        value: '건',
      }
    }}
    yDataKey="Persons"
    yData={{
      label: {
        value: '축',
      }
    }}
    margin={{
      top: 10, right: 5, bottom: 20, left: 20,
    }}
    data={[
      {
        age: 20,
        Persons: 88
      },
      {
        age: 30,
        Persons: 272
      },
      {
        age: 40,
        Persons: 568
      },
      {
        age: 50,
        Persons: 932
      },
      {
        age: 60,
        Persons: 3319
      },
    ]}
    theme="blue"
  >
  </LineChart>
  ```