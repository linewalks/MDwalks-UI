
Modal example:

```js
import React, { useState } from 'react';
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
    <section>
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
        }>Contents</Modal>
      </section>
    )
}

ModalExample()
```