CheckBox example:

```js
import { useState } from 'react';
import ChartConfig from '@src/helper/ChartConfig'
import Button from '@Components/button/Button';
const CheckBoxExample = () => {
  
  const onChange = (isChecked) => {
    alert(isChecked)
  }

  return (
    <>
      <CheckBox
        text="CheckBox"
        onChange={onChange}
      />
      <CheckBox
        text="CheckBox"
        onChange={onChange}
        disabled
      />
      <CheckBox
        text="CheckBox"
        onChange={onChange}
        defaultChecked
        disabled
      />
    </>
  )
}

CheckBoxExample()
```