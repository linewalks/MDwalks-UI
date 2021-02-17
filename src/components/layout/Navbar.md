Navbar example:

```js
<Navbar>
  Navbar
</Navbar>
```

```js
import React from 'react'
import styled from 'styled-components'

const showNavbar = () => {
  const Menu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    width: 120px;
    height: 40px;
    border: 1px solid grey;
    border-radius: 8px;
    background-color: skyblue;
    margin-right: 16px;
  `

  return (
    <Navbar>
      <Menu>Menu1</Menu>
      <Menu>Menu2</Menu>
      <Menu>Menu3</Menu>
      <Menu>Menu4</Menu>
    </Navbar>
  )
}

showNavbar()
```