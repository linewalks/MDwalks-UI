Toast example:

```js
import ToastList from '@Components/toast/ToastList'

const ToastExample = () => (
  <>
    <Toast>Profile updated successfully!</Toast>
    <Toast variant="error">Email is already taken.</Toast>
    <ToastList
      data={[
        {msg: 'Profile updated successfully!'},
        {type: 'error', msg: 'Email is already taken.'},
      ]}/>
  </>
)

ToastExample()
```