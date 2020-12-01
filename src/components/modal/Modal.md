
Modal example:

```js
import React, { useState } from 'react'
import Button from '@Components/button/Button'

const ModalExample = () => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const open = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
    setLoading(false)
  }

  const loadingOpen = () => {
    open()
    setLoading(true)
    setTimeout(() => {
      close()
    }, 1000)
  }

  return (
    <>
      <Button variant="basic_line" size="lg" onClick={open}>default Show</Button>
      <Button variant="basic_line" size="lg" onClick={loadingOpen}>Loding Show</Button>
      <Modal
        title="modal title"
        description="11"
        isOpen={isShow}
        isLoading={isLoading}
        closeModal={close}
        footer={
          <div>
            <Button variant="basic_line" size="lg">Cancel</Button>
            <Button variant="primary" size="lg">Submit</Button>
          </div>
        }>
          Contents
          <div style={{ height: 400 }}></div>
        </Modal>
      </>
    )
}

ModalExample()
```
```js
import React, { useState } from 'react'
import Button from '@Components/button/Button'

const ModalExample = () => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const open = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
    setLoading(false)
  }

  const loadingOpen = () => {
    open()
    setLoading(true)
    setTimeout(() => {
      close()
    }, 1000)
  }

  return (
    <>
      <Button variant="basic_line" size="lg" onClick={open}>Basic Alert</Button>
      <Modal
        variant="basic"
        type="alert"
        title="Modal Title"
        description="모달 타이틀과 콘텐츠에 대한 설명을 할 수 있습니다."
        isOpen={isShow}
        closeModal={close}
      >
          콘텐츠 최소 피드백 텍스트는 1줄입니다.
        </Modal>
      </>
    )
}

ModalExample()
```
```js
import React, { useState } from 'react'
import Button from '@Components/button/Button'

const ModalExample = () => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const open = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
    setLoading(false)
  }

  const loadingOpen = () => {
    open()
    setLoading(true)
    setTimeout(() => {
      close()
    }, 1000)
  }

  return (
    <>
      <Button variant="basic_line" size="lg" onClick={open}>Basic Confirm</Button>
      <Modal
        variant="basic"
        title="Modal Title"
        description="모달 타이틀과 콘텐츠에 대한 설명을 할 수 있습니다."
        isOpen={isShow}
        closeModal={close}
        type="confirm"
        onCancel={() => {alert('cancel')}}
        onConfirm={() => {alert('confirm')}}
      >
        <div style={{ height: 400 }}>콘텐츠 최소 피드백 텍스트는 1줄입니다.</div>
      </Modal>
    </>
  )
}

ModalExample()
```
