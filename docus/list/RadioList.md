---
id : RadioList
title: RadioList
description: 기존의 CheckBox 를 리스트형태로 구현
keywords:
  - RadioList
---

### Name
* RadioList

### Description
* RadioList는 radio button 여러개를 리스트형태로 사용할 수 있습니다.
* (en)RadioList can use multiple radio buttons in the form of a list.

### Feature
  - [formatter](#formatter)
  - [change handler](#change-handler)
  
### Structure
  - RadioList
    - Box(Styled-component)
      - input[type=radio]

### Feature Details

#### formatter
- Props에서 제공되는 formatter는 아래와 같이 적용된다.
  ```javascript
  const text = formatter ? formatter(item) : name
  ```
- 따라서 특정 입력 텍스트 값에 formatter를 적용하여 주는 formatter는 아래와 같은 형태를 지닌다.
  ```javascript
  formatter: (text:string) => (string | React.ReactNode);
  ```

#### change handler
- Props에서 제공되는 onChange를 호출하는 영역이다.
  ```javascript
  const onChangeTrigger = (id) => {
    if (disabled) return
    if (_.isEqual(id, selected)) return
    onChange(id)  // selected에 포함되지 않은 경우에만 사용자가 제공한 onChange가 동작한다.
  }
  ```
