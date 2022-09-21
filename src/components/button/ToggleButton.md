ToggleButton example:

```js
<ToggleButton
  data={[
    {
      type: 'AA',
      text: <div>환자군</div>,
    },
    {
      type: 'BB',
      text: '진단수',
    },
    {
      type: 'CC',
      text: '기타',
    },
  ]}
  onChange={(type) => {
    console.log(type)
  }}
/>
```

```js
<ToggleButton
  size="lg"
  data={[
    {
      type: 'AA',
      text: '환자군',
    },
    {
      type: 'BB',
      text: '진단수',
    },
    {
      type: 'CC',
      text: '기타',
    },
  ]}
/>
```

```js
<ToggleButton
  size="sm"
  data={[
    {
      type: 'AA',
      text: <div>환자군</div>,
    },
    {
      type: 'BB',
      text: '진단수',
    },
    {
      type: 'CC',
      text: '기타',
    },
  ]}
  onChange={(type) => {
    console.log(type)
  }}
/>
```
