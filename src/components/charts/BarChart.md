BarChart example:

```js
<BarChart
  title="Default"
  data={[
    {
      age: 20,
      Persons: 88,
      weight: 100,
    },
    {
      age: 30,
      Persons: 272,
      weight: 200,
    },
    {
      age: 40,
      Persons: 568,
      weight: 500,
    },
    {
      age: 50,
      Persons: 932,
      weight: 941,
    },
    {
      age: 60,
      Persons: 3319,
      weight: 2312,
    },
    {
      age: 70,
      Persons: 5394,
      weight: 5323,
    },
  ]}
  xDataKey="age"
  yDataKey="Persons"
/>
```

```js
<BarChart
  title="theme(green)"
  data={[
    {
      age: 20,
      Persons: 88,
      weight: 100,
    },
    {
      age: 30,
      Persons: 272,
      weight: 200,
    },
    {
      age: 40,
      Persons: 568,
      weight: 500,
    },
    {
      age: 50,
      Persons: 932,
      weight: 941,
    },
    {
      age: 60,
      Persons: 3319,
      weight: 2312,
    },
    {
      age: 70,
      Persons: 5394,
      weight: 5323,
    },
  ]}
  xDataKey="age"
  yDataKey={["Persons", "weight"]}
  theme="green"
/>
```

```js
<BarChart
  title="vertical"
  layout="vertical"
  data={[
    {
      age: 20,
      Persons: 88,
      weight: 100,
    },
    {
      age: 30,
      Persons: 272,
      weight: 200,
    },
    {
      age: 40,
      Persons: 568,
      weight: 500,
    },
    {
      age: 50,
      Persons: 932,
      weight: 941,
    },
    {
      age: 60,
      Persons: 3319,
      weight: 2312,
    },
    {
      age: 70,
      Persons: 5394,
      weight: 5323,
    },
  ]}
  xDataKey="age"
  yDataKey={["Persons", "weight"]}
  theme="compare"
/>
```

```js
<BarChart
  title="stackId"
  layout="vertical"
  stackId="a"
  data={[
    {
      age: 20,
      Persons: 88,
      weight: 100,
    },
    {
      age: 30,
      Persons: 272,
      weight: 200,
    },
    {
      age: 40,
      Persons: 568,
      weight: 500,
    },
    {
      age: 50,
      Persons: 932,
      weight: 941,
    },
    {
      age: 60,
      Persons: 3319,
      weight: 2312,
    },
    {
      age: 70,
      Persons: 5394,
      weight: 5323,
    },
  ]}
  xDataKey="age"
  yDataKey={["Persons", "weight"]}
  theme="compare"
/>
```