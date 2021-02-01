---
id : CheckBox
title: CheckBox
description: input tag의 checkbox를 대체하여 사용할 수 있는 기본 컴포넌트입니다.
keywords:
  - Checkbox
---

### Name
* CheckBox

### Description
* Button은 input tag의 checkbox를 대체하여 사용할 수 있는 기본 컴포넌트입니다.
* (en)Button is a basic component that can be used by replacing the checkbox of the input tag.

### Feature
  - [formatter](#formatter)
  - [size](#size)
  - [change handler](#change-handler)
  
### Structure
  - CheckBox
    - Item
      - input[type=checkbox]

### Feature Details

#### formatter
- Props에서 제공되는 formatter는 아래와 같은 형태를 지닌다.
  ```javascript
  const newText = formatter ? formatter(text) : text
  ```
- 따라서 특정 입력 텍스트 값에 formatter를 적용하여 주는 역할을 수행한다.
  ```javascript
  formatter: (text:string) => (string | React.ReactNode);
  ```

#### size
- `getImgSize`
  - 해당 함수는 `size`에 따라서 img의 크기를 결정하는 함수이다.
  - 'sm'은 16px, 'md'는 24px을 지닌다.

#### change handler
- Props에서 제공되는 onChange를 호출하는 영역이다.
  ```javascript
  const handleOnChange = (evt) => {
    setChecked(evt.target.checked) // checkbox 아이콘 변경
    onChange(evt.target.checked) // 사용자의 onChange 호출
  }
  ```