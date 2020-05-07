BarChart example:

```js
import * as cdmCommon from '@Components/common/cdmCommon';

<cdmCommon.BoxShadow>
  <cdmCommon.BoxShadowInner>
    <BarChart
      title="Empty and BoxShadow"
      data={[]}
      yDataKey="Persons"
    />
  </cdmCommon.BoxShadowInner>
</cdmCommon.BoxShadow>
```

```js
import { Themes } from '@Components/ChartColor';

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
  theme={Themes.ThemeArrangePrimarySea}
/>
```

```js
import { Themes } from '@Components/ChartColor';

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
  theme={Themes.ThemeArrangeSecondaryTeal}
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
  margin={{
    right: 25
  }}
  xDataKey="age"
  yDataKey={["Persons", "weight"]}
  theme="compare"
/>
```

 ```js
<BarChart
  title="scroll"
  layout="vertical"
  scroll={{ y: 300 }}
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
  title="label"
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
  margin={{
    top: 5, bottom: 20, left: 20,
  }}
  xDataKey="age"
  xData={{
    label: {
      value: '건',
    },
  }}
  yDataKey={["Persons", "weight"]}
  yData={{
    label: {
      value: '축',
    },
  }}
  theme="compare"
/>
```

```js
<BarChart
  title="scroll label"
  layout="vertical"
  scroll={{ y: 300 }}
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
  margin={{
    top: 5, bottom: 20, left: 20,
  }}
  xDataKey="age"
  xData={{
    label: {
      value: '건',
    },
  }}
  yDataKey={["Persons", "weight"]}
  yData={{
    label: {
      value: '축',
    },
  }}
  theme="compare"
/>
```

```js
import { Themes } from '@Components/ChartColor';

<BarChart
  title="group"
  data={[
    {
      "name": "유지",
      "1주이내": 150,
      "1주~2주": 131,
      "2주~1달": 330,
      "1달~3달": 680,
      "3달~반년": 357,
      "반년 후": 205,
    },
    {
      "name": "변경",
      "1주이내": 663,
      "1주~2주": 573,
      "2주~1달": 1145,
      "1달~3달": 2455,
      "3달~반년": 1421,
      "반년 후": 679,
    }
  ]}
  xDataKey="name"
  yDataKey={["1주이내", "1주~2주", "2주~1달", "1달~3달", "반년 후"]}
  themes={[Themes.ThemeArrangeSecondaryTeal, Themes.ThemeArrangeQuaternaryGold]}
/>
```