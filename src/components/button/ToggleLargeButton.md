ToggleLargeButton example:

### 삭제 예정
```js
<ToggleLargeButton
  data={[
    {
      type: 'AA',
      text: '환자수',
    },
    {
      type: 'BB',
      text: '진단수'
    },
    {
      type: 'CC',
      text: '결과'
    }
  ]}
  onChange={(value) => alert(value)}
/>
```