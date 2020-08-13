RadioList example:

##### default
```js
import { useState, useRef } from 'react'

const RadioListExample = () => {
  const [selected, setSelected] = useState(1)
  return (
    <div style={{ height: 150 }}>
      <RadioList
        onChange={setSelected}
        align="left"
        data={
          [
            { id: 1, name: 'name 1' },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' },
          ]
        }
        selected={selected}
      />
    </div>
  )
}

RadioListExample()
```

##### using formatter
```js
import { useState, useRef } from 'react'
/*
 * formatter는 p tag 내부에 들어가므로 inline element를 사용해야하며,
 * 가령 span에 width를 부득이하게 주어야 한다면, display: inline-block을 적용합니다.
 */

const RadioListExample = () => {
  const [selected, setSelected] = useState(1)
  return (
    <div style={{ height: 150 }}>
      <RadioList
        onChange={setSelected}
        align="left"
        formatter={(item) => [<span>{item.id}</span>, <span style={{ marginLeft: 12 }}>{item.name}</span>]}
        data={
          [
            { id: 1, name: 'name 1' },
            { id: 2, name: 'name 2' },
            {
              id: 3,
              name: 'name 3 text-overflowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
            },
          ]
        }
        selected={selected}
      />
    </div>
  )
}

RadioListExample()
```

##### Multiple, Horizontal
```js
import { useState, useRef } from 'react'
import Button from '@Components/button/Button'

const RadioListExample = () => {
  const [data, setData] = useState(
  [
    { id: 1, name: 'name 1' },
    { id: 2, name: 'name 2' },
    { id: 3, name: 'name 3' },
    { id: 4, name: 'name 21' },
  ])
  const [selected, setSelected] = useState(1)
  const [selected1, setSelected1] = useState(2)
  
  const unCheckedAll = () => {
    setSelected(null)
    setSelected1(null)
  }

  const handleChangeData = () => {
    setData([
      { id: 1, name: 'name 1' },
      { id: 2, name: 'name 2' },
    ])
  }

  return (
    <div style={{ height: 200 }}>
      <Button variant="primary" onClick={unCheckedAll}>unChecked All</Button>
      <Button variant="primary" onClick={handleChangeData}>Change Data</Button>
        <RadioList
          onChange={setSelected}
          align="left"
          data={data}
          selected={selected}
          layout="horizontal"
        />
        <div style={{ height: 40 }} />
        <RadioList
          onChange={setSelected1}
          align="left"
          data={
            [
              { id: 11, name: 'name 1' },
              { id: 22, name: 'name 2' },
              { id: 33, name: 'name 3' },
              { id: 44, name: 'name 21' },
              { id: 55, name: 'name 31' },
              { id: 66, name: 'name 21' },
              { id: 77, name: 'name 31' },
              { id: 88, name: 'name 21' },
              { id: 99, name: 'name 31' },
            ]
          }
          selected={selected1}
          layout="horizontal"
          disabled
      />
    </div>
  )
}

RadioListExample()
```