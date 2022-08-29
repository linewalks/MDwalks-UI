Toast example:

#### 기본 사용법

##### 1. 프로젝트 root컴포넌트를 ToastProvider로 감싸줍니다.(nextjs라면 \_app.js에서 사용.)

##### 2. Toast를 사용하는 곳에서 useToast를 import한 후, useToast를 실행하여 add함수를 변수에 할당하여 사용합니다.

##### 3. 추가할 때, add함수에 ToastData를 인자로 넣어주면 됩니다. (ToastData의 형태는 PROPS & METHODS 문서를 보세요.)

##### 4. ToastData의 message는 커스텀 가능합니다.

```js
/*
개인프로젝트에서 사용시
import { Toast } from 'MDwalks-UI'
로 import를 변경해서사용하세요.
*/
import * as Toast from '@Components/Toast'
import Button from '@Components/button/Button'
import { color } from '@src/assets/styles/variables'
import _ from 'lodash'

const CustomMsg = () => (
  <div>
    <p style={{ color: color.$pmblue }}>This is Custom Message</p>
    <p style={{ color: color.$red01 }}>This is Custom Message</p>
  </div>
)

const ProjectRootComponent = () => {
  return (
    <Toast.ToastProvider>
      <div>
        <ToastUseComponent />
      </div>
    </Toast.ToastProvider>
  )
}

const ToastUseComponent = () => {
  const { add } = Toast.useToast()
  return (
    <>
      <Button
        onClick={() =>
          add({
            toastId: _.uniqueId('test_1'),
            type: 'info',
            message: <span>this is info message</span>,
            duration: 7000,
          })
        }
      >
        Add Info Toast
      </Button>
      <Button
        onClick={() =>
          add({
            toastId: _.uniqueId('test_1'),
            type: 'warning',
            message: <CustomMsg />,
            duration: 2000,
          })
        }
      >
        Add Warning Toast
      </Button>
    </>
  )
}

;<ProjectRootComponent />
```

#### 특정 상황에서 토스트컴포넌트를 제거하고 싶을 때

##### 1. Toast를 사용하는 곳에서 useToast를 import한 후, useToast를 실행하여 remove함수를 변수에 할당하여 사용합니다.

##### 2. remove 함수 사용시, add함수에 ToastId를 유일한 값으로 지정 후, remove함수의 인자로 ToastId를 넣어줘야 합니다.

```js
import * as Toast from '@Components/Toast'
import Button from '@Components/button/Button'
import _ from 'lodash'

const ProjectRootComponent = () => {
  return (
    <Toast.ToastProvider>
      <div>
        <ToastUseComponent />
      </div>
    </Toast.ToastProvider>
  )
}

const ToastUseComponent = () => {
  const { add, remove } = Toast.useToast()
  return (
    <>
      <Button
        onClick={() =>
          add({
            toastId: _.uniqueId('test_3'),
            type: 'info',
            message: <span>this is info message</span>,
            duration: 7000,
          })
        }
      >
        Add Info Toast
      </Button>
      <Button onClick={() => remove('test')}>Remove Info Toast</Button>
    </>
  )
}

;<ProjectRootComponent />
```
