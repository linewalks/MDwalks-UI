RadioList example:

##### default
```js
import { useState, useRef } from 'react'

const RadioListExample = () => {
  const [selected, setSelected] = useState(1)
  return (
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

  const WrapRadioBoxStyles = {
    width: `calc(100% - 200px)`
  }

  return (
    <>
      <Button variant="primary" onClick={unCheckedAll}>unChecked All</Button>
      <Button variant="primary" onClick={handleChangeData}>Change Data</Button>
      <div style={{ display: 'flex', marginTop: 12 }}>
        <section style={{ width: 200 }}>
          <span>id: rl1</span>
          <span>{`  `}</span>
          <span>name: RadioList1</span>
        </section>

        <div style={WrapRadioBoxStyles}>
          <RadioList
            onChange={setSelected}
            align="left"
            data={data}
            selected={selected}
            layout="horizontal"
          />
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 12 }}>
        <section style={{ width: 200 }}>
          <span>id: rl2</span>
          <span>{`  `}</span>
          <span>name: RadioList2</span>
        </section>

        <div style={WrapRadioBoxStyles}>
          <RadioList
            onChange={setSelected1}
            align="left"
            data={
              [
                { id: 1, name: 'name 1' },
                { id: 2, name: 'name 2' },
                { id: 3, name: 'name 3' },
                { id: 4, name: 'name 21' },
                { id: 5, name: 'name 31' },
              ]
            }
            selected={selected1}
            layout="horizontal"
            disabled
        />
        </div>
      </div>
    </>
  )
}

RadioListExample()
```