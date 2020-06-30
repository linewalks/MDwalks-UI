RadioBox example:

##### checked 가 없으면 처음에는 선택 된 radio 는 없습니다
```js
import { useState, useRef } from 'react'
import Button from '@Components/button/Button'

const RadioBoxExample = () => {
  const [data, setData] = useState(
  [
    { id: 1, name: 'name 1', checked: true },
    { id: 2, name: 'name 2' },
    { id: 3, name: 'name 3' },
    { id: 4, name: 'name 21' },
    { id: 5, name: 'name 31' },
    { id: 6, name: 'name 22' },
    { id: 7, name: 'name 32' },
    { id: 8, name: 'name 23' },
    { id: 9, name: 'name 34' },
  ])
  const [info, setInfo] = useState({})
  const [info2, setInfo2] = useState({})
  const ref = useRef(null)
  const ref2 = useRef(null)

  const unCheckedAll = () => {
    ref.current.unCheckedAll()
    ref2.current.unCheckedAll()
  }

  const handleChangeData = () => {
    setData([{ id: 1, name: 'name 1', checked: true }, { id: 2, name: 'name 2' }])
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
          <span>id: {info.id}</span>
          <span>{`  `}</span>
          <span>name: {info.name}</span>
        </section>

        <div style={WrapRadioBoxStyles}>
          <RadioBox
            ref={ref}
            onChange={(obj) => (setInfo(obj))}
            align="left"
            data={data} />
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 12 }}>
        <section style={{ width: 200 }}>
          <span>id: {info2.id}</span>
          <span>{`  `}</span>
          <span>name: {info2.name}</span>
        </section>

        <div style={WrapRadioBoxStyles}>
          <RadioBox
            ref={ref2}
            onChange={(obj) => (setInfo2(obj))}
            align="left"
            data={
              [
                { id: 1, name: 'name 1', checked: true },
                { id: 2, name: 'name 2' },
                { id: 3, name: 'name 3' },
                { id: 4, name: 'name 21' },
                { id: 5, name: 'name 31' },
                { id: 6, name: 'name 22' },
                { id: 7, name: 'name 32' },
                { id: 8, name: 'name 23' },
                { id: 9, name: 'name 34' },
              ]
          } />
        </div>
      </div>
    </>
  )
}

RadioBoxExample()
```
