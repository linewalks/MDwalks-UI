RadioBox example:

##### checked 가 없으면 처음에는 선택 된 radio 는 없습니다
```js
import { useState, useRef } from 'react';
import Button from '@Components/button/Button';

const RadioBoxExample = () => {
  const [info, setInfo] = useState({});
  const ref = useRef(null);

  const unCheckedAll = () => {
    ref.current.unCheckedAll()
  }

  return (
    <>
      <Button variant="primary" onClick={unCheckedAll}>unChecked All</Button>
      <section>
        <span>id: {info.id}</span>
        <span>{`  `}</span>
        <span>name: {info.name}</span>
      </section>

      <RadioBox
        ref={ref}
        onChange={(obj) => (setInfo(obj))}
        align="center"
        data={
          [
            {
              id: 1,
              name: 'name 1',
              checked: true,
            },
            {
              id: 2,
              name: 'name 2',
            },
            {
              id: 3,
              name: 'name 3',
            },
          ]
      } />
    </>
  )
}

RadioBoxExample()
```
