##### color, theme, themes 우선 순위
> 1. color, 2. themes, 3. theme(모든 상황에서 data.color가 존재하면 테마는 무시됩니다.)

LegendList example:

#### Single Color
```js
<LegendList
  data={[
    {
      color: 'red',
      text: '환자군',
    },
    {
      color: 'blue',
      text: '진단수',
    }
  ]}
/>
```
```js
<LegendList
  data={[
    {
      color: 'red',
      text: 'persons',
    },
    {
      color: 'blue',
      text: 'ages',
    }
  ]}
  textMap={{ persons: '환자군', ages: '연령대' }}
/>
```

#### Multiple Color : 
```js
<LegendList
  data={[
    {
      color: ['red', 'green'],
      text: '환자군',
    },
    {
      color: ['blue', 'pink'],
      text: '진단수',
    }
  ]}
/>
```

#### Using Theme : 
```js
import { Themes } from '@Components/ChartColor'

const show = () => (
  <>
    <LegendList
      data={[
        {
          text: '환자군',
        },
        {
          text: '진단수',
        }
      ]}
      theme={Themes.ThemeArrangePrimarySea}
    />
    <LegendList
      data={[
        {
          color: 'hotpink',
          text: '환자군',
        },
        {
          text: '진단수',
        }
      ]}
      theme={Themes.ThemeArrangePrimarySea}
    />
  </>
)

show()
```

#### Using Themes : 
```js
import { Themes } from '@Components/ChartColor'

const show = () => (
  <>
    <LegendList
      data={[
        {
          text: '환자군',
        },
        {
          text: '진단수',
        }
      ]}
      themes={[Themes.ThemeArrangePrimarySea, Themes.ThemeArrangeSecondaryTeal]}
    />
    <LegendList
      data={[
        {
          color: ['skyblue', 'hotpink'],
          text: '환자군',
        },
        {
          color: 'grey',
          text: '진단수',
        }
      ]}
      themes={[Themes.ThemeArrangePrimarySea, Themes.ThemeArrangeSecondaryTeal]}
    />
  </>
)

show()
```
