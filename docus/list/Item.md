---
id : Item
title: Item
description: Styled-Component로 이루어진 div 
keywords:
  - Item
---

### Name
* Item

### Description
* `Item` 컴포넌트는 정해진 스타일의 형태로 `children` 을 감싸는 용도로 사용됩니다.
* (en)The Item component is used to wrap children in a defined style.

### Feature
  - [basic](#basic)
  
### Structure
  - Item
    - children(React.ReactNode)

### Feature Details

#### basic
- `Item` 컴포넌트는 정해진 스타일의 형태로 `children` 을 감싸는 용도로 사용됩니다.
- 아래와 같은 형태의 `css`를 적용하여 주며, `layout`, `disabled`를 `props`로 전달받아 적용할 수 있습니다.
  ```css
  label {
    display: block;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    img {
      margin-right: 12px;
    }
  }
  input {
    display: none;
  }

  display: ${({ layout }) => (layout === ChartConfig.Layout.HORIZONTAL ? 'inline-block' : 'block')};
  ${(props) => (props.disabled ? CssDisable : CssEnable)}
  ```