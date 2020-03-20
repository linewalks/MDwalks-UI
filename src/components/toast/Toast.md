Toast example:

```js
import ToastList from '@Components/toast/ToastList'

const ToastExample = () => (
  <>
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

ToastExample()
```