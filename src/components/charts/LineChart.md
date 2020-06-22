LineChart example:

#### default
```js
  import { Themes } from '@Components/ChartColor';

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
    theme={Themes.ThemeArrangePrimarySea}
  >
  </LineChart>
  ```

#### add Label - yLabelAngle props로 y축 라벨을 회전 시킬 수 있습니다.

```js
  import { Themes } from '@Components/ChartColor';
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
      bottom: 20, left: 20,
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
    theme={Themes.ThemeArrangePrimarySea}
    yLabelAngle={-90}
  >
  </LineChart>
  ```

#### lineDot Props - line chart의 점 표시 여부
   
```js
  import { Themes } from '@Components/ChartColor';

  <LineChart
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
    theme={Themes.ThemeArrangePrimarySea}
    lineDot={false}
  >
  </LineChart>
  ```

#### AxisTicks - 축의 Tick을 제어 합니다. x축의 tick이 숫자인 경우 xAxisType을 number로 옵션을 줘야합니다.
   
```js
  import { Themes } from '@Components/ChartColor';

  <LineChart
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
    theme={Themes.ThemeArrangePrimarySea}
    lineDot={false}
    xAxisType="number"
    xAxisTicks={[0, 20, 40, 60, 80, 100]}
  >
  </LineChart>
  ```
