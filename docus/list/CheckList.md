---
id : CheckList
title: CheckList
description: 기존의 CheckBox 를 리스트형태로 구현
keywords:
  - CheckList
  - CheckBox
---

### Name
* CheckList

### Description
* CheckList는 CheckBox 여러개를 리스트형태로 사용할 수 있습니다.
* (en)CheckList can use multiple CheckBoxes in the form of a list.

### Feature
  - [formatter](#formatter)
  - [size](#size)
  - [change handler](#change-handler)
  
### Structure
  - CheckList
    - Item
      - input[type=checkbox]

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

#### size
- `getImgSize`
  - 해당 함수는 `size`에 따라서 img의 크기를 결정하는 함수이다.
  - 'sm'은 16px, 'md'는 24px을 지닌다.

#### change handler
- Props에서 제공되는 onChange를 호출하는 영역이다.
  ```javascript
  const handleOnChange = (id: number) => {
    ...
    // checkList는 중복 체크가 가능한데, props limit 값을 활용하여 최대 선택 개수를 제한할 수 있다.
    if (!_.includes(selected, id) && selected.length >= limit) {
      if (_.isFunction(onError)) {
        onError({ limit })
      }
      return
    }

    const newSelected = [...selected]
    // checkList는 여러개 선택이 가능한데, selected는 배열로 현재 체크 되어 있는 값의 id의 리스트를 지닌다.
    if (!selected.includes(id)) {
      onChange(id, [...newSelected, id])
    } else {
      onChange(id, _.without(newSelected, id))
    }
  }
  ```