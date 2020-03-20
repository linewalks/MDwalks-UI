RadioBox example:

##### checked 가 없으면 처음에는 선택 된 radio 는 없습니다
```js
import { useState } from 'react';

const RadioBoxExample = () => {
  const [info, setInfo] = useState({});
  return (
    <>
      <section>
        <span>id: {info.id}</span>
        <span>{`  `}</span>
        <span>name: {info.name}</span>
      </section>

      <RadioBox
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