Toast example:

```js
import { useState, useEffect } from 'react'
import ToastList from '@Components/toast/ToastList'
import Button from '@Components/button/Button';

const ToastExample = () => {
  return (
    <>
      <Button variant="primary">add Noti</Button>
      <ToastList
        data={[
          {msg: 'Profile updated successfully!'},
          {type: 'error', msg: 'Email is already taken.'},
        ]}/>

      <ToastList
        data={[
          {msg: 'Profile updated successfully!'},
          {type: 'error', msg: 'Email is already taken.'},
        ]}/>

      <ToastList
        data={[
          {msg: 'Profile updated successfully!'},
          {type: 'error', msg: 'Email is already taken.'},
        ]}/>
    </>
  )
}

ToastExample()
```