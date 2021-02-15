ProgressBar example

```js
<div style={{ width: 100 }}>
  <ProgressBar
    placement="top"
    state={46}
    totalState={100}
    size="md"
  />
</div>
```

```js
<div style={{ width: 100 }}>
  <ProgressBar
    placement="bottom"
    state={34}
    totalState={100}
    size="md"
  />
</div>
```

```js
<div style={{ width: 175 }}>
  <ProgressBar
    placement="right"
    state={23}
    totalState={100}
    size="md"
  />
</div>
```

```js
<div style={{ width: 175 }}>
  <ProgressBar
    placement="left"
    state={89}
    totalState={100}
    size="sm"
  />
</div>
```

```js
<div style={{ width: 200 }}>
  <ProgressBar
    width={200}
    placement="top"
    size="sm"
    isNotExistsLabel
  />
</div>
```

```js
<div style={{ width: 100 }}>
  <ProgressBar
    placement="top"
    state={10}
    totalState={50}
    size="sm"
    customLabel={<div>20%</div>}
  />
</div>
```

```js
<div style={{ width: 100 }}>
  <ProgressBar
    placement="top"
    state={10}
    totalState={50}
    size="sm"
    strokeColor="$grey10"
  />
</div>
```

```js
import { useState } from 'react'
import Button from '@Components/button/Button'

const ShowProgressBar = () => {
  const [random, setRandom] = useState(54)

  const handleButtonClick = () => {
    const newRandom = Math.floor((Math.random() * 100))
    setRandom(newRandom)
  }

  return (
    <div style={{ width: 159 }}>
      <Button onClick={handleButtonClick}>New State</Button>
      <div style={{ marginTop: 16 }}>
        <ProgressBar
          placement="right"
          state={random}
          totalState={100}
          size="sm"
        />
      </div>
    </div>
  )
}

ShowProgressBar()
```
