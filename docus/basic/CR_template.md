---
id : CR_template
title: Definition Template
description: 아래는 예시 템플릿 입니다. 아래와 같은 형태로 작성해주시면 됩니다. id는 .md 파일 고유의 이름으로 파일명과 동일하게 작성해주세요. title은 해당 페이지의 최상단에 노출됩니다.
keywords:
  - Template
---

### Name
* Table

### Description
* Table은 기본적인 html table의 형태를 가지며, 내장 기능으로 sorting, scroll 기능을 지니고 있습니다.
* (en)Table has the form of a basic html table and has sorting and scrolling functions as built-in functions.

### Feature
  - [table-size](#table-size)
  - [sorting](#sorting)
  - [scroll](#scroll)
  - [sub-Header](#sub-header)
  - [table-footer](#table-footer)

### Structure
  - Table
    - THead
    - TBody
    - TFoot

### Feature Details

#### table size
- `Table`의 사이즈는 `src/assets/styles/tableProperties.ts` 파일에 정의되어 있다.
- small | medium 두 종류로 정의되어 있다.

#### sorting
- `sorting`은 `THead.tsx`에 정의되어 있다.
- `sortOrderList`, `defaultSort`, `resetSort`, `setResetSort`의 prop 값이 해당 기능에 영향을 미친다.
- 기능을 수행하는데 영향을 미치는 함수 및 styled-component 는 다음과 같다.
  - `SortButton`(styled-component)
    - button img css 속성값을 정의
  - `HeaderSortIcon`
    - parameter
      ```javascript
      loading: false;
      sort: '';
      ```
    - return
      - `React.ReactNode`
    - description
      - `desc`, `asc`, ` ` 상태에 따라 icon의 형태 정의
  - `HeaderTextSort`
    - parameter
      ```javascript
      text: string;
      sort: (order:string) => void;
      loading: boolean;
      size: 'small' | 'medium';
      toggle: any;
      ```
    - return
      - `React.ReactNode`
    - description
      - `SortButton`, `HeaderSortIcon`을 사용하여 정렬 버튼이 추가된 컴포넌트 리턴
  - `createHeader`
    - parameter
      ```javascript
      // basic type
      row: string;
      // sorting type 
      colSpan?: number;
      text?: string;
      sort?: (header: string, order: 'asc' | 'desc' | '') => void;
      ```
    - description
      - `sort` 기능이 존재하는 경우 `HeaderTextSort` 함수를 적용한 컴포넌트 리턴
  - `useEffect` 내에 `defaultSort` 정의 영역
    - `defaultSort`가 존재하는 경우 정렬 버튼의 초기 값을 설정한다.
  
#### scroll
  - description scroll
  
#### sub header
  - descrition sub header

#### table footer
  - description table footer